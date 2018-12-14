import React from 'react'
import {Text, StyleSheet, TouchableOpacity , View , TouchableNativeFeedback , Platform} from 'react-native'

const ButtonWithBackground = props =>{
    const content = (
        <View style = {[styles.Button,props.style,props.disabled ? styles.disabled : null]}>
            <Text style = {[props.disabled ? styles.disabledText : null]}>{props.children}</Text>
        </View>
    );
    if(props.disabled){
        return content;
    }
    if(Platform.OS == 'android'){
        <TouchableNativeFeedback>
            {content}
        </TouchableNativeFeedback>
    }
    
    return(
        <TouchableOpacity onPress = {props.onPress}>
            {content}
         </TouchableOpacity>
    );
   
}

const styles = StyleSheet.create({
    Button:{
        fontSize:20,
        backgroundColor: '#28aaf4',
        borderRadius: 5,
        padding : 7,
        margin: 8,
        borderWidth: 1,
        borderColor : 'black'
    },
    disabled:{
        backgroundColor:'#eee',
        borderColor:'#aaa'
    },
    disabledText:{
        color:'#aaa',
    }
});

export default ButtonWithBackground;