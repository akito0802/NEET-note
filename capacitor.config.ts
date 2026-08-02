import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.neetnote.app',
  appName: 'NEET NOTE',
  webDir: 'www',
  bundledWebRuntime: false,
  backgroundColor: '#141311',
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'NEETNOTE'
  },
  android: {
    backgroundColor: '#141311',
    allowMixedContent: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: '#141311',
      showSpinner: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#141311',
      overlaysWebView: false
    }
  }
};

export default config;
