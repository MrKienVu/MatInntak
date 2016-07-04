# matinntak

React Native-prosjekt basert på [react-native-template](https://bitbucket.usit.uio.no/projects/MOB/repos/react-native-template).

## Førebuingar

Fylg instruksjonane i [React Native-dokumentasjonen](http://facebook.github.io/react-native/docs/getting-started.html) for å installera:
* Xcode (for iOS-utvikling)
* Android Studio (for Android-utvikling)
* node.js
* npm
* react-native-cli
* Watchman
* Flow

Når du har gjort dette, kan du køyra
```bash
npm install
```
i rotmappa for å installera alt det andre som trengst for å kompilera, køyra og testa prosjektet.

For å køyra funksjonelle testar treng du i tillegg ein oppdatert versjon av [Ruby](http://www.ruby-lang.org). På Mac er det enklaste å installera [calabash-sandbox](http://github.com/calabash/calabash-ios).



## Kompilering og køyring for utvikling

### Android

Med Android Studio: Opna mappa `android` og trykk på Run-knappen.
Frå terminal: Køyr `react-native run-android` i rotmappa.

### iOS

Med Xcode: Opna mappa `ios/matinntak.xcodeproj` og trykk på Run-knappen.
Frå terminal: Køyr `react-native run-ios` i rotmappa.

### Redux Dev Tools
Appen er sett opp med støtte for [Redux Dev Tools](https://github.com/zalmoxisus/remote-redux-devtools). Sjå under [Remote monitoring](https://github.com/zalmoxisus/remote-redux-devtools#remote-monitoring) for å finna ein passande frontend til bruk i utvikling.

### Flow
Køyr `flow` i prosjektmappa for å typesjekka koden. Les meir om Flow på http://www.flowtype.org.

## Funksjonelle testar

Legg testscenario i mappa `features`, Android-spesifikk testkode i `features/support/android` og iOS-spesifikk testkode i `features/support/`.

På Mac bør kommandoane nedanfor køyrast i ein `calabash-sandbox`.

### Android
Bygg ein debug-versjon av applikasjonen, til dømes ved å køyra `react-native run-android`. Har du bygt ein versjon frå før, treng du ikkje gjera det på nytt før testkøyring.
```bash
./functional_tests_android.sh
```

### iOS
Bygg applikasjonen i Xcode for køyring på simulator. Bruk target `Calabash` (vel i menyen oppe til venstre).
```bash
./functional_tests_ios.sh
```
