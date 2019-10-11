> detox

# React Native Demo Project

## Requirements
* Windows 8 or 10.
* Have Node installed.
* Make sure you have react-native dependencies installed:
   * react-native-cli is installed (`npm install -g react-native-cli`)

### Step 1: Npm install

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
