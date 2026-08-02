# NEET NOTE ネイティブアプリ開発

## 初回セットアップ

```bash
npm install
npm run build:native
npx cap add ios
npx cap add android
npm run cap:sync
```

## iPhoneアプリを開く

```bash
npm run ios
```

Xcodeで開いたら、Signing & CapabilitiesでApple DeveloperのTeamを選びます。
Bundle Identifierは `jp.neetnote.app` です。

## Androidアプリを開く

```bash
npm run android
```

Android Studioで署名設定を行い、AABを作成します。

## Web版を更新したあと

```bash
npm run cap:sync
```

これで最新のNEET NOTEがiOS・Androidプロジェクトへ反映されます。

## App Store公開に必要なもの

- macOS搭載のMac
- Xcode
- Apple Developer Program
- App Store Connectのアプリ登録
- プライバシーポリシーURL
- アプリアイコン（1024×1024）
- スクリーンショット

## Google Play公開に必要なもの

- Android Studio
- Google Play Console登録
- 署名用キーストア
- プライバシーポリシーURL
- ストア画像とスクリーンショット
