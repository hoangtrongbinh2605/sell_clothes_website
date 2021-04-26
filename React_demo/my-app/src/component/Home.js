import { Component } from 'react';
import Slider from './Slider';
import Cart from './Cart/Cart';
import axios from 'axios';
import {
    Link
} from "react-router-dom"
import {AppContext} from "./AppContext";

class Home extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props)
        this.state = {
            listProduct: [],
            cart: {}
        }
        this.handleCart = this.handleCart.bind(this);
    }
    componentDidMount() {
        let abc = localStorage.getItem("cart")
        if(abc){
            this.setState({
                cart : JSON.parse(abc)
            })
        }
        axios.get('http://localhost/laravel/public/api/product')
            .then(res => {
                const product = res.data.data;
                // console.log(product)
                this.setState({
                    listProduct: product,
                })
            })
            .catch(error => console.log(error))

    }
    handleCart(e){
        let id = e.target.id
        let cart = this.state.cart
        if(cart[id]== null){
        cart[id] = 1;
        }else{
            cart[id] = cart[id] + 1
        }
        this.setState({
            cart : cart
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        this.context.handleProduct(Object.keys(cart).length);
        
    }
    renderProduct() {
        const listProduct = this.state.listProduct
        return listProduct.map((value,key) =>{
            let imageProduct = JSON.parse(value.image)
            return (
                <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products" id={value.id}>
                            <div className="productinfo text-center">
                                <img src={'http://localhost/laravel/public/upload/user/product/'+ value.id_user + "/" + imageProduct[0]} alt=""/>
                                <h2>${value.price}</h2>
                                <p>{value.name}</p>
                                <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                            </div>
                            <div className="product-overlay">
                                <div className="overlay-content">
                                    <h2>${value.price}</h2>
                                    <p>{value.name}</p>
                                    <a className="btn btn-default add-to-cart" id={value.id} onClick={this.handleCart}><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                                <li><Link to="#"><i className="fa fa-plus-square" />Add to wishlist</Link></li>
                                <li><Link to={"detail/" + value.id}><i className="fa fa-plus-square" />More</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            )
        })
    
    }
        
    render() {
        return (
            <div>
                <Slider />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="left-sidebar">
                                <h2>Category</h2>
                                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                                                    <span className="badge pull-right"><i className="fa fa-plus" /></span>
                        Sportswear
                      </a>
                                            </h4>
                                        </div>
                                        <div id="sportswear" className="panel-collapse collapse">
                                            <div className="panel-body">
                                                <ul>
                                                    <li><Link to="#">Nike </Link></li>
                                                    <li><Link to="#">Under Armour </Link></li>
                                                    <li><Link to="#">Adidas </Link></li>
                                                    <li><Link to="#">Puma</Link></li>
                                                    <li><Link to="#">ASICS </Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                                                    <span className="badge pull-right"><i className="fa fa-plus" /></span>
                        Mens
                      </a>
                                            </h4>
                                        </div>
                                        <div id="mens" className="panel-collapse collapse">
                                            <div className="panel-body">
                                                <ul>
                                                    <li><Link to="#">Fendi</Link></li>
                                                    <li><Link to="#">Guess</Link></li>
                                                    <li><Link to="#">Valentino</Link></li>
                                                    <li><Link to="#">Dior</Link></li>
                                                    <li><Link to="#">Versace</Link></li>
                                                    <li><Link to="#">Armani</Link></li>
                                                    <li><Link to="#">Prada</Link></li>
                                                    <li><Link to="#">Dolce and Gabbana</Link></li>
                                                    <li><Link to="#">Chanel</Link></li>
                                                    <li><Link to="#">Gucci</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordian" href="#womens">
                                                    <span className="badge pull-right"><i className="fa fa-plus" /></span>
                        Womens
                      </a>
                                            </h4>
                                        </div>
                                        <div id="womens" className="panel-collapse collapse">
                                            <div className="panel-body">
                                                <ul>
                                                    <li><Link to="#">Fendi</Link></li>
                                                    <li><Link to="#">Guess</Link></li>
                                                    <li><Link to="#">Valentino</Link></li>
                                                    <li><Link to="#">Dior</Link></li>
                                                    <li><Link to="#">Versace</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><Link to="#">Kids</Link></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><Link to="#">Fashion</Link></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><Link to="#">Households</Link></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><Link to="#">Interiors</Link></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><Link to="#">Clothing</Link></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><Link to="#">Bags</Link></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><Link to="#">Shoes</Link></h4>
                                        </div>
                                    </div>
                                </div>{/*/category-products*/}
                                <div className="brands_products">{/*brands_products*/}
                                    <h2>Brands</h2>
                                    <div className="brands-name">
                                        <ul className="nav nav-pills nav-stacked">
                                            <li><Link to="#"> <span className="pull-right">(50)</span>Acne</Link></li>
                                            <li><Link to="#"> <span className="pull-right">(56)</span>Grüne Erde</Link></li>
                                            <li><Link to="#"> <span className="pull-right">(27)</span>Albiro</Link></li>
                                            <li><Link to="#"> <span className="pull-right">(32)</span>Ronhill</Link></li>
                                            <li><Link to="#"> <span className="pull-right">(5)</span>Oddmolly</Link></li>
                                            <li><Link to="#"> <span className="pull-right">(9)</span>Boudestijn</Link></li>
                                            <li><Link to="#"> <span className="pull-right">(4)</span>Rösch creative culture</Link></li>
                                        </ul>
                                    </div>
                                </div>{/*/brands_products*/}
                                <div className="price-range">{/*price-range*/}
                                    <h2>Price Range</h2>
                                    <div className="well text-center">
                                        <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
                                        <b className="pull-left">$ 0</b> <b className="pull-right">$ 600</b>
                                    </div>
                                </div>{/*/price-range*/}
                                <div className="shipping text-center">{/*shipping*/}
                                    <img src="images/home/shipping.jpg" alt="" />
                                </div>{/*/shipping*/}
                            </div>
                        </div>
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">{/*features_items*/}
                                <h2 className="title text-center">Features Items</h2>
                                {this.renderProduct()}
                            </div>{/*features_items*/}
                            <div className="category-tab">{/*category-tab*/}
                                <div className="col-sm-12">
                                    <ul className="nav nav-tabs">
                                        <li className="active"><Link to="#tshirt" data-toggle="tab">T-Shirt</Link></li>
                                        <li><Link to="#blazers" data-toggle="tab">Blazers</Link></li>
                                        <li><Link to="#sunglass" data-toggle="tab">Sunglass</Link></li>
                                        <li><Link to="#kids" data-toggle="tab">Kids</Link></li>
                                        <li><Link to="#poloshirt" data-toggle="tab">Polo shirt</Link></li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade active in" id="tshirt">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="blazers">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="sunglass">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="kids">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="poloshirt">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>{/*/category-tab*/}
                            <div className="recommended_items">{/*recommended_items*/}
                                <h2 className="title text-center">recommended items</h2>
                                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend1.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend2.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend3.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend1.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend2.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend3.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                                        <i className="fa fa-angle-left" />
                                    </a>
                                    <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                                        <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                            </div>{/*/recommended_items*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;

