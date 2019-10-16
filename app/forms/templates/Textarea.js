import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

export default (Textarea = locals => {
  return (
    <View style={styles.viewContainer}>
      <Input
        placeholder={locals.config.placeholder}
        multiline={true}
        onChangeText={value => locals.onChange(value)}
        inputContainerStyle={styles.inputContainer}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  viewContainer: {
    margin: 12,
    height: 100,
    width: "100%"
  },
  inputContainer: {
    position: "absolute",
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  }
});
