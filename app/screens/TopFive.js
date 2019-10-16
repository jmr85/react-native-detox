import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Card, Image, Rating } from "react-native-elements";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class TopFive extends Component {
  constructor() {
    super();

    this.state = {
      restaurants: null
    };
  }

  componentDidMount = () => {
    this.loadTopFiveRestaurants();
  };

  loadTopFiveRestaurants = async () => {
    const restaurants = db
      .collection("restaurants")
      .orderBy("rating", "desc")
      .limit(5);

    let restaurantsArray = [];

    await restaurants.get().then(response => {
      response.forEach(doc => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        restaurantsArray.push(restaurant);
      });
    });

    this.setState({
      restaurants: restaurantsArray
    });
  };

  renderRestaurants = restaurants => {
    if (restaurants) {
      return (
        <View>
          {restaurants.map((restaurant, index) => {
            let restaurantClick = {
              item: {
                restaurant: null
              }
            };
            restaurantClick.item.restaurant = restaurant;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.clickRestaurant(restaurantClick)}
              >
                <Card>
                  <Image
                    style={styles.restaurantImage}
                    resizeMode="cover"
                    source={{ uri: restaurant.image }}
                  />
                  <View style={styles.titleRating}>
                    <Text style={styles.title}>{restaurant.name}</Text>
                    <Rating
                      imageSize={20}
                      startingValue={restaurant.rating}
                      readonly
                      style={styles.rating}
                    />
                  </View>
                  <Text style={styles.description}>
                    {restaurant.description}
                  </Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
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
      <ScrollView style={styles.viewBody}>
        {this.renderRestaurants(restaurants)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  restaurantImage: {
    width: "100%",
    height: 200
  },
  titleRating: {
    flexDirection: "row",
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  },
  description: {
    color: "grey",
    marginTop: 10,
    textAlign: "justify"
  }
});
