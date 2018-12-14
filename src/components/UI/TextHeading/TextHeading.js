import React from 'react'
import {Text, StyleSheet} from 'react-native'

const TextHeading = props =>{
    return(
        <Text style = {[styles.TextHeading,props.style]}>{props.children}</Text>
    );
}

const styles = StyleSheet.create({
    TextHeading:{
        fontSize: 28,
        color: 'black',
        backgroundColor: 'transparent',
    }
    

})

export default TextHeading;