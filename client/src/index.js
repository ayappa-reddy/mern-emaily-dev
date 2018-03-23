//index.js - to set up the redux side of our application.
//when we don't provide a relative path, webpack looks in
//the node modules folder
//import materializeCSS from 'materialize-css/dist/css/materialize.min.css'
//  or
import 'materialize-css/dist/css/materialize.min.css'; 
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'

import App from './components/App';
//import all the reducers from the reducers directory
//since we have a index.js in that directory, all our 
//authReducers in the combineReducers call(which we export) 
//will be imported
import reducers from './reducers';

//making a new instance of our redux store, 
//using createStore helper
//The 1st arg to createStore is all our reducers.
//The 2nd arg is initial state of our app, it is
//mostly for server-side rendering which we are not
//doing. So we pass an empty object.
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Provider tag from react-redux is a redux component 
//which makes it possible for all components to access our store
//It takes the prop, store={store} which we created above
//using createStore()
//The provider component knows how to read store changes, and whenever
//a state changes in the store, it will inform 
//all it's children(App and it's subsequent children) here that a
//new state is available and updates all the components
//with the new state and therefore re renders the dom
ReactDOM.render(
<Provider store={store}><App /></Provider>, 
document.querySelector('#root'));
