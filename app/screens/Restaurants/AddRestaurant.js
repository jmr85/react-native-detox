import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Icon, Image, Button, Text, Overlay } from "react-native-elements";
import { Permissions, ImagePicker } from "expo";
import Toast, { DURATION } from "react-native-easy-toast";
import { uploadImage } from "../../utils/UploadImage";

import t from "tcomb-form-native";
const Form = t.form.Form;
import {
  AddRestaurantStruct,
  AddRestaurantOptions
} from "../../forms/AddRestaurant";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class AddRestaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      imageUriRestaurant: "",
      formData: {
        name: "",
        city: "",
        address: "",
        description: ""
      }
    };
  }

  isImageRestaurant = image => {
    if (image) {
      return (
        <Image source={{ uri: image }} style={{ width: 500, height: 200 }} />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/img/no-image.png")}
          style={{ width: 200, height: 200 }}
        />
      );
    }
  };

  uploadImage = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (resultPermission.status === "denied") {
      this.refs.toast.show(
        "Es necesario aceptar los permisos de la galeria",
        1500
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });

      if (result.cancelled) {
        this.refs.toast.show("Has cerrado la galeria de imagenes", 1500);
      } else {
        this.setState({
          imageUriRestaurant: result.uri
        });
      }
    }
  };

  onChangeFormAddRestaurant = formValue => {
    this.setState({
      formData: formValue
    });
  };

  addRestaurant = () => {
    const { imageUriRestaurant } = this.state;
    const { name, city, address, description } = this.state.formData;

    if (imageUriRestaurant && name && city && address && description) {
      this.setState({ loading: true });

      db.collection("restaurants")
        .add({
          name,
          city,
          address,
          description,
          image: "",
          rating: 0,
          ratingTotal: 0,
          quantityVoting: 0,
          createAt: new Date()
        })
        .then(resolve => {
          const restaurantId = resolve.id;

          uploadImage(imageUriRestaurant, restaurantId, "restaurants")
            .then(resolve => {
              const restaurantRef = db
                .collection("restaurants")
                .doc(restaurantId);

              restaurantRef
                .update({ image: resolve })
                .then(() => {
                  this.setState({ loading: false });
                  this.refs.toast.show(
                    "Restaurante creado correctamente",
                    100,
                    () => {
                      this.props.navigation.state.params.loadRestaurants();
                      this.props.navigation.goBack();
                    }
                  );
                })
                .catch(() => {
                  this.refs.toast.show("Error de servidor intentelo mas tarde");
                  this.setState({ loading: false });
                });
            })
            .catch(() => {
              this.refs.toast.show("Error de servidor intentelo mas tarde");
              this.setState({ loading: false });
            });
        })
        .catch(() => {
          this.refs.toast.show("Error de servidor intentelo mas tarde");
          this.setState({ loading: false });
        });
    } else {
      this.refs.toast.show("Tienes que rellenar todos los campos");
    }
  };

  render() {
    const { imageUriRestaurant, loading } = this.state;

    return (
      <View style={styles.viewBody}>
        <View style={styles.viewPhoto}>
          {this.isImageRestaurant(imageUriRestaurant)}
        </View>
        <View>
          <Form
            ref="addRestaurantForm"
            type={AddRestaurantStruct}
            options={AddRestaurantOptions}
            value={this.state.formData}
            onChange={formValue => this.onChangeFormAddRestaurant(formValue)}
          />
        </View>
        <View style={styles.viewIconUploadPhoto}>
          <Icon
            name="camera"
            type="material-community"
            color="#7A7A7A"
            iconStyle={styles.addPhotoIcon}
            onPress={() => this.uploadImage()}
          />
        </View>
        <View style={styles.viewBtnAddRestaurant}>
          <Button
            title="Crear Restaurante"
            onPress={() => this.addRestaurant()}
            buttonStyle={styles.btnAddRestaurant}
          />
        </View>

        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={loading}
          width="auto"
          height="auto"
        >
          <View>
            <Text style={styles.overlayLoadingText}>Creando Restaurante</Text>
            <ActivityIndicator size="large" color="#00a680" />
          </View>
        </Overlay>

        <Toast
          ref="toast"
          position="bottom"
          positionValue={320}
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
    flex: 1
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewIconUploadPhoto: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 12
  },
  addPhotoIcon: {
    backgroundColor: "#e3e3e3",
    padding: 17,
    paddingBottom: 14,
    margin: 0
  },
  viewBtnAddRestaurant: {
    flex: 1,
    justifyContent: "flex-end"
  },
  btnAddRestaurant: {
    backgroundColor: "#00a680",
    margin: 20
  },
  overlayLoading: {
    padding: 20
  },
  overlayLoadingText: {
    color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  }
});
