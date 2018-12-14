import {createStore, combineReducers , compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import placeReduder from './reducers/PlacesReducer'
import AuthReducer from './reducers/AuthReducer'

const rootReducer = combineReducers({
    authData:AuthReducer,
    places: placeReduder
});

let composeEnhancer = compose;
if(__DEV__){
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const configureStore = ()=>{
    return createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
};

export default configureStore;