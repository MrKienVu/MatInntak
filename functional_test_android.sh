#/bin/sh
(cd android; calabash-android run app/build/outputs/apk/app-debug.apk ../features -r ../features/support/android)
