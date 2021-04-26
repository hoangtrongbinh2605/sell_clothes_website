import { Component } from 'react';
import axios from 'axios';
import{
    Link
  } from "react-router-dom"
import {AppContext} from "../AppContext";
class Cart_Item extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props)
        this.state = {
            listProduct: '',
            total: 0

        }

        this.handlePlus = this.handlePlus.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        let abc = localStorage.getItem("cart")
        if (abc) {
            axios.post('http://localhost/laravel/public/api/product/cart', JSON.parse(abc))
                .then(res => {
                    this.setState({
                        listProduct: res.data.data
                    })
                })
                .catch(error => console.log(error));
        }      
    }
    handlePlus(e){
        let product = JSON.parse(localStorage.getItem("cart"))
        product[e.target.name] = product[e.target.name] +1
        this.context.handleCart(parseInt(e.target.id))
        let convert = JSON.stringify(product)
        localStorage.setItem("cart", convert)
        let abc = localStorage.getItem("cart")
        if (abc) {
            axios.post('http://localhost/laravel/public/api/product/cart', JSON.parse(abc))
                .then(res => {
                    this.setState({
                        listProduct: res.data.data
                    })
                })
                .catch(error => console.log(error));
        }

    }
    handleMinus(e){
        let product = JSON.parse(localStorage.getItem("cart"))
        product[e.target.name] = product[e.target.name] -1
        let total = 0 - parseInt(e.target.id)
        this.context.handleCart(total)
        let convert = JSON.stringify(product)
        localStorage.setItem("cart", convert)
        let abc = localStorage.getItem("cart")
        if (abc) {
            axios.post('http://localhost/laravel/public/api/product/cart', JSON.parse(abc))
                .then(res => {
                    this.setState({
                        listProduct: res.data.data
                    })
                })
                .catch(error => console.log(error));
        }
    }
    handleDelete(e){
        let product = JSON.parse(localStorage.getItem("cart"))
        console.log(product)
        console.log(e.target.name)
        delete product[e.target.name]
        this.context.handleCart(product)
        this.context.handleProduct(Object.keys(product).length);
        let convert = JSON.stringify(product)
        localStorage.setItem("cart", convert)
        let abc = localStorage.getItem("cart")
        if (abc) {
            axios.post('http://localhost/laravel/public/api/product/cart', JSON.parse(abc))
                .then(res => {
                    this.setState({
                        listProduct: res.data.data
                    })
                })
                .catch(error => console.log(error));
        }
    }
    renderCart() {
       
        let listProduct = this.state.listProduct       
        if (listProduct.length > 0) {
            return listProduct.map((value,index) => {            
                let imageProduct = JSON.parse(value.image)
                return (
                    <tr>
                        <td className="cart_product">
                            <a href><img src={'http://localhost/laravel/public/upload/user/product/' + value.id_user + '/' + imageProduct[0]} alt="" style={{ width: '100px' }} /></a>
                        </td>
                        <td className="cart_description">
                            <h4><a href>{value.name}</a></h4>
                            <p>Web ID:{value.id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${value.price}</p>

                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a className="cart_quantity_up" name={value.id} id={value.price} onClick={this.handlePlus} > + </a>
                                <input className="cart_quantity_input" type="text" name="quantity" value={value.qty} autoComplete="off" size={2} />
                                <a className="cart_quantity_down"  name={value.id} id={value.price} onClick={this.handleMinus} > - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p>${value.price*value.qty}</p>
                        </td>
                        <td className="cart_delete">
                        <a class="cart_quantity_delete" name={value.id} onClick={this.handleDelete}>X</a>                            
                        </td>
                    </tr>
                )
                
            })
              
        }  
         
    }
    render() {
      
        return (
            <>
            {this.renderCart()}
            </>
        )
    }
}

export default Cart_Item;

