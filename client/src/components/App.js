//App.js is responsible for all our view layer
import React, { Component } from "react";
//BrowserRouter is the brains of the react-router and
//decides what components to display depending on the
//current url, whereas the Route object is a react component
//that is used to setup a rule between a certain route our
//user may visit and a set of components available for that
//route
import { BrowserRouter, Route } from 'react-router-dom';
//connect gives the components the ability to call
//action creators.
import { connect } from 'react-redux';
//Assigning all the different actions defined in index.js
//to the actions object
import * as actions from '../actions';

//All our components
import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component {
    //lifecycle method to fetch the current user or figure out
    //whether the user is signed in or not, the first
    //time this App component is mounted or rendered to the screen.
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                {/* A comment */}
                {/* BrowserRouter component takes max only one component
                as a child */}
                <BrowserRouter>
                    <div className="container">
                        {/*React router treats all of the <Route /> stuff
                        as componenets, so we can freely add any components,
                        text or buttons or whatever here, so as to display
                        them everywhere*/}
                        <Header />
                        {/* "/" points to https://www.emaily.com */}
                        {/*exact is equivalent to exact={true} in JSX. We do this
                        to prevent Route from greedily matching the strings in the
                        path*/}
                        <Route exact path="/" component={Landing} />
                        {/* "/surveys" points to emaily.com/surveys */}
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

//the argument 'mapStateToProps function' is null for this component
//since we dont use it here. The second arg is all our action creators
//we want to call from this component.
//Remember, once we pass in all these different actions, they are assigned
//to the App component as props
export default connect(null, actions)(App);