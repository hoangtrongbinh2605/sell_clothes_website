import { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

class Rate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rate: 0,
      blog_id: '',
      user_id: '',
      error: ''
    }
    this.changeRating = this.changeRating.bind(this);
  }
  componentDidMount() {    
    let p = 0
    let tbc = 0
    axios.get('http://localhost/laravel/public/api/blog/rate/' + this.props.idBlog)
      .then(response => {
        response.data.data.map((value) => {
          p += value.rate
          tbc = p / response.data.data.length
          this.setState({
            rate: tbc
          })
        })
        
      })
  }
  changeRating(newRating, name) {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData == null) {
      this.setState({
        error: "Vui long dang nhap"
      })
    } else {
      let url = 'http://localhost/laravel/public/api/blog/rate/' + this.props.idBlog;
      let accessToken = userData.success.token;
      let config = {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      };
      this.setState({
        rate: newRating
      });
      let { rate } = this.state
      if (rate) {
        const formData = new FormData();
        formData.append('blog_id', this.props.idBlog);
        formData.append('user_id', userData.Auth.id);
        formData.append('rate', this.state.rate);
        axios.post(url, formData, config)
          .then(response => {
            console.log(response)
          })

      }
    }
  }
  renderError() {
    return (
      <p>{this.state.error}</p>
    )
  }
  render() {
    return (
      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li>
            <StarRatings
              rating={this.state.rate}
              starRatedColor="blue"
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rate'
            />
          </li>
          <li className="color">(votes)</li>
        </ul>
        <ul className="tag">
          <li>TAG:</li>
          <li><a className="color" href>Pink <span>/</span></a></li>
          <li><a className="color" href>T-Shirt <span>/</span></a></li>
          <li><a className="color" href>Girls</a></li>
        </ul>
        {this.renderError()}
      </div>

    )
  }
}

export default Rate;

