import { FETCH_USER } from '../actions/types';

// We create a reducer here and we import it to index.js
// in the same directory(reducers), we then wire that to the
// a combineReducers call, we then hook that up to our
// redux store in our root index.js.

//We are currently defaulting our state value to an empty object,
//Rather, we could return null. Therefore the first time the reducer 
//runs and the app first boots up, we return by default null, which means
//we have no clue as to whether or not the user is logged in.
//So during slow connections, we return null as long as our 
//ajax request is not done. When we actually hear back from our requests,
//we get the action dispatched from action creators, and only then do we
//return either false(if not logged in) or the user model(if logged in).
//export default function(state = {}, action) {
export default function(state = null, action) {
    //console logging our actions to verify if our actions are 
    //coming across to this action reducer, when the action creator is called 
    //in the App component when it first boots up
    //console.log(action);
    switch (action.type) {
        //FETCH_USER is kinda like an alias to our
        //action, sent by the action creator
        //when action.type === FETCH_USER(which is equal to fetch_user)
        case FETCH_USER: 
            //action.payload is either an user object or an empty string
            //If empty string(falsy value), we return false
            //because false ||(or) false is false.
            return action.payload || false;
        default:
            //returns null by default
            return state;
    }
}
