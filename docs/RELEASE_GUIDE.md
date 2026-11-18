# 🚀 دليل الإصدارات العملي

خطوات عملية لإطلاق إصدار جديد من CUT BAT AI.

---

## 📋 قبل أن تبدأ

### تثبيت الأدوات المطلوبة
```bash
# EAS CLI
npm install -g eas-cli@latest

# تسجيل الدخول
eas login
```

### تكوين GitHub Secrets
```
1. اذهب: Settings → Secrets and variables → Actions
2. أضف:
   - EAS_USERNAME
   - EAS_PASSWORD
   - APPLE_ID (للـ iOS)
   - APPLE_PASSWORD
   - APPLE_TEAM_ID
   - SLACK_WEBHOOK_URL (اختياري)
```

---

## 🔄 مثال عملي: إطلاق v1.1.0

### الخطوة 1: تحديث الملفات
```bash
# 1. افتح CHANGELOG.md وأضف:
[1.1.0] - 2026-11-25

### الإضافات
- ✨ Timeline Editor improvements
- 🎨 Basic video filters

### الإصلاحات
- 🐛 Fixed playback lag
- 🐛 Fixed battery drain

# 2. افتح app.json وغير:
"version": "1.1.0"

# 3. ارتكم التغييرات
git add CHANGELOG.md app.json
git commit -m "Release: v1.1.0

Improvements:
- Timeline editor enhancements
- Performance optimizations
- Bug fixes

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

git push origin main
```

### الخطوة 2: انتظر Staging Build
```bash
# - GitHub سيشغل staging-build.yml تلقائياً
# - انتظر 15-20 دقيقة
# - تحقق من Status:
#   https://github.com/dwnasem-blip/cut-bat-/actions
```

### الخطوة 3: اختبر Staging
```bash
# 1. افتح Expo Go على جهازك
# 2. الذهاب إلى "Published projects"
# 3. اختبر النسخة "staging"
# 4. تأكد من عدم وجود مشاكل
```

### الخطوة 4: أنشئ Tag للإصدار
```bash
# 1. تأكد أنك على main وكل شيء محدث
git checkout main
git pull origin main

# 2. أنشئ tag
git tag v1.1.0 -m "Release v1.1.0

## Changes
- Timeline editor enhancements
- Performance optimizations
- Bug fixes

## QA Status
- ✅ Tested on iPhone 14 Pro
- ✅ Tested on Android 13+
- ✅ No critical issues found"

# 3. ادفع الـ tag
git push origin v1.1.0
```

### الخطوة 5: مراقبة الإصدار
```bash
# GitHub سيشغل release-production.yml تلقائياً:
# 1. بناء iOS و Android (25-35 دقيقة)
# 2. النشر إلى App Store و Google Play (15-20 دقيقة)
# 3. إنشاء GitHub Release
# 4. إرسال Slack notification

# تتبع التقدم:
# https://github.com/dwnasem-blip/cut-bat-/actions/workflows/release-production.yml
```

---

## 🎯 الحالات الشائعة

### حالة 1: إصدار إصلاح حرج (Hotfix)
```bash
# 1. أنشئ branch من main
git checkout -b hotfix/critical-bug main

# 2. أصلح الخطأ واختبره

# 3. ارتكم الإصلاح
git commit -m "Fix: Critical playback crash"

# 4. دمج إلى main
git checkout main
git merge hotfix/critical-bug
git push origin main

# 5. أنشئ release patch (1.1.1)
git tag v1.1.1
git push origin v1.1.0
```

### حالة 2: إصدار ميزة كبيرة
```bash
# 1. أنشئ branch للميزة
git checkout -b feature/major-feature

# 2. اعمل على الميزة (عدة أسابيع)
# 3. فتح PR عندما تكون جاهزة
# 4. الاختبار من PR Preview
# 5. دمج إلى main عند الموافقة
# 6. ارتفع النسخة الصغيرة (1.2.0)
```

### حالة 3: الرجوع عن إصدار (Rollback)
```bash
# إذا حدثت مشاكل بعد الإصدار:

# 1. أنشئ hotfix
git checkout -b hotfix/rollback main

# 2. ارجع للإصدار السابق
git revert v1.1.0

# 3. أضف تصحيح إضافي إذا لزم الأمر

# 4. إطلق v1.1.1 كـ patch release
```

---

## 📊 مراقبة الإصدار

### مراقبة بناء EAS
```bash
# قائمة بجميع الإصدارات
eas build:list --limit 10

# تفاصيل بناء معين
eas build:view <BUILD_ID>

# السجلات
eas build:logs <BUILD_ID>
```

### مراقبة التحديثات
```bash
# قائمة التحديثات
eas update:list

# تفاصيل تحديث
eas update:view <UPDATE_ID>

# حالة التحديث على الأجهزة
eas update:monitor
```

### مراقبة GitHub Actions
```
https://github.com/dwnasem-blip/cut-bat-/actions
```

---

## ⚠️ نصائح مهمة

### قبل الإصدار
- ✅ تأكد من أن جميع الاختبارات تمر
- ✅ راجع CHANGELOG.md
- ✅ تأكد من تحديث app.json
- ✅ اختبر Staging Build بالكامل

### أثناء الإصدار
- ⏳ لا تلغِ الـ Workflow
- ⏳ انتظر إكمال جميع الخطوات
- ⏳ لا تنشر release notes حتى تؤكد النشر

### بعد الإصدار
- ✅ تحقق من App Store و Google Play
- ✅ راقب النسب الخطأ الأولي
- ✅ أرسل إشعار للمستخدمين
- ✅ وثّق الإصدار في GitHub Release

---

## 🆘 استكشاف الأخطاء

### المشكلة: Build فشل في GitHub Actions
```bash
# الحل:
1. انظر إلى سجل الإجراء
2. ابحث عن الخطأ المحدد
3. تحقق من GitHub Secrets (قد تكون مفقودة)
4. جرّب البناء محلياً:
   eas build -p ios --profile production --local
```

### المشكلة: EAS Login فشل
```bash
# الحل:
1. تأكد من EAS_USERNAME و EAS_PASSWORD في GitHub Secrets
2. جرّب تسجيل الدخول محلياً:
   eas login
3. تحقق من حساب Expo على https://expo.dev
```

### المشكلة: النشر إلى App Store فشل
```bash
# الحل:
1. تحقق من APPLE_ID و APPLE_PASSWORD في GitHub Secrets
2. تأكد من أن حساب Apple Developer نشط
3. تحقق من شهادات التوقيع في Xcode
4. اتصل بدعم Apple إذا استمرت المشكلة
```

---

## 📚 موارد مفيدة

- [Expo EAS Docs](https://docs.expo.dev/eas/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Google Play Console](https://play.google.com/console)

---

## 💡 نصيحة أخيرة

**ابدأ صغيراً!** جرّب الإجراءات الأولى (PR Preview و Staging Build) قبل الذهاب إلى Production Release الكامل. هذا سيساعدك على فهم النظام بشكل أفضل.

عند الشعور بالراحة، الإصدارات ستصبح عملية سلسة وسهلة! 🚀
