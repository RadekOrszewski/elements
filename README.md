# Element Trainer — adaptive periodic table quiz (Android)

Learn the symbols, names, groups and periods of 74 elements: periods 1–6
(lanthanum stands in for the lanthanides) plus francium and actinium.
Polish and English UI; progress is stored on the phone.

## Get the APK without installing anything (GitHub builds it)

1. Create a new **empty** repository on GitHub (private is fine).
2. Upload the contents of this folder (keep the `.github` folder!) —
   either drag-and-drop in the GitHub web UI or:
   ```
   git init && git add . && git commit -m "Element Trainer"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
   Tip: the web uploader hides dot-folders on some systems; if
   `.github/workflows/build-apk.yml` is missing after upload, create it via
   *Add file → Create new file* and paste its contents.
3. Open the **Actions** tab — "Build Android APK" runs automatically (~4–6 min).
4. When it's green, open **Releases** (right sidebar on the repo page) and
   download `element-trainer.apk` — do this directly on the phone.
5. On the phone, open the file and allow "Install unknown apps" for your
   browser/file manager when Android asks.

Every push to `main` produces a new build. All builds are signed with the
same key (`android/app/element-trainer-debug.keystore`), so a new APK
installs over the old one and progress is kept.

To change the version shown in Android settings, bump `versionCode` and
`versionName` in `android/app/build.gradle`.

## Build locally instead (Android Studio)

Requires Node 22+, JDK 21, Android SDK (Android Studio).
```
npm install
npm run sync          # copies src/index.html into the Android project
npx cap open android  # open in Android Studio → Run, or:
npm run apk           # → android/app/build/outputs/apk/debug/app-debug.apk
```

## Project layout

- `src/index.html` — the whole app (HTML/CSS/JS, no build step). Also runs in any browser.
- `build-web.js` — copies it into `www/` and adds Capacitor's runtime.
- `android/` — Capacitor 8 Android project (icons, splash, permissions already set).
- `.github/workflows/build-apk.yml` — cloud build + release.

## How the app adapts

Every element × skill pair (symbol, name, group, period, place in table) has a
Leitner box 0–5. Each question is drawn from one of three buckets:
answered wrong last time (60%), known but due for review (25%, older and
lower boxes first), new (35% until 40% of the session is new material,
earlier periods first). A wrong answer resets the box to 0 and the item comes
back once more 2–4 questions later in the same session. "Fix my mistakes"
runs a session made only of items whose last answer was wrong.
Typed answers appear once an item reaches box 2.
