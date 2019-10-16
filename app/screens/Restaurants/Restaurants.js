import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Image } from "react-native-elements";

import ActionButton from "react-native-action-button";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class Restaurants extends Component {
  constructor() {
    super();

    this.state = {
      login: false,
      restaurants: null,
      startRestaurants: null,
      limitRestaurants: 8,
      isLoading: true
    };
  }

  componentDidMount() {
    this.checkLogin();
    this.loadRestaurants();
  }

  checkLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          login: true
        });
      } else {
        this.setState({
          login: false
        });
      }
    });
  };

  loadActionButton = () => {
    const { login } = this.state;

    if (login) {
      return (
        <ActionButton
          buttonColor="#00a680"
          onPress={() =>
            this.props.navigation.navigate("AddRestaurant", {
              loadRestaurants: this.loadRestaurants
            })
          }
        />
      );
    }

    return null;
  };

  loadRestaurants = async () => {
    const { limitRestaurants } = this.state;
    let resultRestaurants = [];

    const restaurants = db
      .collection("restaurants")
      .orderBy("createAt", "desc")
      .limit(limitRestaurants);

    await restaurants.get().then(response => {
      this.setState({
        startRestaurants: response.docs[response.docs.length - 1]
      });

      response.forEach(doc => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        resultRestaurants.push({ restaurant });
      });

      this.setState({
        restaurants: resultRestaurants
      });
    });
  };

  handleLoadMore = async () => {
    const { limitRestaurants, startRestaurants } = this.state;
    let resultRestaurants = [];

    this.state.restaurants.forEach(doc => {
      resultRestaurants.push(doc);
    });

    const restaurantsDb = db
      .collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants);

    await restaurantsDb.get().then(response => {
      if (response.docs.length > 0) {
        this.setState({
          startRestaurants: response.docs[response.docs.length - 1]
        });
      } else {
        this.setState({
          isLoading: false
        });
      }

      response.forEach(doc => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        resultRestaurants.push({ restaurant });
      });

      this.setState({
        restaurants: resultRestaurants
      });
    });
  };

  renderRow = restaurant => {
    const {
      name,
      city,
      address,
      description,
      image
    } = restaurant.item.restaurant;
    return (
      <TouchableOpacity onPress={() => this.clickRestaurant(restaurant)}>
        <View style={styles.viewRestaurant}>
          <View style={styles.viewRestaurantImage}>
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={styles.imageRestaurant}
            />
          </View>
          <View>
            <Text style={styles.flatListRestaurantName}>{name}</Text>
            <Text style={styles.flatListRestaurantAddress}>
              {city}, {address}
            </Text>
            <Text style={styles.flatListRestaurantDescription}>
              {description.substr(0, 60)}...
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.notFoundRestaurants}>
          <Text>No quedan restaurantes por cargar</Text>
        </View>
      );
    }
  };

  renderFlatList = restaurants => {
    if (restaurants) {
      return (
        <FlatList
          data={this.state.restaurants}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={this.renderFooter}
        />
      );
    } else {
      return (
        <View style={styles.startLoadRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando restaurantes</Text>
        </View>
      );
    }
  };

  clickRestaurant = restaurant => {
    this.props.navigation.navigate("Restaurant", { restaurant });
  };

  render() {
    const { restaurants } = this.state;

    return (
      <View style={styles.viewBody}>
        {this.renderFlatList(restaurants)}
        {this.loadActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  startLoadRestaurants: {
    marginTop: 20,
    alignItems: "center"
  },
  viewRestaurant: {
    flexDirection: "row",
    margin: 10
  },
  viewRestaurantImage: {
    marginRight: 15
  },
  imageRestaurant: {
    width: 80,
    height: 80
  },
  flatListRestaurantName: {
    fontWeight: "bold"
  },
  flatListRestaurantAddress: {
    paddingTop: 2,
    color: "grey"
  },
  flatListRestaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10
  },
  notFoundRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center"
  }
});
