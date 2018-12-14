import React , {Component} from 'react'
import {Image , View , StyleSheet , Dimensions} from 'react-native'
import ButtonWithBackground from '../ButtonWithBackground/ButtonWithBackground'
import ImagePicker from 'react-native-image-picker'


class imagePicker extends Component{
    state = {
        pickedImage : null,
        imageChoosen: false
    }
    pickImageHandler = ()=>{
        ImagePicker.showImagePicker({
            title:'Pick an image'},res=>{
                if(res.didCancel){
                    alert('User cancelled!');
                }else if (res.error) {
                    alert('Error ',res.error);
                }else{
                    this.setState({
                        pickedImage: {uri :res.uri},
                        imageChoosen: true
                    });
                    this.props.onImagePick({
                        uri :res.uri,
                        base64: res.data
                    })
                }
            });
           
    }
    render(){
        return(
            <View style = {styles.mainView}>
                <View style = {styles.imageView}>
                    <Image source = {this.state.pickedImage} style = {styles.wrapImage}/>
                </View>
                <ButtonWithBackground onPress = {this.pickImageHandler}>Pick image</ButtonWithBackground>
            </View>
        );
    }
  
}
const styles = StyleSheet.create({
    mainView:{
        width: '100%',
        alignItems:'center'
    },
    imageView:{
        width:'70%',
        height: 150,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee'
    },
    wrapImage:{
        width : '100%',
        height : '100%'
    }
});

export default imagePicker;