import { Component } from 'react';
import axios from 'axios';

class Update extends Component {
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
      formErrors: {},
      msg: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInputFile = this.handleUserInputFile.bind(this);
  }
  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("user"));
    this.setState({
      name: userData.Auth.name,
      email: userData.Auth.email,
      phone: userData.Auth.phone,
      address: userData.Auth.address,
      avatar: userData.Auth.avatar
    })
  }
  handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    this.setState({
      [nameInput]: value
    })
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
    let errorSubmit = this.state.formErrors
    let flag = true
    if (file[0].size > 1048576) {
        flag = false;
        errorSubmit.avatar = "file phai co kich thuoc nho hon 1MB"
    }
    if (file[0].type.indexOf("image") == -1) {
        flag = false;
        errorSubmit.avatar = "vui long upload file hinh anh"
    }
    if (!flag) {
      this.setState({
        formErrors: errorSubmit
      })
    }
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


    if (!name) {
      flag = false
      errorSubmit.name = "Vui long nhap ten"
    }
    if (!phone) {
      flag = false
      errorSubmit.phone = "Vui long nhap sdt"
    }
    if (!address) {
      flag = false
      errorSubmit.address = "Vui long nhap dia chi"
    }
    
    if (!flag) {
      this.setState({
        formErrors: errorSubmit
      })
    } else {
      const userData = JSON.parse(localStorage.getItem("user"));
      let url = 'http://localhost/laravel/public/api/user/update/' + userData.Auth.id;
      let accessToken = userData.success.token;
      let config = {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      };
      const formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('phone', this.state.phone);
      formData.append('address', this.state.address);
      formData.append('avatar', this.state.avatar);
      formData.append('password', this.state.password);
      formData.append('email', this.state.email);
      formData.append('level', 0);
      axios.post(url, formData, config)
        .then(res => {
          console.log(res.data)         
          if (res.data.errors) {
            this.setState({
              formErrors: res.data.errors
            })
          } else {
            localStorage.setItem("user", JSON.stringify(res.data))
            this.setState({
              mgs: "ok",
              formErrors: ''
            })
          }
        })
        .catch(error => console.log(error));
    }
  }
  renderError() {
    let formErrors = this.state.formErrors
    return (
      <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
          if (formErrors[fieldName].length > 0) {
            return (
              <p key={i}>{fieldName}: {formErrors[fieldName]}</p>
            )
          } else {
            return '';
          }
        })}
      </div>
    )
  }
  render() {
    return (
      <div className="col-sm-6 padding-right">
        <div className='formErrors'>
          {this.renderError()}
        </div>
        <div className="signup-form">
          <h2>User Update!</h2>
          <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
            <input type="text" value={this.state.name} name="name" onChange={this.handleInput} />
            <input type="email" value={this.state.email} name="email" />
            <input type="text" value={this.state.phone} name="phone" onChange={this.handleInput} />
            <input type="text" value={this.state.address} name="address" onChange={this.handleInput} />
            <input type="file" id="myFile" name="avatar" onChange={this.handleUserInputFile} />
            <img src={"http://localhost/laravel/public/upload/user/avatar/" + this.state.avatar} style={{width: '100px'}} />
            <button type="submit" className="btn btn-default">Update</button>
          </form>
        </div>
        </div>
    )
  }
}

export default Update;
