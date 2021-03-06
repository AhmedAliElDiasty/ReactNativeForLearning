import React ,{Component}from 'react';

import {View , Text , Image , StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import {deletePlace} from '../../store/places/index'
import MapView from 'react-native-maps'



class placeDetail extends Component{
    state = {
        viewMode: "portrait"
    }
    placeDeletedHandler = ()=>{
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
      }
    
      componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
      }

      updateStyles = dims => {
        this.setState({
          viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
      };
    
    render(){
        return(
            <View
            style={[
              styles.container,
              this.state.viewMode === "portrait"
                ? styles.portraitContainer
                : styles.landscapeContainer
            ]}
          >
            <View style={styles.placeDetailContainer}>
              <View style={styles.subContainer}>
                    <Image source = {this.props.selectedPlace.image} style = {styles.placeImage} resizeMode = "stretch"/>
                </View>
                <View style = {styles.subContainer}>
                    <MapView 
                        style = {styles.map}
                        initialRegion = {{
                            ...this.props.selectedPlace.location,
                            latitudeDelta: 0.0122,
                            longitudeDelta:
                            Dimensions.get("window").width /
                            Dimensions.get("window").height *
                            0.0122
                        }}
                    
                        >
                        <MapView.Marker coordinate={this.props.selectedPlace.location} />
                    </MapView>
                </View>
                </View>
               <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {this.props.selectedPlace.name}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name='trash'
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
            </View>

        
        );
    }
};

const styles =StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
      },
      portraitContainer: {
        flexDirection: "column"
      },
      landscapeContainer: {
        flexDirection: "row"
      },
      placeDetailContainer: {
        flex: 2
      },
      placeImage: {
        width: "100%",
        height: "100%"
      },
      placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
      },
      map: {
        ...StyleSheet.absoluteFillObject
      },
      deleteButton: {
        alignItems: "center"
      },
      subContainer: {
        flex: 1
      }
});

const mapDispatchToProps = dispatch=>{
    return{
        onDeletePlace : key => dispatch(deletePlace(key))
    };
}
export default connect(null,mapDispatchToProps)(placeDetail);