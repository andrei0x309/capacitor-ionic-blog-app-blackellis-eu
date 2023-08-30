import { CapacitorConfig } from '@capacitor/cli';

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
    FirebaseMessaging: {
      presentationOptions: ["badge", "sound", "alert"],
    }
  },
};

export default config;
