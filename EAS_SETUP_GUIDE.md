# 🔧 EAS Configuration Setup Guide

**مهم:** يجب ملء جميع القيم التالية قبل تشغيل إصدار production release.

---

## 📋 الخطوات المطلوبة

### 1️⃣ Apple App Store (iOS)

**الملف:** `eas.json` → `submit.production.ios`

#### `ascAppId` (مطلوب)
- **ما هو:** App ID من Apple App Store Connect
- **كيفية الحصول عليه:**
  1. اذهب إلى [App Store Connect](https://appstoreconnect.apple.com)
  2. ادخل باستخدام حساب Apple Developer
  3. انقر على "My Apps"
  4. انقر على تطبيقك "CUT BAT AI"
  5. انقر على "App Information"
  6. ابحث عن "Bundle ID" أو "App ID" - مثال: `6512345678`

#### `appleId` (مطلوب)
- **ما هو:** البريد الإلكتروني الذي تستخدمه لحساب Apple Developer
- **مثال:** `your-email@apple.com`

#### `appleTeamId` (مطلوب)
- **ما هو:** Team ID من Apple Developer Account
- **كيفية الحصول عليه:**
  1. اذهب إلى [Apple Developer Account](https://developer.apple.com/account)
  2. انقر على "Membership"
  3. ابحث عن "Team ID" - مثال: `ABC123XYZ9`

---

### 2️⃣ Google Play Store (Android)

**الملف:** `eas.json` → `submit.production.android`

#### `serviceAccount` (مطلوب)
- **ما هو:** المسار إلى ملف JSON الذي يحتوي على بيانات اعتماد Google Play Console
- **كيفية الحصول عليه:**
  1. اذهب إلى [Google Play Console](https://play.google.com/console)
  2. اختر تطبيقك
  3. انقر على "Settings" → "API access"
  4. انقر على "Create new service account"
  5. اتبع التعليمات وحمّل ملف JSON
  6. ضع الملف في مجلد المشروع أو استخدم المسار الكامل
- **مثال:** `./google-play-service-account.json`

---

### 3️⃣ Expo Project

**الملف:** `eas.json` → `updates.url`

#### `url` (مطلوب)
- **ما هو:** URL قناة Expo Updates
- **كيفية الحصول عليه:**
  ```bash
  # بعد تثبيت EAS CLI وتسجيل الدخول:
  eas project:info
  
  # ستجد Update URL تحت "Project details"
  # مثال: https://u.expo.dev/abc12345-def6-7890-ghij-klmnopqrstuv
  ```

---

## ✅ قائمة التحقق قبل الإصدار

- [ ] `ascAppId` - ملئت بـ App ID من Apple
- [ ] `appleId` - ملئت ببريدك الإلكتروني
- [ ] `appleTeamId` - ملئت بـ Team ID من Apple
- [ ] `serviceAccount` - ملئت بمسار ملف Google Play JSON
- [ ] `url` - ملئت بـ Expo Update URL
- [ ] GitHub Secrets محدثة:
  - [ ] `EAS_USERNAME`
  - [ ] `EAS_PASSWORD`
  - [ ] `APPLE_ID`
  - [ ] `APPLE_PASSWORD`
  - [ ] `APPLE_TEAM_ID`
  - [ ] `SLACK_WEBHOOK_URL` (اختياري)

---

## 🚫 متى سيفشل الإصدار

| الحقل | الخطأ المتوقع |
|------|-----------|
| `ascAppId` فارغ | `ascAppId is required for iOS submission` |
| `appleId` فارغ | `appleId is required for App Store Connect` |
| `appleTeamId` فارغ | `appleTeamId is required` |
| `serviceAccount` فارغ | `serviceAccount is required for Android` |
| `url` فارغ | `Expo Updates URL is not configured` |
| GitHub Secrets ناقصة | `Error: Secrets not found: EAS_USERNAME, EAS_PASSWORD` |

---

## 🔐 الأمان

- ✅ **لا تضع أي قيم حقيقية في `eas.json`** - استخدم بدلاً من ذلك GitHub Secrets
- ✅ **ملف JSON من Google:** ضعه في `.gitignore` لتجنب تسريب بيانات الاعتماد
- ✅ **Apple credentials:** استخدم متغيرات GitHub Secrets فقط

**مثال `.gitignore`:**
```bash
google-play-service-account.json
*.p8
*.mobileprovision
*.cer
```

---

## 🎯 الخطوة التالية

بعد ملء جميع القيم:

```bash
# 1. تحقق من الإعدادات
eas build:configure

# 2. اختبر البناء preview
git tag v1.1.0-rc1
git push origin v1.1.0-rc1

# 3. بعد نجاح RC، أطلق الإصدار الفعلي
git tag v1.1.0
git push origin v1.1.0
```

---

## 🆘 استكشاف الأخطاء

**خطأ: "APPLE_ID not found in GitHub Secrets"**
```bash
# الحل: أضف Secret إلى GitHub
# Settings → Secrets and variables → Actions → New repository secret
# الاسم: APPLE_ID
# القيمة: بريدك الإلكتروني من Apple
```

**خطأ: "Authentication failed for Google Play"**
```bash
# الحل: تحقق من ملف JSON
# 1. تأكد أن الملف صحيح
# 2. تأكد من المسار
# 3. جرب مع path مختلف
```

---

## 📞 الدعم

- [Expo EAS Documentation](https://docs.expo.dev/eas/)
- [Apple App Store Connect](https://appstoreconnect.apple.com)
- [Google Play Console](https://play.google.com/console)
