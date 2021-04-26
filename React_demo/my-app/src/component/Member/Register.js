import { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            avatar: '',
            file: '',
            level: 0,
            formErrors: {},
            msg: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInputFile = this.handleUserInputFile.bind(this);

    }
    handleUserInputFile(e) {
        const file = e.target.files;

        //send file to api server
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                avatar: e.target.result, //cai nay de gui qua api
                file: file[0] //cai nay de toan bo thong file upload vao file de xuong check validate   
            })
        };
        reader.readAsDataURL(file[0])
        
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
        let avatar = this.state.file
        let name = this.state.name
        let email = this.state.email
        let password = this.state.password
        let address = this.state.address
        let phone = this.state.phone
        
        
        if(!name){
            flag = false
            errorSubmit.name = "Vui long nhap ten"
            console.log(errorSubmit)
        }
        if(!email){
            flag = false
            errorSubmit.email = "Vui long nhap email"
        }
        if(!password){
            flag = false
            errorSubmit.password = "Vui long nhap password"
        }
        if(!phone){
            flag = false
            errorSubmit.phone = "Vui long nhap sdt"
        }
        if(!address){
            flag = false
            errorSubmit.address = "Vui long nhap dia chi"
        }
        if(!avatar){
            flag = false
            errorSubmit.avatar = "Vui long upload file avatar"
        }else{
        if(avatar.size > 1048576){
            flag = false;
            errorSubmit.avatar = "file phai co kich thuoc nho hon 1MB"
        }
        if(avatar.type.indexOf("image")== -1){
            flag = false;
            errorSubmit.avatar = "vui long upload file hinh anh"
        }}
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
        axios.post('http://localhost/laravel/public/api/register', member)
            .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.data.errors) {
                    this.setState({
                        formErrors: res.data.errors
                    })
                }else {
                    this.setState({
                        mgs: "ok",
                        formErrors: ''
                    })
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
            <div className="signup-form">
                <h2>New User Signup!</h2>
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    <input type="text" placeholder="Name" name="name" onChange={this.handleInput} />
                    <input type="email" placeholder="Email Address" name="email" onChange={this.handleInput} />
                    <input type="password" placeholder="Password" name="password" onChange={this.handleInput} />
                    <input type="text" placeholder="Phone Number" name="phone" onChange={this.handleInput} />
                    <input type="text" placeholder="Address" name="address" onChange={this.handleInput} />
                    <input type="file" id="myFile" name="avatar" onChange={this.handleUserInputFile} />
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>
            </>
        )
    }
}

export default Register;

