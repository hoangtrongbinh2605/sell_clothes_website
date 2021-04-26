import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class Demo extends Component {
    render(){
        return (
            <h1>Hello, {this.props.name}</h1>
        )
    }
}

export default Demo;

