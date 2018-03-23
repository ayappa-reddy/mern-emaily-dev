//Class based component instead of function based. 
//We are not managing any state here,
//but doing this to easily organize code.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    //writing our own helper method(function) to render
    //different content(JSX) depending on the user authenticate
    //sate(auth property value)
    renderContent() {
        switch (this.props.auth) {
            //pending, we return nothing
            case null:
                return;
            //not logged in
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            //logged in
            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    render() {
        //to test if the props object has auth property
        //console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper">
                    {/* if this.props.auth is truthy, the user is logged
                    in and we send them to '/surveys'(dashboard), else
                    we send them to the '/'(Landing)(root)*/}
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'} 
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        {/* {} need to be used to use javascript inside JSX */}
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

//mapStateToProps is called with the entire state
//object from the redux store
// function mapStateToProps(state) {
//     //returning a object that gets passed to the Header
//     //component as props. The only property we care is the
//     //auth property in the state object
//     return { auth: state.auth };
// }

//Using destruturing and pulling off auth from
//state object implicitly
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);