# detox config

https://codingpotions.com/npm-tutorial#ejecutar-tareas-y-comandos-npm

![](https://paper-attachments.dropbox.com/s_2E91B68AAD6DAFD0FE1CC210A414E16CA85D0E898B00523C2C0989662D18E2E4_1569332763257_image.png)

![](https://paper-attachments.dropbox.com/s_2E91B68AAD6DAFD0FE1CC210A414E16CA85D0E898B00523C2C0989662D18E2E4_1569332792426_image.png)

![](https://paper-attachments.dropbox.com/s_2E91B68AAD6DAFD0FE1CC210A414E16CA85D0E898B00523C2C0989662D18E2E4_1569346606110_image.png)

![](https://paper-attachments.dropbox.com/s_2E91B68AAD6DAFD0FE1CC210A414E16CA85D0E898B00523C2C0989662D18E2E4_1569426771346_image.png)

    tasklist | FIND 

en lugar de este comando

    ps | grep

en archivo node_modules\detox\src\devices\android\ADB.js linea 116

    const processes = await this.shell(deviceId, `ps | grep "${bundleIdRegex}"`, {silent: true}).catch(() => '');
        if (!processes) {
          return NaN;
        }
https://stackoverflow.com/questions/10153087/equivalent-of-ps-a-grep-c-process-in-windows

![](https://paper-attachments.dropbox.com/s_2E91B68AAD6DAFD0FE1CC210A414E16CA85D0E898B00523C2C0989662D18E2E4_1569427542074_image.png)


node_modules\detox\src\devices\android\ADB.js

    let childProcess;
        if (apiLvl >= 24) {
          childProcess = await this.adbCmd(deviceId, `install -r -g ${apkPath}`);
        } else {
          childProcess = await this.adbCmd(deviceId, `install -rg ${apkPath}`);
        }

to

    let childProcess;
        if (apiLvl >= 24) {
          childProcess = await this.adbCmd(deviceId, `install -r ${apkPath}`);
        } else {
          childProcess = await this.adbCmd(deviceId, `install -rg ${apkPath}`);
        }

https://medium.com/@selvakumarsubramanian/detox-gray-box-testing-dc6e0a800575

!!!!
https://github.com/wix/Detox/blob/master/examples/demo-react-native/package.json

    "android.emu.debug": {
            "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
            "build": "cd android ; ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug ; cd -",
            "type": "android.emulator",
            "name": "Nexus_5X_API_26"
          },
    "android.emu.release": {
            "binaryPath": "android/app/build/outputs/apk/release/app-release.apk",
            "build": "cd android ; ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release ; cd -",
            "type": "android.emulator",
            "name": "Nexus_5X_API_26"
          }

cambiar el “build”  a comando de consola de windows !!!!
C:\Users\jruiz\demo-react-native

    "android.emu.debug": {
            "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
            "build": "cd android && gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
            "type": "android.emulator",
            "name": "Nexus_9_API_28"
    },
    "android.emu.release": {
            "binaryPath": "android/app/build/outputs/apk/release/app-release.apk",
            "build": "cd android && gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..",
            "type": "android.emulator",
            "name": "Nexus_9_API_28"
    }



https://developer.android.com/studio/publish/app-signing?hl=es-419

![](https://paper-attachments.dropbox.com/s_2E91B68AAD6DAFD0FE1CC210A414E16CA85D0E898B00523C2C0989662D18E2E4_1569529649638_image.png)





https://gist.github.com/jarretmoses/c2e4786fd342b3444f3bc6beff32098d


[https://gist.github.com/jarretmoses/c2e4786fd342b3444f3bc6beff32098d](https://gist.github.com/jarretmoses/c2e4786fd342b3444f3bc6beff32098d)

~~**!!! me funciona correctamente el detox build --configuration android.emu.release luego de cerrar/abrir la consola**~~
**!!!** ~~**también**~~ **cerrar el emulador manualmente**
y luego 

    detox build --configuration android.emu.release && detox test --configuration android.emu.release


ScrollView
https://facebook.github.io/react-native/docs/scrollview
Modal
https://docs.expo.io/versions/v30.0.0/react-native/modal/#__next

buen ejmplo de pruebas

https://www.netguru.com/codestories/automated-end-to-end-testing-in-react-native-with-detox


tambien

https://blog.logrocket.com/end-to-end-testing-in-react-native-with-detox/



    react-native start # run the watcher (ejecutar el observador)
    detox test -c android.emu.debug # or ios.sim.debug 

con esos dos códigos no hace falta cerrar el emulador para levantar el test

https://www.pusher.com/tutorials/react-native-development-tools-part-3-testing-tools

https://github.com/jmr85/RNTesting


npm install react-native-cli -g

react-native init

tuto crear navegacion:

https://alligator.io/react/react-native-navigation/



    FAILURE: Build failed with an exception.
    
    * What went wrong:
    Execution failed for task ':app:processDebugManifest'.
    > Manifest merger failed : Attribute application@appComponentFactory value=(android.support.v4.app.CoreComponentFactory) from [com.android.support:support-compat:28.0.0] AndroidManifest.xml:22:18-91
            is also present at [androidx.core:core:1.1.0-rc01] AndroidManifest.xml:24:18-86 value=(androidx.core.app.CoreComponentFactory).
            Suggestion: add 'tools:replace="android:appComponentFactory"' to <application> element at AndroidManifest.xml:10:5-28:19 to override.
    
    * Try:
    Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.
    
    * Get more help at https://help.gradle.org
    
    BUILD FAILED in 2s
    10 actionable tasks: 1 executed, 9 up-to-date
    detox[4428] ERROR: [cli.js] Error: Command failed: cd android && gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..

problema con react-navigation 

![](https://paper-attachments.dropbox.com/s_2E91B68AAD6DAFD0FE1CC210A414E16CA85D0E898B00523C2C0989662D18E2E4_1572035750164_image.png)




![](https://paper-attachments.dropbox.com/s_2E91B68AAD6DAFD0FE1CC210A414E16CA85D0E898B00523C2C0989662D18E2E4_1572037024832_image.png)



## Pasos para ejecutar el debug
    detox build --configuration android.emu.debug
    react-native start (o npm start/yarn start)
    detox test --configuration android.emu.debug

También funciona perfectamente con:

    detox build --configuration android.emu.debug
    detox test --configuration android.emu.debug

Luego de hacer un cambio al código para no ejecutar otra vez los comandos combinar ``Ctrl+r` en el emulador para recargar la app y ver los cambios. En MAC es ``CMD+R` 

Si se hace un cambio en las pruebas también para no volver a compilar desde consola tipear: 

    detox test --reuse


https://github.com/wix/Detox/blob/master/docs/Guide.DevelopingWhileWritingTests.md


log

    detox test -c android.emu.debug --loglevel trace

screenshot (por defecto manual,m en caso de querer solo con alguna falla reemplazar la opcion all con failing) --artifacts-location sirve para logs, screens y videos

    detox test -c android.emu.debug --take-screenshots all --artifacts-location artifacts/


    detox test -c android.emu.debug --record-videos all --artifacts-location artifacts/


https://github.com/wix/Detox/blob/master/docs/APIRef.DetoxCLI.md#notice-artifacts


diferencias entre react-native run y start:
Puede ser útil tener una visión general de la [arquitectura React Native](https://www.reactnative.guide/3-react-native-internals/3.1-react-native-internals.html) .
En reacción nativa, cuando escribe, digamos, `<View/>`se envía a través del puente al código nativo y se traduce dinámicamente en `UIView`iOS o `android.view.View`Android. Todos los componentes básicos del `react-native`paquete se han implementado de esta manera. Si desea una funcionalidad nativa adicional en ambas plataformas, por ejemplo, una biblioteca que utiliza componentes de mapas nativos, tendrá que incluir las bibliotecas nativas por separado en su Android `build.gradle`y su iOS `.xcodeproj`.
La `exp`CLI se usa para iniciar aplicaciones creadas con el [SDK de Expo](https://docs.expo.io/versions/v28.0.0/workflow/exp-cli) . Expo es esencialmente una aplicación preconstruida con un cierto conjunto de componentes nativos ya incluidos por conveniencia; todo lo que suministra es su JSX; por lo tanto, la recomendación de "expulsar" a una aplicación nativa de reacción regular si necesita utilizar otras bibliotecas.
`react-native run-ios`y `run-android`crea el nativo `.app`o `.apk`utiliza las cadenas de herramientas de iOS o Android, inicia Metro Bundler, que minimiza y sirve el JSX y otros activos, como imágenes, en su dispositivo en modo de depuración (es posible que vea algo así `Loading from localhost:8081`).
En Android, inicia el `adb`servidor para enviar el APK con todas las bibliotecas nativas incluidas en su dispositivo, si tiene habilitada la depuración de USB. `run-ios`hace lo mismo con el `.app`; Si instala en un simulador, se ha configurado automáticamente `AppDelegate.m`para comunicarse `localhost:8081`, mientras que la recarga en vivo a través de USB debe configurarse manualmente en un dispositivo físico.
`react-native start` simplemente inicia el paquete Metro, lo que es útil si ya tienes la aplicación instalada.
Los comandos que comienzan con `npm`se definen como scripts en su `package.json`archivo. A partir de RN 0.57, `npm start`simplemente llama `node node_modules/react-native/local-cli/cli.js start`; que es lo mismo que correr `react-native start`; [de acuerdo con los documentos](https://facebook.github.io/react-native/docs/understanding-cli) `react-native-cli` instalados por separado, se llamará a la versión instalada localmente de la CLI `node_modules`.

react-native run-android parece ser parecido a detox test (los dos levantan el emulador)

## ORM que usa denis

https://typeorm.io/#/
paquete sqlite: https://www.npmjs.com/package/react-native-sqlite-storage

proyecto de ejemplo: https://www.djamware.com/post/5caec76380aca754f7a9d1f1/react-native-tutorial-sqlite-offline-androidios-mobile-app (github: https://github.com/didinj/react-native-sqlite-offline)

otro ejemplo con sqlite: https://aboutreact.com/example-of-sqlite-database-in-react-native/


## Libreria FileSystem que usa denis:
https://dev-yakuza.github.io/en/react-native/react-native-fs/

## solución al problema react-native navigation

instalarlo de esta manera:

    yarn add react-navigation --save
    yarn add react-navigation-stack --save
    yarn add react-native-gesture-handler --save
    react-native link react-native-gesture-handler

luego agregar en gradle.settings

    android.useAndroidX=true
    android.enableJetifier=true

agregar en settings.gradle

    include ':react-native-gesture-handler'
    project(':react-native-gesture-handler').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-gesture-handler/android')


## solución al problema react-native-sqlite-storage
    yarn add react-native-sqlite-storage --save
    yarn add react-native-elements --save
    react-native link

luego agregar en gradle.settings

    android.useAndroidX=true
    android.enableJetifier=true

agregar en settings.gradle

    include ':react-native-sqlite-storage'
    project(':react-native-sqlite-storage').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-sqlite-storage/platforms/android')

en detox para que me despliegue el servidor, build.gradle (root, no app):

    allprojects {
      ...
    }
    subprojects {
        afterEvaluate {project ->
        // force libs to use recent buildtools
            if (project.hasProperty("android")) {
                android {
                    compileSdkVersion = 28  // change to match your desired version
                    buildToolsVersion = "28.0.3" // ....
                }
            }
        }
    }
    //https://stackoverflow.com/questions/50574492/react-native-error-resource-androidstyle-textappearance-material-widget-butto

en detox me funciono con estas dos lineas:

    implementation('androidx.annotation:annotation:1.0.0-rc02') {
        force = true
    }
    implementation('androidx.legacy:legacy-support-core-utils:1.0.0-rc02') {
        force = true
    }
https://stackoverflow.com/questions/52339944/unable-to-resolve-dependency-for-featuredebugfeature-compileclasspath-could


guia que explica la arquitectura de react-native
https://www.reactnative.guide/3-react-native-internals/3.1-react-native-internals.html


    yarn add react-native-vector-icons --save
    react-native link react-native-vector-icons


con react-native run-android si esta conectado el celular con el usb va a desplegar la app ahi


    react-native run-android
    info Starting JS server...
    info Building and installing the app on the device (cd android && gradlew.bat app:installDebug)...
    
    > Task :app:installDebug
    10:13:19 V/ddms: execute: running am get-config
    10:13:19 V/ddms: execute 'am get-config' on 'ZY3222KJ39' : EOF hit. Read: -1
    10:13:19 V/ddms: execute: returning
    Installing APK 'app-debug.apk' on 'Moto G (5) - 8.1.0' for app:debug
    10:13:19 D/app-debug.apk: Uploading app-debug.apk onto device 'ZY3222KJ39'
    10:13:19 D/Device: Uploading file onto device 'ZY3222KJ39'
    10:13:19 D/ddms: Reading file permision of C:\Users\jruiz\ReactNative\react-native-detox\android\app\build\outputs\apk\debug\app-debug.apk


## GIT

use git reset --hard HEAD para dar marcha atras a los cambios sin agregar en el stage y commit, sirve cuando se cambia muchas cosas que despues no sirve despues de un commit estable.
(https://stackoverflow.com/questions/1304626/git-switch-branch-and-ignore-any-changes-without-committing)

- [**stash**](http://git-scm.com/book/en/v1/Git-Tools-Stashing) your current change (su cambio actual !!!!!) or
- `[reset --hard HEAD](https://git-scm.com/docs/git-reset)` (if you do not mind losing those minor changes) or
- `[checkout -f](https://raw.github.com/git/git/master/Documentation/git-checkout.txt)` (When switching branches, proceed even if the index or the working tree differs from HEAD. This is used to throw away local changes. )
- 

Hacer merge desde un branch nuevo al master

    $ git branch
    * master


    $ git branch new-branch
    $ git branch
    * master
    new-branch


    $ git checkout new-branch
    Switched to branch ‘new-branch'
    $ git branch
      master
    * new-branch


    # ...develop some code...
    $ git add –A
    $ git commit –m "Some commit message"
    $ git checkout master
    Switched to branch 'master'
    $ git merge new-branch
## Para que las pruebas sigan en funcionamiento después de algúna prueba fállida

El trabajo del corredor de pruebas es decidir si debe rescatar o continuar probando las otras pruebas en la suite.
Si desea que las pruebas continúen en funcionamiento retire la `--bail` de su `mocha.opts`
(https://github.com/wix/detox/issues/394)
(https://mochajs.org/api/mocha)


## nhc-mobile

antes me aparecía este error “build failed with: Could not find method enabled() for arguments [[]] on task ':app:bundleDebugJsAndAssets' of type org.gradle.api.tasks.Exec.”, se soluciona con esto:

    @ganico , I just inserted in android/app/build.gradle the following code:
    project.ext.react = [ entryFile: "index.android.js" ]
    Put it before apply from: "../../node_modules/react-native/react.gradle" and it will work.

(https://github.com/facebook/react-native/issues/25542)

el orm no pide el link

## react-native link

`**react-native link**` **o** `**react-native link dependency-name**`
¿Debería usarlo `react-native link`al vincular cualquier dependencia o debería ser más explícito y usar `react-native link dependency-name`?
Desde mi experiencia, es mejor usarlo `react-native link dependency-name`. Esto se debe al hecho de que `react-native link` intentará vincular (o volver a vincular) todas las dependencias que pueden vincularse y esto puede conducir a la duplicación de código. La mayoría de los problemas que he experimentado han sido cuando se vincula la dependencia nativa de Android. Creo que ha habido algún avance para evitar que esto suceda en actualizaciones posteriores, pero el viejo adagio se aplica aquí *una vez mordido, dos veces tímido*
(https://stackoverflow.com/questions/49874385/what-is-react-native-link)

me tiraba errores de sql, con esto se soluciona:

    // file: android/app/build.gradle
    ...
    
    dependencies {
        ...
        implementation project(':react-native-sqlite-storage')
    }

(https://github.com/andpor/react-native-sqlite-storage#how-to-use-android)

Si se va hacer una copia de un proyecto y luego se va a ejecutar hay primero desinstalar la app generada en android por el proyecto original si no va a compilar

si no compila por esto: INSTALL_FAILED_INSUFFICIENT_STORAGE hay que borrar aplicaciones
(https://github.com/facebook/react-native/issues/22202)

