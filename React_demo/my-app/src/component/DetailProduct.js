import { Component } from 'react';
import axios from 'axios';
import {
    PopupboxManager,
    PopupboxContainer
} from 'react-popupbox';

class DetailProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: '',
            brand: '',
            status: '',
            image: '',
            id_user: '',
            img: '',
            cart: '',
            qty: ''
        }
        this.openPopupbox = this.openPopupbox.bind(this);
        this.renderBrand = this.renderBrand.bind(this);
        this.renderStatus = this.renderStatus.bind(this);
        this.renderListImage = this.renderListImage.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleCart = this.handleCart.bind(this);
    }
    componentDidMount() {
        let abc = localStorage.getItem("cart")
        if(abc){
            this.setState({
                cart : JSON.parse(abc)
            })
        }
        axios.get('http://localhost/laravel/public/api/product/detail/' + this.props.match.params.id)
            .then(res => {
                const product = res.data.data;
                this.setState({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    status: product.status,
                    brand: product.id_brand,
                    image: JSON.parse(product.image),
                    id_user: product.id_user
                })

            })
            .catch(error => console.log(error))

    }
    
    renderBrand() {
        if (this.state.brand == 1) {
            return (
                <>Brand 1</>
            )
        } else {
            return (
                <>Brand 2</>
            )
        }
    }
    renderStatus() {
        if (this.state.status == 0) {
            return (
                <>New</>
            )
        } else {
            return (
                <>Sale</>
            )
        }
    }
    handleImage(e) {
        let img = e.target.alt
        this.setState({
            img: img
        })
        
    }
    renderImage() {     
        // if(e==null){
        //     return(
        //         <img src={'http://localhost/laravel/public/upload/user/product/' + this.state.id_user + "/larger_" + this.state.image[0]} alt="" /> 
        //     )
        // }else{ 
        if(this.state.img != ''){
            console.log(this.state.img)
        return (
            <img src={'http://localhost/laravel/public/upload/user/product/' + this.state.id_user + "/larger_" + this.state.img} alt="" />
        )  
        }else{
            return(
                        <img src={'http://localhost/laravel/public/upload/user/product/' + this.state.id_user + "/larger_" + this.state.image[0]} alt="" /> 
                    )
        }
    }
    openPopupbox() {
        let img = ''
        if(this.state.img != ''){
            img = this.state.img
        }else{
            img = this.state.image[0] 
        }
        const content = <img src={'http://localhost/laravel/public/upload/user/product/' + this.state.id_user + "/" + img} />
        PopupboxManager.open({
            content,
            fadeIn: true,
            fadeInSpeed: 500
        })
    }
    renderListImage() {
        let arrImg = this.state.image
        if (arrImg.length > 0) {
            return arrImg.map((value, index) => {
                return (
                    <a href><img src={'http://localhost/laravel/public/upload/user/product/' + this.state.id_user + "/small_" + value} alt={value} onClick={this.handleImage} /></a>
                )
            })
        }

    }
    handleInput(e) {
        let value = e.target.value;
        this.setState({
            qty: parseInt(value)
        })
    }
    handleCart(e){
        console.log(typeof this.state.qty)
        let id = this.props.match.params.id
        let cart = this.state.cart
        let qty = this.state.qty
        if(cart[id]== null){
        cart[id] = qty;
        }else{
            cart[id] = cart[id] + qty
        }
        this.setState({
            cart : cart
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    render() {
        return (
            <div>
                <section>
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
                                                        <li><a href>Nike </a></li>
                                                        <li><a href>Under Armour </a></li>
                                                        <li><a href>Adidas </a></li>
                                                        <li><a href>Puma</a></li>
                                                        <li><a href>ASICS </a></li>
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
                                                        <li><a href>Fendi</a></li>
                                                        <li><a href>Guess</a></li>
                                                        <li><a href>Valentino</a></li>
                                                        <li><a href>Dior</a></li>
                                                        <li><a href>Versace</a></li>
                                                        <li><a href>Armani</a></li>
                                                        <li><a href>Prada</a></li>
                                                        <li><a href>Dolce and Gabbana</a></li>
                                                        <li><a href>Chanel</a></li>
                                                        <li><a href>Gucci</a></li>
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
                                                        <li><a href>Fendi</a></li>
                                                        <li><a href>Guess</a></li>
                                                        <li><a href>Valentino</a></li>
                                                        <li><a href>Dior</a></li>
                                                        <li><a href>Versace</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4 className="panel-title"><a href="#">Kids</a></h4>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4 className="panel-title"><a href="#">Fashion</a></h4>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4 className="panel-title"><a href="#">Households</a></h4>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4 className="panel-title"><a href="#">Interiors</a></h4>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4 className="panel-title"><a href="#">Clothing</a></h4>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4 className="panel-title"><a href="#">Bags</a></h4>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h4 className="panel-title"><a href="#">Shoes</a></h4>
                                            </div>
                                        </div>
                                    </div>{/*/category-products*/}
                                    <div className="brands_products">{/*brands_products*/}
                                        <h2>Brands</h2>
                                        <div className="brands-name">
                                            <ul className="nav nav-pills nav-stacked">
                                                <li><a href> <span className="pull-right">(50)</span>Acne</a></li>
                                                <li><a href> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                                                <li><a href> <span className="pull-right">(27)</span>Albiro</a></li>
                                                <li><a href> <span className="pull-right">(32)</span>Ronhill</a></li>
                                                <li><a href> <span className="pull-right">(5)</span>Oddmolly</a></li>
                                                <li><a href> <span className="pull-right">(9)</span>Boudestijn</a></li>
                                                <li><a href> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
                                            </ul>
                                        </div>
                                    </div>{/*/brands_products*/}
                                    <div className="price-range">{/*price-range*/}
                                        <h2>Price Range</h2>
                                        <div className="well">
                                            <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
                                            <b>$ 0</b> <b className="pull-right">$ 600</b>
                                        </div>
                                    </div>{/*/price-range*/}
                                    <div className="shipping text-center">{/*shipping*/}
                                        <img src="images/home/shipping.jpg" alt="" />
                                    </div>{/*/shipping*/}
                                </div>
                            </div>
                            <div className="col-sm-9 padding-right">
                                <div className="product-details">{/*product-details*/}
                                    <div className="col-sm-5">
                                        <div className="view-product">
                                            {/* <img src={'http://localhost/laravel/public/upload/user/product/' + this.state.id_user + "/" + this.state.image[0]} alt="" /> */}
                                            {this.renderImage()}
                                            <a onClick={this.openPopupbox}><h3>ZOOM</h3></a>
                                            <PopupboxContainer />
                                        </div>
                                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                                            {/* Wrapper for slides */}
                                            <div className="carousel-inner">
                                                <div className="item active">
                                                    {this.renderListImage()}
                                                </div>
                                                <div className="item">
                                                    {this.renderListImage()}
                                                </div>
                                                <div className="item">
                                                    {this.renderListImage()}
                                                </div>
                                            </div>
                                            {/* Controls */}
                                            <a className="left item-control" href="#similar-product" data-slide="prev">
                                                <i className="fa fa-angle-left" />
                                            </a>
                                            <a className="right item-control" href="#similar-product" data-slide="next">
                                                <i className="fa fa-angle-right" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="product-information">{/*/product-information*/}
                                            <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                                            <h2>{this.state.name}</h2>
                                            <p>Web ID: {this.state.id}</p>
                                            <img src="images/product-details/rating.png" alt="" />
                                            <span>
                                                <span>US ${this.state.price}</span>
                                                <label>Quantity:</label>
                                                <input type="text" onChange={this.handleInput}/>
                                                <button type="button" className="btn btn-fefault cart" onClick={this.handleCart}>
                                                    <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                                            </span>
                                            <p><b>Availability:</b> In Stock</p>
                                            <p><b>Condition:</b>{this.renderStatus()}</p>
                                            <p><b>Brand:</b>{this.renderBrand()}</p>
                                            <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                                        </div>{/*/product-information*/}
                                    </div>
                                </div>{/*/product-details*/}
                                <div className="category-tab shop-details-tab">{/*category-tab*/}
                                    <div className="col-sm-12">
                                        <ul className="nav nav-tabs">
                                            <li><a href="#details" data-toggle="tab">Details</a></li>
                                            <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                                            <li><a href="#tag" data-toggle="tab">Tag</a></li>
                                            <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                                        </ul>
                                    </div>
                                    <div className="tab-content">
                                        <div className="tab-pane fade" id="details">
                                            <div className="col-sm-3">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/gallery1.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="companyprofile">
                                            <div className="col-sm-3">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/gallery1.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="tag">
                                            <div className="col-sm-3">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/gallery1.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade active in" id="reviews">
                                            <div className="col-sm-12">
                                                <ul>
                                                    <li><a href><i className="fa fa-user" />EUGEN</a></li>
                                                    <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                                                    <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                                                </ul>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                                <p><b>Write Your Review</b></p>
                                                <form action="#">
                                                    <span>
                                                        <input type="text" placeholder="Your Name" />
                                                        <input type="email" placeholder="Email Address" />
                                                    </span>
                                                    <textarea name defaultValue={""} />
                                                    <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                                    <button type="button" className="btn btn-default pull-right">
                                                        Submit
                          </button>
                                                </form>
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
                                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                                                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                </section>
            </div>
        )
    }
}
export default DetailProduct;