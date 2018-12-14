import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {View,Text, TouchableOpacity , StyleSheet , Animated} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'
// import Icon from 'react-native-vector-icons/FontAwesome';
import PlaceList from '../../components/PlaceList/PlaceList'


class FindPlace extends PureComponent{
    constructor(props) {
        super(props);
        // this.isSideDrawerVisible = false; 
        Navigation.events().bindComponent(this);
      }
    static options(passProps) {
        return {
          topBar: {
            rightButtons: {
              id: 'rightButton',
              icon: require('./icon.png')
            }
          }
        };
      }
      navigationButtonPressed({ buttonId  }) {
        if(buttonId === 'rightButton'){
        // (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
            Navigation.mergeOptions('SideMenu.left', {
                sideMenu: {
                    right: {
                        visible: true,
                    }
                }
            });
            // alert('Hello world')
        }
    }
    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1)
    }

    itemSelectedHandler = key =>{
        const selItem =  this.props.places.find(places=>{
            return key === places.key;
           })
        Navigation.push(this.props.componentId, {
            component: {
              name: 'test.viewPlace',
              passProps: {
                selectedPlace : selItem
              },
              options: {
                topBar: {
                  title: {
                    text: selItem.name
                  }
                }
              }
            }
          });
    }

    placesSearchHandler = () =>{
        Animated.timing(this.state.removeAnim , 
            {
                toValue:0,
                duration:500,
                useNativeDriver:true,

            }).start(()=>{
                this.setState({
                    placesLoaded : true
                })
            });
    }
    render(){
        let content = (
            <Animated.View style={{
                opacity:this.state.removeAnim,
                transform:[
                    {
                        scale:this.state.removeAnim.interpolate({
                            inputRange:[0,1],
                            outputRange:[10,1]
                        })
                    }
                ]
            }}>
                <TouchableOpacity onPress = {this.placesSearchHandler}>
                <View style = {styles.searchButton}>
                    <Text style = {styles.text}>
                        Find places
                    </Text>
                </View>
                </TouchableOpacity>
            </Animated.View>

        );
        if(this.state.placesLoaded){
            content =(
                <PlaceList places = {this.props.places} onItemSelected = {this.itemSelectedHandler}/>                
            );
        }
        return(
            <View style = {this.state.placesLoaded? null:styles.buttonContainer}>
                {content}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    searchButton:{
        borderWidth: 1,
        borderColor:'orange',
        borderRadius:50,
        padding:20,
    },
    text:{
        color:'orange',
        fontWeight:'bold',
        fontSize: 26,

    },
    buttonContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
   
});
const mapStateToProps = state =>{
    return{
        places : state.places.places
    }
}
export default connect(mapStateToProps)(FindPlace);