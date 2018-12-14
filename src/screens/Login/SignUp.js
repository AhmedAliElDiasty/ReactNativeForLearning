import React, { PureComponent } from 'react'
import {View,Text} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class SignUp extends PureComponent{
    constructor(args) {
        super(args);
    }
    render(){
        return(
            <View>
                <Text>Sign up</Text>
            </View>
        )
    }
}
export default connect()(SignUp);