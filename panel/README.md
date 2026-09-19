# פאנל 2 — מגנט לידים — התקנה וחיבורים

זהו **פאנל 2** מתוך שלושת הפאנלים של דוד (ראו `../strategy/business-strategy.md` למפה המלאה של העסק — קראו אותו לפני כל שינוי כאן, הוא מקור האמת לגבי **המבנה**). תיקייה זו מכילה את דפי משפך המגנט לקמפיין החרדה/התקפי חרדה:

⚠️ **שימו לב:** דוד בחר לתת למגנט ולפרונט שמות/תוכן שונים ממה שמופיע במסמך האסטרטגיה, ומבקש שזה יישאר כך. המבנה (סדר השלבים, הפאנלים, היעד הסופי) נשאר לפי המסמך; רק השמות הספציפיים הוחלפו:

| תפקיד | לפי המסמך | מה שבפועל בנוי |
|---|---|---|
| מגנט (פאנל 2, חינם) | "מה לעשות כשהחרדה עולה" | **מלכודת ההרגעה** |
| פרונט (פאנל 3, בתשלום, ייבנה בהמשך) | "איך להפסיק לפחד מהתקף החרדה הבא" | **90 השניות הראשונות** |

| קובץ | תפקיד |
|---|---|
| `landing.html` | דף נחיתה — מקבל תנועה מהמודעה, אוסף שם+אימייל |
| `thank-you.html` | דף תודה — סרטון קבלת פנים + מפנה להתחלת הבדיקה |
| `malchodet-hargaa.html` | מגנט הלידים האינטראקטיבי (אבחון עצמי "מלכודת ההרגעה") |
| `90-shniot.html` | דף "בקרוב" ל-90 השניות הראשונות (הפרונט העתידי) — רשימת המתנה בלבד, עדיין לא נבנה כמוצר |
| `masa-8-zehuyot.html` | **פאנל 1** — דף תוכנית הדגל הקבוצתית, בת 8 שבועות. כאב, מנגנון, סילבוס כ-8 מעברי זהות, מחיר גלוי, למי מתאים/לא, שאלות נפוצות. כל כפתורי ה-CTA בדף מובילים כעת ל-`shealon-hataama.html` (שאלון ההתאמה, ראו למטה). ⚠️ שם הקובץ נשאר `masa-8-zehuyot.html` (לא לשנות בלי בקשה של דוד), אבל התוכן על הדף (כותרת, H1, כפתור ה-CTA) עודכן ל-**"חוזרים לסמוך על עצמנו"** (21.8) — זה השם התקף בכל מקום שהדף מופיע, כולל הקישור מ-`malchodet-hargaa.html` וגם מ-`../anxiety-wave/` (ראו הערה למטה) |
| `shealon-hataama.html` | **שאלון ההתאמה** (פאנל 1) — 11 שאלות (רובן צ'קבוקסים/בחירה יחידה מהירים, 3 פתוחות) + פרטי קשר, לפני קביעת שיחת התאמה. נבנה בעיצוב הפרימיום של `masa-8-zehuyot.html` (ירוק כהה + זהב). שומר תשובות ל-`localStorage` (גיבוי) ושולח ל-Google Sheet נפרד משלו — ראו "חיבור שאלון ההתאמה ל-Google Sheet" למטה. אחרי שליחה מציג הודעת תודה בתוך הדף (לא מפנה לדף חדש). |

**המבנה של הפאנל (מהמסמך האסטרטגי, עם השמות שדוד בחר):**
מודעה או תוכן → דף נחיתה → דף תודה עם סרטון קבלת פנים → סדרת חימום (7 מיילים, מזכירה את 90 השניות הראשונות כ"בקרוב") → **דף תוכנית הדגל → שאלון התאמה**.

⚠️ **החלטה מפורשת נוספת של דוד (16.8):** בניגוד לאזהרת המסמך האסטרטגי מפני מעבר מהיר מדי מהמגנט לדף תוכנית (ראו `../strategy/business-strategy.md`, פאנל 2), דוד ביקש שכפתור המסך האחרון של המגנט (`malchodet-hargaa.html`, מסך 8) יוביל **ישירות** לדף תוכנית הדגל `masa-8-zehuyot.html`, ולא ל-`90-shniot.html`. זה שינוי מכוון, לא טעות — **אל תחזירו את הכפתור להצביע על `90-shniot.html`**. תוכן מסך 8 עודכן בהתאם (מציג את "מסע 8 הזהויות" במקום את "90 השניות הראשונות").

זרימת המשתמש בפועל כרגע: מודעה → `landing.html` → `thank-you.html` (וידאו של דוד) → `malchodet-hargaa.html` (המגנט: מלכודת ההרגעה) → **`masa-8-zehuyot.html`** (דף תוכנית הדגל, פאנל 1) → `shealon-hataama.html` (שאלון התאמה) → שיחת התאמה.

`90-shniot.html` וסדרת המיילים (`campaign-copy.md`) עדיין קיימים באתר כערוצים משלימים (למשל למי שלא ממיר מהמגנט ישר לדף התוכנית), אבל אינם עוד חלק מהמסלול הראשי מהמגנט. 90 השניות הראשונות היא עדיין הצעת הפרונט העתידית (פאנל 3), ועדיין לא נבנתה כמוצר לרכישה — כרגע רק דף רשימת המתנה.

⚠️ **`masa-8-zehuyot.html` משמש כיום גם כדף הבאק של `../anxiety-wave/`** (הפאנל המקביל, החדש, עם המגנט "כשהגל עולה"): ה-CTA הסופי ב-`../anxiety-wave/guide.html`, מיילים 6–7 ב-`../anxiety-wave/emails.md`, וגם `../anxiety-wave/program.html`/`backend.html` (שהם רק redirect) — כולם מפנים לדף הזה. זו הסיבה שהתוכן על הדף שונה ל-"חוזרים לסמוך על עצמنו" ולא נשאר "מסע 8 הזהויות": אותו דף באק אחד משרת עכשיו את שני הפאנלים, אז השם עליו חייב להתאים לשניהם. אל תבנו דף באק נפרד ל-`anxiety-wave/` — זה בדיוק מה שדוד ביקש להימנע ממנו.

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
10. הדבק את הכתובת הזו במקום `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` ב-`panel/landing.html` (המשתנה `SHEET_WEBAPP_URL` בתחילת ה-`<script>` התחתון).

**חשוב:** בכל פעם שתשנה משהו בקוד ה-Apps Script עצמו (לא רק בגיליון), תצטרך לבצע **Deploy ← Manage deployments ← ✎ (עריכה) ← גרסה חדשה ← Deploy** כדי שהשינוי ייכנס לתוקף. עריכת התאים בגיליון עצמו לא דורשת פריסה מחדש.

### מה קורה עד שתחבר את זה

הטפסים כבר עובדים גם בלי החיבור: הם שומרים את הליד ב-`localStorage` של הדפדפן (גיבוי מקומי) ומעבירים את המשתמש לדף הבא כרגיל. פשוט לא יישמר שום מקום קבוע עד שתדביק את הכתובת.

## חיבור שאלון ההתאמה ל-Google Sheet

זה חיבור **נפרד** מהחיבור של `landing.html` למעלה — לשאלון ההתאמה יש שדות אחרות לגמרי, אז כדאי גיליון ייעודי משלו (אפשר "לידים - שאלון התאמה" או דומה). אותו תהליך בדיוק, כ־3 דקות:

1. פתח [sheets.google.com](https://sheets.google.com) וצור גיליון חדש.
2. בתפריט: **הרחבות (Extensions) ← Apps Script**.
3. מחק את הקוד שבקובץ, והדבק את זה במקומו:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
     if (!sheet) {
       sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
       sheet.appendRow([
         'תאריך', 'שם מלא', 'טלפון', 'מייל', 'גיל',
         '1. מה מתאר את מה שאתה חווה', '1. אחר',
         '2. מה קורה כשהחרדה עולה',
         '3. מה זה מונע ממך', '3. אחר',
         '4. מה כבר ניסית', '4. אחר',
         '5. מה היה חסר', '5. אחר',
         '6. הדיבור הפנימי', '6. אחר',
         '7. מה היית רוצה לחזור לעשות',
         '8. מוכנות לעבוד בין המפגשים',
         '9. איך מרגיש לגבי תהליך קבוצתי',
         '10. מצב חריף כרגע', '10. פירוט',
         '11. מה תמשיך להפסיד',
         'מקור', 'utm_source', 'utm_medium', 'utm_campaign'
       ]);
     }
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.full_name || '', data.phone || '', data.email || '', data.age || '',
       data.q1_symptoms || '', data.q1_other || '',
       data.q2_experience || '',
       data.q3_avoidance || '', data.q3_other || '',
       data.q4_tried || '', data.q4_other || '',
       data.q5_missing || '', data.q5_other || '',
       data.q6_selftalk || '', data.q6_other || '',
       data.q7_vision || '',
       data.q8_readiness || '',
       data.q9_group || '',
       data.q10_safety || '', data.q10_details || '',
       data.q11_cost || '',
       data.source || '', data.utm_source || '', data.utm_medium || '', data.utm_campaign || ''
     ]);
     return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. שמור, תן לפרויקט שם (למשל "Fit Questionnaire Webhook").
5. **Deploy ← New deployment ← ⚙️ ← Web app**. **Execute as: Me**, **Who has access: Anyone**. **Deploy**, ואשר הרשאות אם מתבקש.
6. העתק את כתובת ה-`/exec` שתקבל, והדבק אותה במקום `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` ב-`panel/shealon-hataama.html` (המשתנה `SHEET_WEBAPP_URL` בתחילת ה-`<script>` התחתון).

כמו למעלה: אחרי כל שינוי בקוד ה-Apps Script עצמו צריך **Deploy ← Manage deployments ← ✎ ← גרסה חדשה ← Deploy** כדי שהשינוי ייכנס לתוקף. עד שתדביק את הכתובת, התשובות נשמרות רק ב-`localStorage` של כל גולש (גיבוי מקומי, לא משותף).

## מעקב מודעות (UTM)

`landing.html` קורא אוטומטית פרמטרים כמו `?utm_source=facebook&utm_medium=cpc&utm_campaign=panic` מכתובת ה-URL ושומר אותם בשורה בגיליון, כדי שתדע איזו מודעה הביאה כל ליד.

## חיבור הסרטון בדף התודה

`thank-you.html` בנוי עם מקום לסרטון שבו אתה מדבר על הבדיקה ועל תוכניות הדגל. עד שתחבר סרטון אמיתי, יוצג שם פלייסהולדר (לא תיבה שבורה).

1. העלה את הסרטון ליוטיוב (אפשר "לא רשום"/Unlisted אם אתה לא רוצה שהוא יופיע בחיפוש) או לוימאו.
2. קח את קישור ה-**embed**, לא את קישור הצפייה הרגיל:
   - יוטיוב: `https://www.youtube.com/embed/VIDEO_ID`
   - וימאו: `https://player.vimeo.com/video/VIDEO_ID`
3. הדבק אותו במקום `PASTE_YOUR_VIDEO_EMBED_URL_HERE` במשתנה `VIDEO_EMBED_URL` בתחילת ה-`<script>` התחתון בקובץ `panel/thank-you.html`.

## מה עוד חסר בכוונה (לשלב הבא, לפי סדר הבנייה במסמך האסטרטגיה)

- **חיבור שאלון ההתאמה ל-Google Sheet** — `shealon-hataama.html` בנוי ומקושר מכל כפתורי ה-CTA ב-`masa-8-zehuyot.html`, אבל עדיין לא חובר ל-Google Sheet אמיתי (ראו "חיבור שאלון ההתאמה ל-Google Sheet" למעלה). עד אז התשובות נשמרות רק ב-`localStorage` של כל גולש.
- **קישור מסדרת המיילים לדף התוכנית** — `campaign-copy.md` עדיין מפנה לוואטסאפ בסוף הסדרה; כדאי לעדכן שיפנה ל-`masa-8-zehuyot.html` במקום, עכשיו שהוא קיים.
- **90 השניות הראשונות כמוצר בתשלום** (פאנל 3) — כרגע רק דף רשימת המתנה. בניית התוכן/וידאו/תשלום נשארת לשלב הבא.
- **סדרת המיילים בפועל** — הטקסטים מוכנים ב-`campaign-copy.md`, אבל עדיין לא מחוברים לשום כלי דיוור (Mailchimp / ActiveCampaign / וכו'). כרגע צריך להעתיק אותם ידנית לכלי הדיוור שתבחר, או לשלוח ידנית מתוך ה-Google Sheet.
- **הסרטון בדף התודה** — ראה הוראות למעלה. עד שיחובר, מוצג פלייסהולדר.
