import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Button, Text, Image } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import t from "tcomb-form-native";
const Form = t.form.Form;
import { RegisterStruct, RegisterOptions } from "../../forms/Register";

import * as firebase from "firebase";

export default class Register extends Component {
  constructor() {
    super();

    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions,
      formData: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      formErrorMessage: ""
    };
  }

  register = () => {
    const { password, passwordConfirmation } = this.state.formData;

    if (password === passwordConfirmation) {
      const validate = this.refs.registerForm.getValue();

      if (validate) {
        this.setState({ formErrorMessage: "" });
        firebase
          .auth()
          .createUserWithEmailAndPassword(validate.email, validate.password)
          .then(resolve => {
            this.refs.toast.show("Registro Correcto", 200, () => {
              this.props.navigation.goBack();
            });
          })
          .catch(err => {
            this.refs.toast.show("El email ya esta en uso.", 2500);
          });
      } else {
        this.setState({
          formErrorMessage: "Formulario Invalido"
        });
      }
    } else {
      this.setState({
        formErrorMessage: "Las contraseñas no son iguales"
      });
    }
  };

  onChangeFormRegister = formValue => {
    this.setState({
      formData: formValue
    });
  };

  render() {
    const { registerStruct, registerOptions, formErrorMessage } = this.state;

    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          containerStyle={styles.containerLogo}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />

        <Form
          ref="registerForm"
          type={registerStruct}
          options={registerOptions}
          value={this.state.formData}
          onChange={formValue => this.onChangeFormRegister(formValue)}
        />
        <Button
          buttonStyle={styles.buttonRegisterContainer}
          title="Unirse"
          onPress={() => this.register()}
        />
        <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={250}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 40,
    marginRight: 40
  },
  containerLogo: {
    alignItems: "center",
    marginBottom: 30
  },
  logo: {
    width: 300,
    height: 150
  },
  buttonRegisterContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  formErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 30
  }
});
