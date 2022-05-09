import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './Login'
import UserHome from './UserHome'


class Main extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        console.log(this.props.User, 'props.User from main.js')
        let loggedOn = this.props.LoggedOn
            ? <Redirect to="/UserHome" />
            : <Redirect to='/' />
        
        return (
            <>
          {loggedOn}
            <Switch>
                <Route exact path='/'>
                    <Login
                        User={this.props.User}
                        LoggedOn={this.props.LoggedOn}
                        SignIn={this.props.SignIn}
                    />
                </Route>
                <Route path='/UserHome'>
                    <UserHome
                        User={this.props.User}
                        SignIn={this.props.SignIn}
                        SignOut={this.props.SignOut}
                        LoggedOn={this.props.LoggedOn}
                    />
                </Route>
        
            </Switch>
            </>
        )
    }
}


export default Main