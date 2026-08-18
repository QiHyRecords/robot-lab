# Robot Lab Android

This is a **self-contained native Android project** for Robot Lab. It launches the complete offline 3D engineering sandbox from packaged local WebView assets. It has no Node.js, cloud-preview, development-server, or network dependency at runtime.

## Repository structure

| Path | Purpose |
|---|---|
| `app/src/main/java/` | Native landscape launcher activity and Android WebView host. |
| `app/src/main/assets/` | Bundled Robot Lab HTML, WebGL JavaScript, and CSS game client. |
| `app/src/main/res/` | Optimized multi-density launcher icons, splash artwork, and theme resources. |
| `gradle/`, `gradlew`, `settings.gradle`, `build.gradle` | Standard Gradle wrapper and Android build configuration. |
| `.github/workflows/build-apk.yml` | GitHub Actions debug APK build and artifact upload workflow. |

## GitHub Actions APK build

1. Create an empty GitHub repository and upload the contents of this folder to its root.
2. Open the repository’s **Actions** tab, select **Build Robot Lab Debug APK**, then choose **Run workflow**.
3. When the run succeeds, download the `robot-lab-debug-apk` artifact. It contains `app-debug.apk`.
4. Transfer `app-debug.apk` to an Android device and allow installation from the source you used to open the file.

The workflow performs a clean checkout, restores Gradle caches, installs JDK 17 and Android SDK 35, invokes `./gradlew assembleDebug`, and uploads the resulting debug APK. It does not need signing secrets.

## Local Gradle build

With JDK 17 and Android SDK 35 available, run:

```bash
./gradlew assembleDebug
```

The APK is written to `app/build/outputs/apk/debug/app-debug.apk`.

## Offline runtime

The launcher activity is fixed to landscape, hides system UI for game play, and loads `file:///android_asset/index.html`. The game client, WebGL renderer, controls, simulation, persistence, and audio feedback all ship under `app/src/main/assets/`.
