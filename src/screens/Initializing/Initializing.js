import React, { Component } from 'react'
import { Text,View,AsyncStorage } from 'react-native'
// import {TRY_AUTH} from '../../store/places/actionType'
import {startTabs,Login} from '../MainScreens/MainScreens'
import {connect} from 'react-redux'

class Initializing extends Component{

    render(){
        const user = this.props.authData
        if(user){
            startTabs();
        }else{
            Login();
        }
    
        return(
            <View>
                <Text>Loading</Text>
            </View>
        );
    }
}
const mapStateToProps = state =>{
    return{
        authData: state.authData.AuthData
    }
}
export default connect(mapStateToProps)(Initializing);