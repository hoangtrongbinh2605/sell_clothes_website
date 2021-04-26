import axios from 'axios';
import { Component } from 'react';

    class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_blog : '',
            id_user : '',
            name_user: '',
            id_comment: 0,
            comment: '',
            image_user: '',
            error: ''

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        
    }
    handleInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        this.setState({
            [nameInput]: value
        })
    }

    handleSubmit(e){
        e.preventDefault();

        let error = this.state.error
        const userData = JSON.parse(localStorage.getItem("user"));
        if(userData == null){
            this.setState({
                error: "Vui long dang nhap"
            })  
        }else{
            let url = 'http://localhost/laravel/public/api/blog/comment/' + this.props.idBlog;
            let accessToken = userData.success.token; 
            let config = {
                headers: {
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            let {comment} = this.state
            if (comment) {
                const formData = new FormData();
                formData.append('id_blog', this.props.idBlog);
                formData.append('id_user', userData.Auth.id);
                formData.append('id_comment', this.props.idSubComment ? this.props.idSubComment:0);
                formData.append('comment', this.state.comment);
                formData.append('image_user', userData.Auth.avatar);
                formData.append('name_user',userData.Auth.name);
                axios.post(url,formData,config)
                .then(response=>{
                    if(response.data.data){                        
                        this.props.getComment(response.data.data)
                    }
                })
            }
        }

    }
    renderError(){
        return(
            <p>{this.state.error}</p>
        )
    }
    
    render() {
        return (
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="text-area">
                            <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                                <div className="blank-arrow">
                                    <label>Your Name</label>   
                                    {this.renderError()}                                 
                                </div>                                
                                <span>*</span>
                                <textarea name="comment" rows={11} defaultValue={""} onChange={this.handleInput}/>
                                <button type="submit" className="btn btn-primary" >post comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }




}

export default Comment;

