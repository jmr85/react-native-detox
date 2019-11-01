import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import AppNavigator from './AppNavigator';


class example extends Component {
  render() {
    return <AppNavigator />;
  }
}

AppRegistry.registerComponent('example', () => example);