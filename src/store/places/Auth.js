import {TRY_AUTH} from './actionType'

export const tryAuth = (AuthData)=>{
    return{
        type: TRY_AUTH,
        AuthData:AuthData
    }
}