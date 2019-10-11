import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  ScrollView,
  StyleSheet,
  Modal
} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';


class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: undefined,
      modalVisible: false,
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    if (this.state.greeting) return this.renderAfterButton();
    return (
      <View testID='welcome' style={{flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text h1>Welcome</Text>
          <Modal 
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View testID="view_modal_id" style={styles.modal}>
              <View>
                <Text h1>Modal</Text>
                
                <Button title="Hide Modal" testID="button_hide_id"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </Button>
              </View>
            </View>
          </Modal>
          <Button title="Show Modal" testID="button_modal_id"
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>Show Modal</Text>
          </Button>
          
          <Input placeholder='TEXT INPUT' testID="mytextinput"/>

          <ScrollView testID="scroll" style={styles.scrollView}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
          <Button title="Say Hello" testID='hello_button' onPress={this.onButtonPress.bind(this, 'Hello')}/>
          
          <Button title="Say World" testID='world_button' onPress={this.onButtonPress.bind(this, 'World')}/>
               
          <Button title="Say Goodbye" testID='goodbye_button' onPress={this.onButtonPress.bind(this, 'Goodbye, World')}/>
         
      </View>
    );
  }
  renderAfterButton() {
    return (
      <View style={{flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 25}}>
          {this.state.greeting}!!!
        </Text>
      </View>
    );
  }
  onButtonPress(greeting) {
    this.setState({
      greeting: greeting
    });
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'brown',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  modal: {  
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor : "#00BCD4",   
    height: 300 ,  
    width: '80%',  
    borderRadius:10,  
    borderWidth: 1,  
    borderColor: '#fff',    
    marginTop: 80,  
    marginLeft: 40,  
     
    },
});

AppRegistry.registerComponent('example', () => example);
