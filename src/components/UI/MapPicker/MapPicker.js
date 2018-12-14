import React, {Component} from 'react'
import {Dimensions , View , StyleSheet} from 'react-native'
import ButtonWithBackground from '../ButtonWithBackground/ButtonWithBackground'
import MapView from 'react-native-maps'




class mapPicker extends Component{

    state = {
        focusedLocation:{
            latitude:31.25654,
            longitude:32.28411,
            latitudeDelta:0.0122,
            longitudeDelta: 
                Dimensions.get('window').width/
                Dimensions.get('window').height*0.122,
        },
            locationChosen: false
    }
    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
          ...this.state.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        });
        this.setState(prevState => {
          return {
            focusedLocation: {
              ...prevState.focusedLocation,
              latitude: coords.latitude,
              longitude: coords.longitude
            },
            locationChosen: true
          };
        });
        this.props.onLocationPick({
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      };
    
      getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coordsEvent = {
            nativeEvent: {
              coordinate: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
              }
            }
          };
          this.pickLocationHandler(coordsEvent);
          },err=>{
            console.log(err)
            alert("fetching the position is failed, please pick one manually!")
          })
      }
      

    render(){
        let marker =null
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
          }
          return(
            <View style = {styles.mainView}>
                <MapView 
                    style = {styles.map}
                    initialRegion = {this.state.focusedLocation}
                    onPress = {this.pickLocationHandler}
                    ref = {ref=>this.map = ref}
                    >
                    {marker}
                </MapView>
                <ButtonWithBackground onPress = {this.getLocationHandler}>Pick Map</ButtonWithBackground>
            </View>
          );
       
    };
}
const styles = StyleSheet.create({
    mainView:{
        width: '100%',
        alignItems:'center'
    },
    map:{
        width: '100%',
        height: 250,
    },
    wrapImage:{
        width : '80%',
        height : '100%'
    }
});

export default mapPicker;
