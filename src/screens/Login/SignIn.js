import React, { PureComponent } from 'react'
import {View, TextInput, Text, Button,StyleSheet} from 'react-native'
import {AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {tryAuth} from '../../store/places/index'
import {startTabs} from '../MainScreens/MainScreens'
class SignIn extends PureComponent{

    static propsType= {
        
    }
    state = {
        userName:'',
        password:''
    }
    onChangeText(key,value){
        this.setState({
            [key]:value
        })
    }
    signIn = () =>{
        
        try{  
              
            this.props.onLogin(this.state.userName) 
            startTabs();

        }catch(exp){
            alert(exp)
            console.log(exp);
            
        }
    }

    render(){
        return(
            <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('userName', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button
          title='Sign In'
          onPress={this.signIn}
        />
      </View>
        );
    }
}
const styles = StyleSheet.create({
    input: {
      width: 350,
      fontSize: 18,
      fontWeight: '500',
      height: 55,
      backgroundColor: '#42A5F5',
      margin: 10,
      color: 'white',
      padding: 8,
      borderRadius: 14
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
const mapDispatchToProps = dispatch =>{
    return{
        onLogin:(authData)=>dispatch(tryAuth(authData))
    }
}

export default connect(null,mapDispatchToProps)(SignIn);