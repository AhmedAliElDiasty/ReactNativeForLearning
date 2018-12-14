import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import DefaultInput from '../UI/DefaultInput/DefaultInput'

const PlaceInput = props =>{

    return (
      <View style={styles.inputContainer}>
        <DefaultInput
         placeholder = "Place name" 
         value = {props.placeName} 
         onChangeText = {props.onChangeHandler}/>
      </View>
    );
  
}

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
});

export default PlaceInput;
