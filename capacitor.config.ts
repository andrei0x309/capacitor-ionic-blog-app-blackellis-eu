import { CapacitorConfig } from '@capacitor/cli';
import { CONSTANTS } from './src/store/constants';

const config: CapacitorConfig = {
  appId: "ro.blackellis.ro.blog.app.andrei0x309",
  appName: 'BlackEllis.eu Blog',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    hostname: 'app.blackellis.eu',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 8000,
      launchAutoHide: false,
      backgroundColor: "#222",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#fff",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: false,
    },
    BackgroundRunner: {
      label: CONSTANTS.backgroundTaskLabel,
      src: "bg-runners/bg-task.js",
      event: "checkLastPost",
      repeat: true,
      interval: 15,
      autoStart: true
    },
    Keyboard: {
      resizeOnFullScreen: false
    },
    EdgeToEdge: {
      backgroundColor: "#1e1e1e",
    },
    StatusBar: {
      overlaysWebView: false,
      style: "DARK",
      backgroundColor: "#1e1e1e",
    },
  },
};

export default config;
