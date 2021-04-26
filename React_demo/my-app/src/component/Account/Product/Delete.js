import { Component } from 'react';
import axios from 'axios';

class Delete extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete(){
        console.log(this.props.productId)
        const userData = JSON.parse(localStorage.getItem("user"));
        this.setState({
            id_user: userData.Auth.id
        })
        let url = 'http://localhost/laravel/public/api/user/delete-product/' + this.props.productId ;
        let accessToken = userData.success.token;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        }
        axios.get(url, config)
            .then((res) => {
                // this.setState({
                //     listProduct: res.data.data
                // })
                this.props.getProduct(res.data.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    render() {
        return (
            <a className="cart_quantity_delete" onClick={this.handleDelete} href><i className="fa fa-times" /></a>
        )
    }
}

export default Delete;
