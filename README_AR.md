# DAMA — نسخة جاهزة لـ Vercel

1. فك الضغط وارفع محتويات المجلد إلى مستودع GitHub خاص.
2. افتح Vercel واختر Add New → Project ثم استورد المستودع.
3. اختر Framework Preset: Other واترك Root Directory كما هو.
4. من Project Settings → Environment Variables أضف:
   - `DAMA_ACCESS_PASSWORD`: كلمة مرور لوحة DAMA.
   - `SESSION_SECRET`: سر عشوائي طويل؛ يمكن توليده بالأمر `openssl rand -hex 32`.
   - `LECTASYNC_JWT_TOKEN`: JWT صالح.
   - `LECTASYNC_TENANT_ID`: `ZNU:MED`
   - `LECTASYNC_APP_VERSION`: `2.0.0+1`
   - `LECTASYNC_API_BASE`: `https://api.lectasync.online`
   - `REQUEST_TIMEOUT_MS`: `15000`
5. اختر Production ثم Deploy. عند تغيير المتغيرات نفّذ Redeploy.

JWT محفوظ في متغيرات بيئة السيرفر ولا يظهر في ملفات الواجهة. يستخدم المشروع فقط Endpoint LectaSync المحدد: POST /api/student/qr/ticket. مسارات /api الأخرى هي وظائف داخلية للموقع وليست Endpoints إضافية من LectaSync. لا يتجاوز الموقع قيود الحساب أو الجهاز ولا يتيح نقل التذاكر. لا ترفع الأسرار إلى GitHub.
