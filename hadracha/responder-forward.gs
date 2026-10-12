/**
 * העברת לידים מגיליון Google אל רשימת תפוצה ברב מסר (Responder).
 *
 * שימוש: הדביקו את הקובץ בסוף סקריפט ה-Apps Script של הגיליון, והוסיפו בתוך doPost (אחרי כתיבת השורה):
 *     forwardToResponder_(data);
 * את המפתחות שומרים ב-Project Settings ← Script properties (לא בקוד):
 *     RM_CLIENT_ID, RM_CLIENT_SECRET, RM_USER_TOKEN, RM_LIST_ID
 * RM_LIST_ID: מגנט 123625 · שאלון ליד פרימיום 123627 · קורס/שאלון באק 123628
 * RM_REQUIRE_CONSENT: "yes" במגנט ובקורס (מוסיפים רק מי שאישר דיוור); בשאלון - לא להגדיר.
 */
var RM_BASE_ = 'https://graph.responder.live/v2';

function rmToken_() {
  var props = PropertiesService.getScriptProperties();
  var cache = CacheService.getScriptCache();
  var cached = cache.get('rm_token');
  if (cached) return cached;
  var res = UrlFetchApp.fetch(RM_BASE_ + '/oauth/token', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    payload: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: props.getProperty('RM_CLIENT_ID'),
      client_secret: props.getProperty('RM_CLIENT_SECRET'),
      user_token: props.getProperty('RM_USER_TOKEN')
    })
  });
  var token = JSON.parse(res.getContentText()).token;
  if (!token) throw new Error('Responder auth failed: ' + res.getContentText());
  cache.put('rm_token', token, 6 * 60 * 60); // הטוקן תקף כשבועיים; מרעננים כל כמה שעות
  return token;
}

function forwardToResponder_(data) {
  try {
    var props = PropertiesService.getScriptProperties();
    var requireConsent = props.getProperty('RM_REQUIRE_CONSENT') === 'yes';
    var consent = String(data.marketing_consent || data.consent || '').toLowerCase();
    if (requireConsent && ['yes', 'true', 'on', '1', 'כן'].indexOf(consent) < 0) return;
    var email = String(data.email || '').trim();
    if (!email) return;
    var res = UrlFetchApp.fetch(RM_BASE_ + '/subscribers', {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      headers: { Authorization: 'Bearer ' + rmToken_() },
      payload: JSON.stringify({
        name: data.name || data.full_name || '',
        email: email,
        phone: data.phone || '',
        list_ids: [Number(props.getProperty('RM_LIST_ID'))]
      })
    });
    if (res.getResponseCode() >= 300) console.error('Responder error', res.getResponseCode(), res.getContentText());
  } catch (err) {
    console.error('forwardToResponder_ failed', err); // לא מפילים את שמירת הליד בגיליון
  }
}
