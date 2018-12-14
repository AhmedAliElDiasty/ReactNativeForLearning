import React from 'react'
import {TextInput, StyleSheet} from 'react-native'

const DefaultInput = props =>{
    return(
        <TextInput 
            underlineColorAndroid = 'transparent'
            {...props}
            style = {[styles.TextInput,props.style, !props.valid && props.touched? styles.invalid:null]}
        />
    );
}

const styles = StyleSheet.create({
    TextInput:{
        width: '100%',
        padding : 5,
        margin: 10,
        borderWidth: 1,
        borderColor : '#bbb',

    },
    invalid:{
        backgroundColor:'#f9c0c0',
        borderColor:'red'
    }
})

export default DefaultInput;