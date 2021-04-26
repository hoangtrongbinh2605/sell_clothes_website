import { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import {AppContext} from "../AppContext";

class Login extends Component {
    static contextType = AppContext;
    
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            level: 0,
            formErrors: {},
            msg: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }   
    handleInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        this.setState({
            [nameInput]: value
        })
    }
    handleSubmit(e) {
        e.preventDefault();

        let flag = true
        let errorSubmit = this.state.formErrors
        let email = this.state.email
        let password = this.state.password         
        
        if(!email){
            flag = false
            errorSubmit.email = "Vui long nhap email"
        }
        if(!password){
            flag = false
            errorSubmit.password = "Vui long nhap password"
        }
        if(!flag){
            this.setState({
                formErrors: errorSubmit
            })
        }else{
        const member = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            address: this.state.address,
            avatar: this.state.avatar,
            level: this.state.level
        };
        axios.post('http://localhost/laravel/public/api/login', member)
            .then(res => {
                console.log(res.data);
                if(res.data.errors) {
                    this.setState({
                        formErrors: res.data.errors
                    })
                }else {
                    console.log("oke")
                    this.setState({
                        mgs: "ok",
                        formErrors: ''
                    })
                    localStorage.setItem("user", JSON.stringify(res.data))
                    this.context.checkLogin(true);
                    this.props.history.push('/')
                   
                }
            })
            .catch(error => console.log(error));
    }}
    renderError(){
        let formErrors = this.state.formErrors
        return(
            <div className='formErrors'>
                {Object.keys(formErrors).map((fieldName, i)=>{
                    if(formErrors[fieldName].length>0){
                        return(
                            <p key={i}>{fieldName}: {formErrors[fieldName]}</p>
                        )
                    }else{
                        return '';
                    }
                })}
            </div>
        )
    }

    render() {
        return (
            <>
            <div className='formErrors'>
                {this.renderError()}
            </div>
            <div className="login-form">
                <h2>Login to your account</h2>
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    <input type="email" placeholder="Email Address" name="email" onChange={this.handleInput}/>
                    <input type="password" placeholder="Password" name="password" onChange={this.handleInput}/>
                    <span>
                        <input type="checkbox" className="checkbox" />
            Keep me signed in
          </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>
            </>
        )
    }
}

export default withRouter(Login);

