import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, Button } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import UpdateUserInfo from "./UpdateUserInfo";

import * as firebase from "firebase";

import { Permissions, ImagePicker } from "expo";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      userInfo: {}
    };
  }

  componentDidMount = async () => {
    await this.getUserInfo();
  };

  getUserInfo = () => {
    const user = firebase.auth().currentUser;
    user.providerData.forEach(userInfo => {
      this.setState({
        userInfo
      });
    });
  };

  reauthenticate = currentPassword => {
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(credentials);
  };

  checkUserAvatar = photoURL => {
    return photoURL
      ? photoURL
      : "https://api.adorable.io/avatars/285/abott@adorable.png";
  };

  updateUserDisplayName = async newDisplayName => {
    const update = {
      displayName: newDisplayName
    };
    await firebase.auth().currentUser.updateProfile(update);

    this.getUserInfo();
  };

  updateUserEmail = async (newEmail, password) => {
    this.reauthenticate(password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            this.refs.toast.show(
              "Email actualizado, vuelve a iniciar sesión",
              50,
              () => {
                firebase.auth().signOut();
              }
            );
          })
          .catch(err => {
            this.refs.toast.show(err, 1500);
          });
      })
      .catch(err => {
        this.refs.toast.show("Tu contraseña no es correcta", 1500);
      });
  };

  updateUserPassword = async (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword)
      .then(() => {
        const user = firebase.auth().currentUser;

        user
          .updatePassword(newPassword)
          .then(() => {
            this.refs.toast.show(
              "Contraseña actualizada correctamente, vuelve a iniciar sesión",
              50,
              () => {
                firebase.auth().signOut();
              }
            );
          })
          .catch(() => {
            this.refs.toast.show(
              "Error del servidor, intentelo mas tarde",
              1500
            );
          });
      })
      .catch(() => {
        this.refs.toast.show(
          "Tu contraseña actual introducida no es correcta",
          1500
        );
      });
  };

  returnUpdateUserInfoComponent = userInfoData => {
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          userInfo={this.state.userInfo}
          updateUserDisplayName={this.updateUserDisplayName}
          updateUserEmail={this.updateUserEmail}
          updateUserPassword={this.updateUserPassword}
        />
      );
    }
  };

  updateUserPhotoURL = async photoUri => {
    const update = {
      photoURL: photoUri
    };
    await firebase.auth().currentUser.updateProfile(update);

    this.getUserInfo();
  };

  changeAvatarUser = async () => {
    const resultPermision = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (resultPermision.status === "denied") {
      this.refs.toast.show(
        "Es necesario aceptar los permisos de la galeria",
        1500
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        this.refs.toast.show("Has cerrado la galeria de imagenes", 1500);
      } else {
        const { uid } = this.state.userInfo;

        this.uploadImage(result.uri, uid)
          .then(resolve => {
            this.refs.toast.show("Avatar actualizado correctamente");

            firebase
              .storage()
              .ref("avatar/" + uid)
              .getDownloadURL()
              .then(resolve => {
                this.updateUserPhotoURL(resolve);
              })
              .catch(erro => {
                this.refs.toast.show(
                  "Error al recuperar el avatar del servidor"
                );
              });
          })
          .catch(error => {
            this.refs.toast.show(
              "Error al actualizar el avatar, intentelo mas tarde."
            );
          });
      }
    }
  };

  uploadImage = async (uri, nameImage) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };

      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    })
      .then(async resolve => {
        let ref = firebase
          .storage()
          .ref()
          .child("avatar/" + nameImage);
        return await ref.put(resolve);
      })
      .catch(error => {
        this.refs.toast.show(
          "Error al subir la imagen al sevridor, intentelo mas tarde",
          1500
        );
      });
  };

  render() {
    const { displayName, email, photoURL } = this.state.userInfo;

    return (
      <View>
        <View style={styles.viewUserInfo}>
          <Avatar
            rounded
            size="large"
            showEditButton
            onEditPress={() => this.changeAvatarUser()}
            source={{
              uri: this.checkUserAvatar(photoURL)
            }}
            containerStyle={styles.userInfoAvatar}
          />
          <View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text>{email}</Text>
          </View>
        </View>

        {this.returnUpdateUserInfoComponent(this.state.userInfo)}

        <Button
          title="Cerrar Sesión"
          onPress={() => firebase.auth().signOut()}
          buttonStyle={styles.btnCloseSession}
          titleStyle={styles.btnCloseSessionText}
        />

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
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10
  },
  btnCloseSessionText: {
    color: "#00a680"
  }
});
