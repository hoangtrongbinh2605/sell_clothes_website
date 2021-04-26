import './App.css';
import { Component } from 'react';
import Header from './component/Layout/Header';
import Footer from './component/Layout/Footer';
import {AppContext} from './component/AppContext';
import demo from './trainning/demo';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false,
      product: 0,
      cart: 0
    }
    this.checkLogin = this.checkLogin.bind(this);
    this.handleProduct = this.handleProduct.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }
  checkLogin(flag){
    this.setState({
      isLoggedIn : flag
    })
    if(flag == true){
      localStorage.setItem("isLoggedin", true)
    }
    console.log(flag)
  }
  handleProduct(product){
    this.setState({
      product: product
    })
  }
  handleCart(product){
    let cart = this.state.cart
    cart = cart + product
    this.setState({
      cart: cart
    })

  }
  render(){
    return (
      <AppContext.Provider value={{ 
        state: this.state,
        checkLogin : this.checkLogin,
        handleProduct : this.handleProduct,
        handleCart : this.handleCart
      }}>
      <>
      <Header />
      {this.props.children}
      <Footer />
      </>
      </AppContext.Provider>
    )
  }
}

export default App;
