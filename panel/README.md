# פאנל "מלכודת ההרגעה" — התקנה וחיבורים

תיקייה זו מכילה את דפי הפאנל לקמפיין החרדה/התקפי חרדה:

| קובץ | תפקיד |
|---|---|
| `landing.html` | דף נחיתה — מקבל תנועה מהמודעה, אוסף שם+אימייל |
| `thank-you.html` | דף תודה — מפנה להתחלת הבדיקה |
| `malchodet-hargaa.html` | מגנט הלידים האינטראקטיבי (אבחון עצמי "מלכודת ההרגעה") |
| `90-shniot.html` | ההדרכה החינמית "90 השניות הראשונות" (Front End) |

זרימת המשתמש: מודעה ← `landing.html` ← `thank-you.html` ← `malchodet-hargaa.html` ← `90-shniot.html` ← סדרת המיילים (`campaign-copy.md`).

## חיבור טופס ההרשמה ל-Google Sheet

האתר הוא סטטי (GitHub Pages), אז אין לו שרת שיכול לקבל ולשמור טפסים. הפתרון: Google Apps Script שרץ "בתוך" ה-Google Sheet שלך ומקבל בקשות POST ישירות מהדף.

**זמן הקמה: כ־3 דקות.**

1. פתח [sheets.google.com](https://sheets.google.com) וצור גיליון חדש. תן לו שם, למשל "לידים - מלכודת ההרגעה".
2. בתפריט: **הרחבות (Extensions) ← Apps Script**.
3. מחק את הקוד שבקובץ, והדבק את זה במקומו:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
     if (!sheet) {
       sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
       sheet.appendRow(['תאריך', 'שם', 'אימייל', 'מקור', 'utm_source', 'utm_medium', 'utm_campaign']);
     }
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.name || '',
       data.email || '',
       data.source || '',
       data.utm_source || '',
       data.utm_medium || '',
       data.utm_campaign || ''
     ]);
     return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. שמור (סמל הדיסקט או Ctrl+S). תן לפרויקט שם, למשל "Leads Webhook".
5. לחץ **Deploy ← New deployment**.
6. ליד "Select type" לחץ על גלגל השיניים ובחר **Web app**.
7. הגדרות הפריסה:
   - **Execute as:** Me (החשבון שלך)
   - **Who has access:** Anyone
8. לחץ **Deploy**. ייתכן שתתבקש לאשר הרשאות — זה תקין, זה הגיליון שלך.
9. תקבל כתובת שנראית כך: `https://script.google.com/macros/s/AKfycb.../exec` — **העתק אותה**.
10. הדבק את הכתובת הזו במקום `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` בשני הקבצים:
    - `panel/landing.html` (המשתנה `SHEET_WEBAPP_URL` בתחילת ה-`<script>` התחתון)
    - `panel/90-shniot.html` (אותו משתנה, בטופס "עדכנו אותי")

**חשוב:** בכל פעם שתשנה משהו בקוד ה-Apps Script עצמו (לא רק בגיליון), תצטרך לבצע **Deploy ← Manage deployments ← ✎ (עריכה) ← גרסה חדשה ← Deploy** כדי שהשינוי ייכנס לתוקף. עריכת התאים בגיליון עצמו לא דורשת פריסה מחדש.

### מה קורה עד שתחבר את זה

הטפסים כבר עובדים גם בלי החיבור: הם שומרים את הליד ב-`localStorage` של הדפדפן (גיבוי מקומי) ומעבירים את המשתמש לדף הבא כרגיל. פשוט לא יישמר שום מקום קבוע עד שתדביק את הכתובת.

## מעקב מודעות (UTM)

`landing.html` קורא אוטומטית פרמטרים כמו `?utm_source=facebook&utm_medium=cpc&utm_campaign=panic` מכתובת ה-URL ושומר אותם בשורה בגיליון, כדי שתדע איזו מודעה הביאה כל ליד.

## מה עוד חסר בכוונה (לשלב הבא)

- **דף תוכנית** (למכירת/הצגת התהליך העמוק בן 8 השבועות) — עדיין לא נבנה, כמתוכנן.
- **סדרת המיילים בפועל** — הטקסטים מוכנים ב-`campaign-copy.md`, אבל עדיין לא מחוברים לשום כלי דיוור (Mailchimp / ActiveCampaign / וכו'). כרגע צריך להעתיק אותם ידנית לכלי הדיוור שתבחר, או לשלוח ידנית מתוך ה-Google Sheet.
- וידאו להדרכה: `90-shniot.html` בנוי כרגע כמדריך כתוב בלבד. אם תצלם וידאו, אפשר להוסיף אותו בקלות בראש הדף (יש להגיד לי ואבנה את הבלוק).
