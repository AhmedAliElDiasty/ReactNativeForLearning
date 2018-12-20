import React, { PureComponent } from 'react'
import {View,
    ImageBackground,
     Dimensions,
     StyleSheet, 
     KeyboardAvoidingView,
     Keyboard,
     TouchableWithoutFeedback
   } from 'react-native';
import {connect} from 'react-redux';
import {tryAuth} from '../../store/places/index'
import {startTabs} from '../MainScreens/MainScreens'
import BackGround from '../../assets/beautiful_background.jpg'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import TextHeading from '../../components/UI/TextHeading/TextHeading'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'
import Validate from '../../Utility/validation'
class SignIn extends PureComponent{

    state = {
        viewMode: Dimensions.get('window').height>500?'portrait':'landscape',
        authMode:'login',
        controls:{
            email:{
                value:"",
                valid: false,
                validationRules:{
                    isEmail: true,
                },
                touched:false,
            },
            password:{
                value:"",
                valid: false,
                validationRules:{
                    minLength: 6,
                },
                touched:false,
            },
            confirmPassword:{
                value:"",
                valid: false,
                validationRules:{
                    equalTo: 'password',
                },
                touched:false,
            }
        },
    }
    constructor(props){
        super(props);
        Dimensions.addEventListener("change",this.updateStyle)
    }
    componentWillUnmount(){
        Dimensions.removeEventListener('change',this.updateStyle)
    }

    updateStyle = (dims) =>{
        this.setState({
            viewMode: dims.window.height>500?'portrait':'landscape'
        })
    }
    loginHandler = () =>{
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        this.props.onLogin(authData);
        startTabs();
    }

    switchAuthModeHandler = ()=>{
        this.setState(prevState=>{
            return{
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            }
        })
    }

    updateInputState =(key,value)=>{
        let connectedValue = {}
       console.log(key)
        if(this.state.controls[key].validationRules.equalTo){
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo:equalValue
            } 
        }
        if(key === 'password'){   
            connectedValue = {
                ...connectedValue,
                equalTo:value
            }
        }
        this.setState(prevState=>{
            return{
                
                controls:{
                    ...prevState.controls,
                    confirmPassword:{
                        ...prevState.controls.confirmPassword,
                        valid: key==='password'?
                            Validate(prevState.controls.confirmPassword.value,prevState.controls.confirmPassword.validationRules,connectedValue):
                            prevState.controls.confirmPassword.valid
                    },
                    [key]:{
                        ...prevState.controls[key],
                        value: value,
                        valid:Validate(value,prevState.controls[key].validationRules , connectedValue),
                        touched: true
                    }
                }
               
            };
        });
    }

    render(){
        let title = null;
        let confirmPasswordControl = null;
        if(this.state.viewMode ==='portrait'){
            title = (
                <TextHeading>Please {this.state.authMode ==='login'? 'log in' : 'sign up'}</TextHeading>
            );
        }
        if(this.state.authMode === 'signup'){
            confirmPasswordControl = (
                <View
                    style = {this.state.viewMode==='portrait'
                    ?styles.portraitWrapperPassword
                    :styles.landscapeWrapperPassword}
                    >
                    <DefaultInput 
                        placeholder = 'Confirm Password' 
                        style = {styles.customInput}
                        value = {this.state.controls.confirmPassword.value}
                        onChangeText = {(val)=> this.updateInputState('confirmPassword',val)}
                        valid = {this.state.controls.confirmPassword.valid}
                        touched = {this.state.controls.confirmPassword.touched}
                        secureTextEntry
                        />
                </View>
            );
        }
        return(
            <ImageBackground source= {BackGround} style = {styles.background}>
                <KeyboardAvoidingView style = {styles.container} behavior ='padding'>
                    {title}
                    <ButtonWithBackground onPress = {this.switchAuthModeHandler}>
                    Switch to {this.state.authMode !=='login'? 'log in' : 'sign up'}
                    </ButtonWithBackground>
                    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>                    
                        <View style = {styles.input}> 
                            <DefaultInput 
                                placeholder = 'Your Email Address' 
                                style = {styles.customInput}
                                value = {this.state.controls.email.value}
                                onChangeText = {(val)=> this.updateInputState('email',val)}
                                valid = {this.state.controls.email.valid}
                                touched = {this.state.controls.email.touched}
                                autoFocus
                                autoCapitalize = 'none'
                                keyboardType = 'email-address'
                                />
                            <View 
                            style = {this.state.viewMode==='portrait' || this.state.authMode === 'login'
                                    ? styles.portraitPasswordContainer 
                                : styles.landscapePasswordContainer}
                            >
                                <View
                                style = {this.state.viewMode==='portrait' || this.state.authMode === 'login'
                                        ?styles.portraitWrapperPassword
                                        :styles.landscapeWrapperPassword}
                                >
                                <DefaultInput 
                                        placeholder = 'Enter Password'  
                                        style = {styles.customInput}
                                        value = {this.state.controls.password.value}
                                        onChangeText = {(val)=> this.updateInputState('password',val)}
                                        valid = {this.state.controls.password.valid}
                                        touched = {this.state.controls.password.touched}
                                        secureTextEntry
                                        />
                                </View>
                            {confirmPasswordControl}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <ButtonWithBackground 
                    onPress={this.loginHandler}
                    disabled = {!this.state.controls.email.valid  ||
                                !this.state.controls.password.valid ||
                                !this.state.controls.confirmPassword.valid && this.state.authMode==='signup'} 
                    
                    >login</ButtonWithBackground>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor: 'rgba(255,255,255,0.1)', flex: 1
    },
    background:{
        flex:1,
    },
    input:{
        width:'80%'
    },
    customInput:{
        backgroundColor:'#eee'
    },
    portraitPasswordContainer:{
        flexDirection:'column',
        justifyContent: 'flex-start'       
    },
    landscapePasswordContainer:{
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    portraitWrapperPassword:{
        width: '100%'
    },
    landscapeWrapperPassword:{
        width: '45%'
    },
    
});
const mapDispatchToProps = dispatch =>{
    return{
        onLogin: (authData) =>dispatch(tryAuth(authData))
    }
}
export default connect(null,mapDispatchToProps)(SignIn);