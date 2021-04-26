import { Component } from 'react';
import axios from 'axios';
import Delete from './Delete'
import{
  Link
} from "react-router-dom"


class Product extends Component {
  constructor(props) {
    super(props)
    this.state= {
      listProduct : '',
      id_user: ''
    }
    this.getProduct = this.getProduct.bind(this);
  }
  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("user"));
    this.setState({
      id_user: userData.Auth.id
    })
    let url = 'http://localhost/laravel/public/api/user/my-product';
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
          this.setState({
            listProduct : res.data.data
          })
        })
        .catch((error) => {
          console.error(error)
        })
  }
  getProduct(product){
    this.setState({
      listProduct: product
    })
   
  }
  renderProduct() {
    const listProduct = this.state.listProduct
    console.log(listProduct)
    return  Object.keys(listProduct).map((item,i)=>{
      let imageProduct = JSON.parse(listProduct[item].image)
      console.log(imageProduct[0])
      return (
      <tr>
        <td className="cart_product">
        <p>{listProduct[item].id}</p>
        
        </td>
        <td className="cart_description">
          <p>{listProduct[item].name}</p>
        </td>
        <td className="cart_price">
        <a href><img src={'http://localhost/laravel/public/upload/user/product/'+ this.state.id_user + '/'+ imageProduct[0]} alt="" style={{width: '100px'}}/></a>
        </td>
        <td className="cart_quantity">
        <p>{listProduct[item].price}</p>
        </td>
        <td className="cart_delete">
          <Link to={"/account/product/edit/" + listProduct[item].id}><i className="fa fa-plus" /></Link>
          <Delete productId={listProduct[item].id} getProduct={this.getProduct}/>
        </td>
      </tr>
      )
    })
  }
  render() {
    return (
      <section id="cart_items">
        <div className="table-responsive cart_info">
          <div className="col-sm-9 padding-right">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="id">Id</td>
                  <td className="name">Name</td>
                  <td className="image">Image</td>
                  <td className="price">Price</td>
                  <td className="action">Action</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {this.renderProduct()}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }
}

export default Product;
