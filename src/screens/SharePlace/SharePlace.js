import React ,{Component} from 'react'
import {View , StyleSheet , ScrollView ,Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {addPlace} from '../../store/places/index'
import TextHeading from '../../components/UI/TextHeading/TextHeading'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import ImagePicker from '../../components/UI/ImagePicker/ImagePicker'
import MapPicker from '../../components/UI/MapPicker/MapPicker';
import Validate from '../../Utility/validation'
import {Navigation} from 'react-native-navigation'

class SharePlace extends Component{
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
        controls:{
            placeName:{
                value: '',
                valid: false,
                touched: false,
                validationRules:{
                    notEmpty:true
                }
            },
           
        }, location:{
            value: null,
            valid: false
        },
        image:{
            value: null,
            valid: false
        }
      };
    
    
    
     
   
    changeHandler = (value) =>{
        this.setState(prevState=>{
            return{        
                controls:{
                    placeName:{
                        ...prevState.controls,
                        value: value,
                        valid:Validate(value,prevState.controls.validationRules),
                        touched: true
                    }
                }
            }
        });
    }

    onLocationPickHandler = location =>{
        this.setState(prevState=>{
            return{
                ...prevState,
                location:{
                    value: location,
                    valid: true
                }   
            }
        });
    }

    onImagePickHandler = image =>{
        this.setState(prevState=>{
            return{
                ...prevState,
                image:{
                    value: image,
                    valid: true
                }   
            }
        });
    }
    placesAddedHandler = () =>{
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.location.value,
            this.state.image.value
            );
    };
    

    render(){
        return(
            <ScrollView > 
                <View style = {styles.container} behavior = 'padding'>
                    <TextHeading>Share Place</TextHeading>
                    <ImagePicker onImagePick = {this.onImagePickHandler}/>
                    <MapPicker onLocationPick = {this.onLocationPickHandler}/>
                    <PlaceInput placeName = {this.state.placeName} onChangeHandler = {this.changeHandler}/>
                    <ButtonWithBackground 
                        onPress = {this.placesAddedHandler}
                        disabled = {
                            !this.state.controls.placeName.valid ||
                            !this.state.location.valid ||
                            !this.state.image.valid
                        }
                        >Share the place!</ButtonWithBackground>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        width:'100%'
    },  
  
});
const mapDispatch = dispatch =>{
    return{
        onAddPlace: (placeName,location,image) => dispatch(addPlace(placeName,location,image))
    };
};

export default connect(null,mapDispatch) (SharePlace);