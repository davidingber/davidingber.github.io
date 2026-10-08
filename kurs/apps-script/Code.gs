/*
 * Checkout server for kurs/ — Google Apps Script bound to the Sheet
 * "רוכשים - איך להפסיק לפחד מהתקף החרדה הבא".
 *
 * What it does:
 *   1. The sales page POSTs the buyer's details here.
 *   2. This script asks Sumit (billing/payments/beginredirect) for a personal payment page
 *      with the buyer's name/email/phone already filled in and the right items
 *      (course alone, or course + order bump), and returns its URL to the page.
 *   3. Every order attempt is logged to the "הזמנות" tab; every Sumit IPN (payment success
 *      notification) and every return to the thank-you page is logged to "תשלומים".
 *
 * Secrets live ONLY in Project Settings → Script properties, never in this file:
 *   SUMIT_COMPANY_ID  — מזהה החברה ב-Sumit
 *   SUMIT_API_KEY     — מפתח ה-API הפרטי
 *   IPN_SECRET        — any random string; protects the IPN endpoint from fake calls
 *
 * Setup steps (Hebrew): kurs/apps-script/README.md
 */

// Prices live here (server side), so nobody can change them from the browser.
var COURSE = { name: 'איך להפסיק לפחד מהתקף החרדה הבא', price: 87 };
// Order bump. null = no bump offered. Example: { name: 'ערכת היישום להתקף הבא', price: 37 }
var BUMP = null;

var SITE = 'https://davidingber.github.io/kurs/';
var SUMIT_URL = 'https://api.sumit.co.il/billing/payments/beginredirect/';

function doPost(e) {
  var params = (e && e.parameter) || {};
  if (params.ipn) return handleIpn_(e, params);

  var d;
  try { d = JSON.parse(e.postData.contents); } catch (x) { return json_({ ok: false, error: 'bad request' }); }
  if (d.action === 'return') return handleReturn_(d);
  return handleCheckout_(d);
}

function handleCheckout_(d) {
  var name = String(d.name || '').trim().slice(0, 100);
  var email = String(d.email || '').trim().slice(0, 150);
  var phone = String(d.phone || '').trim().slice(0, 30);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json_({ ok: false, error: 'invalid details' });
  }
  var withBump = !!(BUMP && d.bump);
  var orderId = 'K' + Utilities.formatDate(new Date(), 'Asia/Jerusalem', 'yyMMddHHmmss') +
    Math.floor(Math.random() * 900 + 100);
  var total = COURSE.price + (withBump ? BUMP.price : 0);

  var result = createPaymentPage_({ orderId: orderId, name: name, email: email, phone: phone, withBump: withBump });

  sheet_('הזמנות', ['תאריך', 'מספר הזמנה', 'שם', 'אימייל', 'טלפון', 'תוספת', 'סכום', 'אישור דיוור',
    'utm_source', 'utm_medium', 'utm_campaign', 'סטטוס', 'שגיאה']).appendRow([
    new Date(), orderId, name, email, phone, withBump ? 'כן' : 'לא', total,
    d.marketing_consent === 'yes' ? 'כן' : 'לא',
    d.utm_source || '', d.utm_medium || '', d.utm_campaign || '',
    result.url ? 'נשלח לתשלום' : 'שגיאה', result.error || ''
  ]);

  if (!result.url) return json_({ ok: false, error: 'payment page failed' });
  return json_({ ok: true, url: result.url, order: orderId });
}

function createPaymentPage_(o) {
  var props = PropertiesService.getScriptProperties();
  var companyId = props.getProperty('SUMIT_COMPANY_ID');
  var apiKey = props.getProperty('SUMIT_API_KEY');
  if (!companyId || !apiKey) return { error: 'missing SUMIT_COMPANY_ID / SUMIT_API_KEY in Script properties' };

  var items = [{ Item: { Name: COURSE.name }, Quantity: 1, UnitPrice: COURSE.price }];
  if (o.withBump) items.push({ Item: { Name: BUMP.name }, Quantity: 1, UnitPrice: BUMP.price });

  var body = {
    Credentials: { CompanyID: Number(companyId), APIKey: apiKey },
    Customer: { Name: o.name, EmailAddress: o.email, Phone: o.phone },
    Items: items,
    VATIncluded: true,
    ExternalIdentifier: o.orderId,
    MaximumPayments: 1,
    RedirectURL: SITE + 'thank-you.html?order=' + encodeURIComponent(o.orderId),
    CancelRedirectURL: SITE + '#order'
  };
  var ipnSecret = props.getProperty('IPN_SECRET');
  var selfUrl = ScriptApp.getService().getUrl();
  if (ipnSecret && selfUrl) body.IPNURL = selfUrl + '?ipn=' + encodeURIComponent(ipnSecret);

  try {
    var res = UrlFetchApp.fetch(SUMIT_URL, {
      method: 'post', contentType: 'application/json',
      payload: JSON.stringify(body), muteHttpExceptions: true
    });
    var r = JSON.parse(res.getContentText());
    if (r && r.Data && r.Data.RedirectURL) return { url: r.Data.RedirectURL };
    return { error: (r && (r.UserErrorMessage || r.TechnicalErrorDetails)) || ('HTTP ' + res.getResponseCode()) };
  } catch (x) {
    return { error: String(x) };
  }
}

// Sumit calls IPNURL after a successful payment. The body format isn't documented to us yet,
// so log everything raw; the secret in the URL keeps random visitors from faking rows.
function handleIpn_(e, params) {
  var secret = PropertiesService.getScriptProperties().getProperty('IPN_SECRET');
  if (!secret || params.ipn !== secret) return json_({ ok: false });
  var p = {};
  Object.keys(params).forEach(function (k) { if (k !== 'ipn') p[k] = params[k]; });
  sheet_('תשלומים', ['תאריך', 'מקור', 'מספר הזמנה', 'פרטים']).appendRow([
    new Date(), 'Sumit (IPN)', p.ExternalIdentifier || p['OG-ExternalIdentifier'] || '',
    JSON.stringify(p) + ((e.postData && e.postData.contents) ? ' | ' + e.postData.contents : '')
  ]);
  return json_({ ok: true });
}

// The thank-you page reports the buyer's return. Unverified (anyone can call it) — a backup
// signal next to the IPN, not proof of payment. Sumit itself is the source of truth.
function handleReturn_(d) {
  sheet_('תשלומים', ['תאריך', 'מקור', 'מספר הזמנה', 'פרטים']).appendRow([
    new Date(), 'חזר לדף התודה', String(d.order || '').slice(0, 40), JSON.stringify(d.params || {}).slice(0, 1000)
  ]);
  return json_({ ok: true });
}

function sheet_(name, header) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(header); sh.setFrozenRows(1); }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the editor (▶ Run → testSumit) to check the Sumit connection.
// It creates a payment page for a test buyer and prints its link in the log — open it and
// check that the name, email and phone are filled in. Nothing is charged unless someone pays.
function testSumit() {
  var r = createPaymentPage_({ orderId: 'TEST' + Date.now(), name: 'בדיקה', email: 'test@example.com', phone: '0500000000', withBump: !!BUMP });
  Logger.log(r.url ? 'הצליח! הקישור: ' + r.url : 'שגיאה: ' + r.error);
}
