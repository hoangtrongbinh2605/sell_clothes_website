import { Component } from 'react';
import GuestGreeting from './GuestGreeting';
import UserGreeting from './UserGreeting';


class Test extends Component {
    // 1.Handling Events
    // constructor(props){        
    //     super(props)
    //     this.state = {
    //         isButton: false
    //     }
    //     this.handleButton = this.handleButton.bind(this)
    // }

    // handleButton(){
    //     this.setState({
    //         isButton: !this.state.isButton
    //     })
    // }

    // render() {
    //     return (
    //         <button onClick={this.handleButton}>
    //             {
    //                 this.state.isButton ? "ON" : "OFF"
    //             }
    //         </button>
    //     )
    // }

    // 2.Conditional Rendering
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false
        }
    }
    render(){
        return(
            this.props.isLoggedIn ? <UserGreeting /> : <GuestGreeting />
        )
    }

    


}

export default Test;

