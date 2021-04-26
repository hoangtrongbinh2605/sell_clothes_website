import { Component } from 'react';
import Cart_Item from './Cart_Item';
import Do_Action from './Do_Action';
import axios from 'axios';
import {
    Link
} from "react-router-dom"
import {AppContext} from "../AppContext";
class Cart extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props)
        this.state = {
            listProduct: '',
            total: 0
        }
        this.renderTotal = this.renderTotal.bind(this);
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
    renderTotal() {
        let listProduct = this.state.listProduct;
        let total = 0
        if (listProduct.length > 0) {
            listProduct.map((value, index) => {
                total = total + value.price * value.qty
            })
        }
        total = total + this.context.state.cart
        return (
            <ul>
                <li className="cart_sub_total">Cart Sub Total <span>${total}</span></li>
                <li className="eco_taxt">Eco Tax <span>$2</span></li>   
                <li>Shipping Cost <span>Free</span></li>
                <li className="total">Total <span>${total+2}</span></li>
            </ul>
        )
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <section id="cart_items">
                        <div className="table-responsive cart_info">
                            <table className="table table-condensed">
                                <thead>
                                    <tr className="cart_menu">
                                        <td className="image">Item</td>
                                        <td className="description" />
                                        <td className="price">Price</td>
                                        <td className="quantity">Quantity</td>
                                        <td className="total">Total</td>
                                        <td />
                                    </tr>
                                </thead>
                                <tbody>
                                    <Cart_Item />
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping &amp; Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href>Get Quotes</a>
                                <a className="btn btn-default check_out" href>Continue</a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="total_area">
                                {/* <ul>
                                    <li className="cart_sub_total">Cart Sub Total <span>$59</span></li>
                                    <li className="eco_taxt">Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li className="total">Total <span>$61</span></li>
                                </ul> */}
                                {this.renderTotal()}
                                <a className="btn btn-default update" href>Update</a>
                                <a className="btn btn-default check_out" href>Check Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;

