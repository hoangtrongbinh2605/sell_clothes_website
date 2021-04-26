import { Component } from 'react';

class Login extends Component {
    
    constructor(props){
        super(props)
        this.state ={
            email : '',
            password: '',
            formErrors:{}
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e){
        const nameInput = e.target.name;
        const value = e.target.value;
        this.setState({
            [nameInput]: value
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        
        let flag = true
        let email = this.state.email;
        let password = this.state.password;
        let errorSubmit = this.state.formErrors;
        if(!email){
            flag=false;
            errorSubmit.email ="Vui long nhap email";
        }
        if(!password){
            flag=false;
            errorSubmit.password ="Vui long nhap password";
        }
        if(!flag){
            this.setState({
                formErrors: errorSubmit
            })
        }
    }
    renderError(){
        let formErrors = this.state.formErrors
        if(Object.keys(formErrors).length > 0 ){
            return(
                <div className="formErrors">
                    {Object.keys(formErrors).map((fieldName, i)=>{
                        return(
                            <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                        )
                    })        
                    }
                </div>
            )
        }else{
            return(
                <div className="formErrors">
                    {''}
                </div>
            )
        }
    }

    render(){
        return (
            <div>
            <div className="formErrors">
                {this.renderError()}
            </div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Email" name="email" onChange={this.handleInput}/>
                <input type="password" name="password" onChange={this.handleInput} />
                <span>
                    <input type="checkbox" className="checkbox" />
                    Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">Login</button>
            </form>
            </div>
        )
    }
}

export default Login;

