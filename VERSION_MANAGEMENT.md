# 📦 نظام إدارة الإصدارات

نظام شامل لإدارة الإصدارات والإصلاحات والنشر لـ CUT BAT AI.

## 📊 نظام الإصدارات (Semantic Versioning)

نتبع [Semantic Versioning](https://semver.org/lang/ar/):

```
MAJOR.MINOR.PATCH
  1  .  0  .  0

- MAJOR: تغييرات غير متوافقة (Breaking Changes)
- MINOR: ميزات جديدة متوافقة
- PATCH: إصلاحات الأخطاء والتحسينات الصغيرة
```

**مثال:**
- `1.0.0` - الإصدار الأول
- `1.1.0` - إضافة ميزات جديدة
- `1.1.1` - إصلاح خطأ

---

## 🔄 مراحل الإصدار (Release Workflow)

### مرحلة 1: التطوير (Development)
```bash
# 1. كن على branch الميزة الخاص بك
git checkout -b feature/timeline-editor

# 2. اعمل على الميزة
# 3. اختبر محليا مع Expo Go

# 4. ارتكب التغييرات بوضوح
git commit -m "Add Timeline Editor UI"

# 5. ادفع إلى GitHub
git push origin feature/timeline-editor

# 6. فتح Pull Request
# - سيتم نشر PR Preview تلقائياً
# - اختبره من Expo Go
```

### مرحلة 2: التجميع (Staging)
```bash
# 1. دمج PR إلى main
git merge feature/timeline-editor
git push origin main

# 2. سيتم بناء Staging Build تلقائياً
# - EAS سينشئ APK و IPA
# - EAS Update سينشر التغييرات

# 3. اختبر الـ Staging Build:
#    استخدم Expo Go مع branch "staging"
```

### مرحلة 3: الإنتاج (Production Release)
```bash
# 1. أنشئ tag للإصدار الجديد
git tag v1.0.0

# 2. ادفع الـ tag
git push origin v1.0.0

# 3. سيتم تشغيل Workflow الإنتاج تلقائياً:
#    - بناء iOS و Android
#    - النشر إلى App Store و Google Play
#    - إنشاء GitHub Release
#    - إرسال Slack notification
```

---

## 📝 تحديث الإصدار

### قبل إنشاء Release جديد:

#### 1. تحديث `CHANGELOG.md`:
```markdown
## [1.1.0] - 2026-11-25

### الإضافات (Added)
- ✨ محرر Timeline محسّن
- 🎨 مرشحات الفيديو الأساسية

### الإصلاحات (Fixed)
- 🐛 إصلاح تأخير التشغيل
- 🐛 إصلاح تحميل البطاريات

### التحسينات (Improved)
- ⚡ أداء أفضل بـ 30%
- 📱 واجهة استجابة أفضل
```

#### 2. تحديث `app.json`:
```json
{
  "expo": {
    "version": "1.1.0",
    // ...
  }
}
```

#### 3. ارتكب التغييرات:
```bash
git add CHANGELOG.md app.json

git commit -m "Release: v1.1.0

- Timeline editor improvements
- Video filters
- Performance optimizations

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

git push origin main
```

#### 4. أنشئ tag:
```bash
git tag v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0
```

---

## 🔧 Build Profiles في `eas.json`

### Development Profile
```json
{
  "development": {
    "developmentClient": true,
    "distribution": "internal"
  }
}
```
**الاستخدام:** للاختبار المحلي مع Expo Go

### Preview Profile
```json
{
  "preview": {
    "ios": { "resourceClass": "m-medium" }
  }
}
```
**الاستخدام:** للبناء الداخلي والاختبار قبل الإنتاج

### Production Profile
```json
{
  "production": {
    "autoIncrement": "version",
    "ios": { "resourceClass": "m-medium" }
  }
}
```
**الاستخدام:** للإصدارات النهائية على App Store و Google Play

---

## 🤖 الـ Workflows المؤتمتة

### 1. PR Preview (`.github/workflows/pr-preview.yml`)
- **متى:** عند فتح أو تحديث PR
- **ما الذي يفعل:**
  - نشر EAS Update
  - تعليق على PR مع تعليمات الاختبار
  - تقرير الحالة

### 2. Staging Build (`.github/workflows/staging-build.yml`)
- **متى:** عند الدفع إلى main
- **ما الذي يفعل:**
  - بناء iOS و Android
  - نشر EAS Update على branch staging
  - إضافة ملخص للحالة

### 3. Production Release (`.github/workflows/release-production.yml`)
- **متى:** عند إنشاء tag (v1.0.0, v1.1.0, إلخ)
- **ما الذي يفعل:**
  - بناء iOS و Android للإنتاج
  - النشر التلقائي إلى App Store و Google Play
  - إنشاء GitHub Release
  - إرسال إشعار Slack

---

## 🔐 المتغيرات والأسرار المطلوبة

### في GitHub Secrets:
```bash
# Expo
EAS_USERNAME          # حسابك على Expo
EAS_PASSWORD          # كلمة مرورك على Expo

# iOS (Apple)
APPLE_ID              # Apple ID
APPLE_PASSWORD        # كلمة مرور Apple
APPLE_TEAM_ID         # Team ID

# Android (Google)
ANDROID_SERVICE_ACCOUNT  # JSON من Google Play Console

# Notifications
SLACK_WEBHOOK_URL     # (اختياري) لإرسال الإشعارات
```

### كيفية إضافة Secrets:
```bash
# على GitHub:
1. اذهب إلى Settings > Secrets and variables > Actions
2. أضف كل سر على حدة
3. استخدمه في الـ Workflow: ${{ secrets.SECRET_NAME }}
```

---

## 📈 تتبع الإصدارات

### عرض جميع الإصدارات:
```bash
# السخب المحلي
git tag

# معلومات الإصدار
git show v1.0.0
```

### مقارنة الإصدارات:
```bash
# الفروقات بين إصدارين
git diff v1.0.0 v1.1.0

# السجلات
git log v1.0.0..v1.1.0 --oneline
```

---

## ✅ قائمة التحقق قبل الإصدار

- [ ] جميع الاختبارات تمر بنجاح
- [ ] `CHANGELOG.md` محدث
- [ ] `app.json` يحتوي على الإصدار الصحيح
- [ ] لا توجد أخطاء TypeScript (`npm run type-check`)
- [ ] تم اختبار Staging Build
- [ ] جميع المتغيرات والأسرار موجودة في GitHub
- [ ] الـ PR تم مراجعتها والموافقة عليها

---

## 🆘 استكشاف الأخطاء

### Build فشل
```bash
# عرض السجلات
eas build:list --limit 5

# عرض تفاصيل البناء
eas build:view <BUILD_ID>
```

### تحديث فشل
```bash
# تحقق من الحالة
eas update:list

# عرض التفاصيل
eas update:view <UPDATE_ID>
```

---

## 📚 موارد إضافية

- [Expo EAS Docs](https://docs.expo.dev/eas/)
- [Semantic Versioning](https://semver.org/lang/ar/)
- [Keep a Changelog](https://keepachangelog.com/ar/)
- [GitHub Actions](https://docs.github.com/en/actions)
