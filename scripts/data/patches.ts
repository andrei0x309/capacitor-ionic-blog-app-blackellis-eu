export const patches = [
    {
        name: 'android-patch-background-runner-2.1.0-customization-1',
        identifier: 'cbeapp-1',
        description: `
        This patch applies some customizations to the background-runner plugin for Android 2.1.0:\n
        - fix click to notification to open app\n
        - remove geolocation permissions and API from the plugin\n
        `,
        files: [
            {
                path: 'Notifications.kt',
                modulePath: 'node_modules/@capacitor/background-runner/android/src/main/java/io/ionic/backgroundrunner/plugin/api/Notifications.kt'
            },
            {
                path: 'AndroidManifest.xml',
                modulePath: 'node_modules/@capacitor/background-runner/android/src/main/AndroidManifest.xml'
            },
            {
                path: 'BackgroundRunner.kt',
                modulePath: 'node_modules/@capacitor/background-runner/android/src/main/java/io/ionic/backgroundrunner/plugin/BackgroundRunner.kt'
            },
            {
                path: 'BackgroundRunnerPlugin.kt',
                modulePath: 'node_modules/@capacitor/background-runner/android/src/main/java/io/ionic/backgroundrunner/plugin/BackgroundRunnerPlugin.kt'
            }
        ]
    }
]
