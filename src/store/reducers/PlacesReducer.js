import { ADD_PLACE,DELETE_PLACE } from "../places/actionType";


const initializeState = {
    Places:[],
    
}

const placesReducer = (state = initializeState,action)=>{
    switch (action.type){
        case ADD_PLACE:
            return{
                ...state,
                places: state.Places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: {
                        uri:action.image.uri
                    },
                    location: action.location
                })
            }
        case DELETE_PLACE:
            return{
                ...state,
                places: state.places.filter(places=>{
                    return places.key!==action.placeKey
                })
            }
        default:
            return{
                ...state
            }
    }
}

export default placesReducer;