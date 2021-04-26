import { Component } from 'react';
import axios from 'axios';
import Comment from './Comment';
import ListComment from './ListComment';
import Rate from './Rate';


class DetailBlog extends Component {
    constructor(props) {
        super(props)
        this.state ={
            blog: '',
            listComment: [],
            id_user:''
        }
        this.getComment = this.getComment.bind(this);
        this.getIdUser = this.getIdUser.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost/laravel/public/api/blog/detail/' + this.props.match.params.id)
            .then(res => {
                const blog = res.data.data;
                const listComment = blog.comment
                this.setState({ blog });
                this.setState({listComment})
               
            })
            .catch(error => console.log(error))
    }

    getComment(cmt){
      this.setState({
        listComment: this.state.listComment.concat(cmt)
      })
     
    }
    getIdUser(id){
      this.setState({
        id_user: id
      })
    }

    renderBlog(){
        let {blog} = this.state
            return (
                <div className="single-blog-post">
                      <h3>{blog.title}</h3>
                      <div className="post-meta">
                        <ul>
                          <li><i className="fa fa-user" /> Mac Doe</li>
                          <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                          <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        <span>
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-half-o" />
                        </span>
                      </div>
                      <a href>
                        <img src={"http://localhost/laravel/public/upload/Blog/image/" + blog.image} alt="" />
                      </a>
                      <p>{blog.content}</p>
                      <div className="pager-area">
                        <ul className="pager pull-right">
                          <li><a href="#">Pre</a></li>
                          <li><a href="#">Next</a></li>
                        </ul>
                      </div>
                    </div>
            )
    }

    render(){
        return (
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
                <div className="col-sm-9">
                  <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {this.renderBlog()}
                  </div>{/*/blog-post-area*/}
                  <Rate idBlog= {this.props.match.params.id} />
                  <div className="socials-share">
                    <a href><img src="images/blog/socials.png" alt="" /></a>
                  </div>{/*/socials-share*/}
                  <div className="media commnets">
                    <a className="pull-left" href="#">
                      <img className="media-object" src="images/blog/man-one.jpg" alt="" />
                    </a>
                    <div className="media-body">
                      <h4 className="media-heading">Annie Davis</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                      <div className="blog-socials">
                        <ul>
                          <li><a href><i className="fa fa-facebook" /></a></li>
                          <li><a href><i className="fa fa-twitter" /></a></li>
                          <li><a href><i className="fa fa-dribbble" /></a></li>
                          <li><a href><i className="fa fa-google-plus" /></a></li>
                        </ul>
                        <a className="btn btn-primary" href>Other Posts</a>
                      </div>
                    </div>
                  </div>{/*Comments*/}
                  <ListComment listComment = {this.state.listComment} getIdUser={this.getIdUser}/>
                  <Comment idBlog= {this.props.match.params.id} getComment={this.getComment} idSubComment={this.state.id_user}/>
                </div>	
              </div>
            </div>
          </section>
            
        )
    }
}

export default DetailBlog;

