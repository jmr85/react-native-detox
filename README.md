> It is a fork of the [Detox Demo Project](https://github.com/wix/Detox/tree/master/examples/demo-react-native)

# React Native Detox

## Requirements
* Windows 8 or 10.
* Have Node installed.
* Make sure you have react-native dependencies installed:
   * react-native-cli is installed (`npm install -g react-native-cli`)

### Step 1: Npm install
* replace the name of the emulator where it says the `"name":` inside `package.json`.
```json
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
 ```

* Make sure you're in folder `/react-native-detox`.
* Run `npm install`.


## To test Release build of your app
### Step 2: Build 
* Build the demo project for ios
 
 ```sh
 detox build --configuration ios.sim.release
 ```
 * Build the demo project for android
 
 ```sh
 detox build --configuration android.emu.release
 ```
 
### Step 3: Test 
* Run tests on the demo project for ios
 
 ```sh
 detox test --configuration ios.sim.release
 ```
* Run tests on the demo project for android
 
 ```sh
 detox test --configuration android.emu.release
 ```
 This action will open a new simulator and run the tests on it.

## To test Debug build of your app
### Step 2: Build 
* Build the demo project for ios
 
 ```sh
 detox build --configuration ios.sim.debug
 ```
* Build the demo project for android
 
 ```sh
 detox build --configuration android.emu.debug
 ``` 
 
### Step 3: Test 

 * start react-native packager
 
  ```sh
 npm run start
 ```
 * Run tests on the demo project
 
 ```sh
 detox test --configuration ios.sim.debug
 ```
```sh
 detox test --configuration android.emu.debug
 ```

### Build and Test more simple in CMD
* Build and Test the demo project for ios
 
 ```sh
 detox build --configuration ios.sim.release && detox test --configuration ios.sim.release
 ```
* Build and Test the demo project for android
 
 ```sh
 detox build --configuration android.emu.release && detox test --configuration android.emu.release
 ``` 

 This action will open a new simulator or emulator and run the tests on it.
