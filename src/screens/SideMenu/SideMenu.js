import React , {Component} from 'react'
import {View, Text , StyleSheet , Dimensions , TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {tryAuth} from '../../store/places/index'
import {Login} from '../MainScreens/MainScreens'

class SideMenu extends Component{
    render(){
        // logout = ()=>{
        //     alert('hello')
        //     this.props.onLogin(null);
        //     Login();
        // }
        return(
            <View style = {styles.drawer}>
                <TouchableOpacity onPress = {this.logout}>
                    <View style = {styles.drawerItem}>
                        <Icon name= 'sign-out' size = {30} color="#000" ></Icon>
                        <Text style ={styles.myText}>Log out</Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.logout}>
                    <View style = {styles.drawerItem}>
                        <Icon name= 'sign-out' size = {30} color="#000" ></Icon>
                        <Text style ={styles.myText}>Hello</Text>

                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
styles = StyleSheet.create({
    drawer:{
        backgroundColor: 'white',
        paddingTop: 20,
        flex : 1,
        width: Dimensions.get("window").width*0.8
    
    }, 
    myText:{
        fontSize: 22
    },
    drawerItem:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor:'#eee',
        margin:5,
        padding:7
    },
})
const mapDispatchToProps = dispatch =>{
    return{
        onLogin:(authData)=>dispatch(tryAuth(authData))
    }
}

export default connect(null,mapDispatchToProps)(SideMenu);

