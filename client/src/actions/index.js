import axios from 'axios';

import { FETCH_USER } from './types';

// //we need to export this action reducer so that we can call it 
// //inside the App component.
// export const fetchUser = () => {
//     //returns a function and when this returned function is
//     //executed, it's going to make the actual api(ajax) request.
//     //so now, rather than returning an action directly from the action
//     //creator, whenever this action creator gets called, it will
//     //instantly return a function instead.
//     //The purpose of redux-thunk middleware which we imported
//     //in the root index.js file is to inspect whatever value
//     //we return from this action creator. If redux thunk sees
//     //that we return a function instead of a normal action, redux thunk
//     //will automatically call this function and pass in that dispatch
//     //function as an argument. In vanilla redux, we don't have access
//     //to the dispatch function. So now this action reducer will not return
//     //an action that is then instantly dispatched by redux.
//     //Instead, we can dispatch the action manually anytime we want.
//     return function(dispatch) {
//         //we want to dispatch an action only when this request is 
//         //successfully completed. We do not want to dispatch an action
//         //until this api request is completed and the subsequent promise
//         //is also resolved. This action will then be sent to all our action
//         //reducers, which then update our store with a new state.
//         //This is the main point of using redux-thunk.
//         axios.get("/api/current_user")
//             //the action object in dispatch is a js object with the action
//             //type property and an optional payload property
//             .then(res => dispatch({type: FETCH_USER, payload: res}));
//     }
// };

//After refactoring the above with arrow functions and async-await
//Find the function that is generating some async logic or
//a promise and add on async, then add await to all the actual promises
//inside that function.
export const fetchUser = () => async dispatch => {
    //the res object is returned from our express server
    const res = await axios.get('/api/current_user');

    //res.data has the user profile which is the only
    //thing we care about
    dispatch({ type: FETCH_USER, payload: res.data });
    // OR
    //dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user') });
};

