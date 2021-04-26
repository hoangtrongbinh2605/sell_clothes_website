import { Component } from 'react';
import Test from './Test';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

class LoginControl extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false
        }
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)

    }
    handleLoginClick(){
        this.setState({
            isLoggedIn: true
        })
    }
    handleLogoutClick(){
        this.setState({
            isLoggedIn: false
        })
    }
    render(){
        const isLoggedIn = this.state.isLoggedIn
        let button
        if(this.state.isLoggedIn){
            button = <LogoutButton onClick={this.handleLogoutClick} />
        }else{
            button = <LoginButton onClick={this.handleLoginClick} />
        }
        return(    
            <div>       
            <Test isLoggedIn = {isLoggedIn} />
            {button}
            </div> 
        )
    }
}

export default LoginControl;