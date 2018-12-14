import {TRY_AUTH} from '../places/actionType'
const initializeState = {
    AuthData:''
}

 const AuthReducer = (state = initializeState,action)=>{
    switch(action.type){
        case TRY_AUTH:
            return{
                ...state,
                AuthData:action.AuthData
            }
        default:
            return{
                ...state
            }
    }
}
export default AuthReducer;