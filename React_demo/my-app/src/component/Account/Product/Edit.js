import { Component } from 'react';
import axios from 'axios';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listBrand: [],
            listCategory: [],
            name: '',
            price: '',
            category: '',
            brand: '',
            status: '',
            sale: 0,
            company: '',
            image: [],
            detail: '',
            formErrors: {},
            id_user: '',
            imageDelete: [],
            imageUpload: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleUserInputFile = this.handleUserInputFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }
    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem("user"));
        let url = 'http://localhost/laravel/public/api/user/product/' + this.props.match.params.id;
        let accessToken = userData.success.token;
        this.setState({
            id_user: userData.Auth.id
        })
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        };
        axios.get(url, config)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    name: res.data.data.name,
                    price: res.data.data.price,
                    brand: res.data.data.id_brand,
                    category: res.data.data.id_category,
                    status: res.data.data.status,
                    sale: res.data.data.sale,
                    detail: res.data.data.detail,
                    company: res.data.data.company,
                    image: res.data.data.image
                })
            })
            .catch(error => console.log(error))
        axios.get('http://localhost/laravel/public/api/category-brand')
            .then(res => {
                this.setState({
                    listBrand: res.data.brand,
                    listCategory: res.data.category
                })
            })
            .catch(error => console.log(error))
        }
    handleInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        this.setState({
            [nameInput]: value
        })
    }
    handleUserInputFile(e) {
        const file = e.target.files;
        this.setState({
            imageUpload: file
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        let flag = true
        let errorSubmit = this.state.formErrors
        let image = this.state.image
        let name = this.state.name
        let price = this.state.price
        let category = this.state.category
        let brand = this.state.brand
        let status = this.state.status
        let detail = this.state.detail
        let imageUpload = this.state.imageUpload
        let imageDelete = this.state.imageDelete

        if (!name) {
            flag = false
            errorSubmit.name = "Vui long nhap ten san pham"
        }
        if (!price) {
            flag = false
            errorSubmit.price = "Vui long nhap gia"
        }
        if (!category) {
            flag = false
            errorSubmit.category = "Vui long chon loai"
        }
        if (!brand) {
            flag = false
            errorSubmit.brand = "Vui long chon hang"
        }
        // if (status) {
        //     flag = false
        //     errorSubmit.status = "Vui long chon trang thai"
        // }
        if (!detail) {
            flag = false
            errorSubmit.detail = "Vui long mo ta san pham"
        }
        // if (!image) {
        //     flag = false
        //     errorSubmit.image = "Vui long upload hinh anh"
        // } else {
        //     if (image.length > 3) {
        //         flag = false
        //         errorSubmit.image = "Chi duoc upload toi da 3 hinh"
        //     }
        //     Object.keys(image).map((item, i) => {
        //         if (image[item].type.indexOf("image") == -1) {
        //             flag = false;
        //             errorSubmit.image = "vui long upload file hinh anh"
        //         }
        //     })

        // }
        if(image.length - imageDelete.length + imageUpload.length >3){
            flag = false
            errorSubmit.image = "Chi duoc hien thi toi da 3 hinh"
        }
        if (!flag) {
            this.setState({
                formErrors: errorSubmit
            })
       
        }         
        else {
            const userData = JSON.parse(localStorage.getItem("user"));
            let url = 'http://localhost/laravel/public/api/user/edit-product/' +this.props.match.params.id;
            let accessToken = userData.success.token;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            };
            let formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('price', this.state.price);
            formData.append('category', this.state.category);
            formData.append('brand', this.state.brand);
            formData.append('company', this.state.company);
            formData.append('detail', this.state.detail);
            formData.append('status', this.state.status);
            formData.append('sale', this.state.sale);

            // this.state.image.map((value) => {
            //     formData.append("file[]", value);
            // })
            Object.keys(imageUpload).map((item,i)=>{
                formData.append("file[]", imageUpload[item]);
            })
            this.state.imageDelete.map((value)=>{
                formData.append("avatarCheckBox[]",value)
            })
            axios.post(url, formData, config)
                .then(res => {
                    console.log(res.data)
                    if (res.data.errors) {
                        this.setState({
                            formErrors: res.data.errors
                        })
                    } else {
                        this.setState({
                            mgs: "ok",
                            formErrors: ''
                        })
                    }
                })
                .catch(error => console.log(error));
        }
    }
    renderError() {
        let formErrors = this.state.formErrors
        return (
            <div className='formErrors'>
                {Object.keys(formErrors).map((fieldName, i) => {
                    if (formErrors[fieldName].length > 0) {
                        return (
                            <p key={i}>{fieldName}: {formErrors[fieldName]}</p>
                        )
                    } else {
                        return '';
                    }
                })}
            </div>
        )
    }
    renderCategory() {
        return this.state.listCategory.map((value) => {
            return (
                <option value={value.id}>{value.category}</option>
            )
        })
    }
    renderBrand() {
        return this.state.listBrand.map((value) => {
            return (
                <option value={value.id}>{value.brand}</option>
            )
        })
    }
    renderSale() {
        if (this.state.status == 0) {
            return (
                <input type="text" name="sale" value={this.state.sale} onChange={this.handleInput} />
            )
        }
    }
    renderImage() {
        let count = 0
        return this.state.image.map((value) => {
            count++
            return (
                <li style={{ display: 'inline-block' }}>
                    <img src={"http://localhost/laravel/public/upload/user/product/" + this.state.id_user + "/" + value} style={{ width: '100px', height: '100px' }} />
                    <input type="checkbox" id={"image" + count} name={"image" + count} value={value} onClick={this.handleImage} />
                </li>
            )
        })
    }
    handleImage(e) {
        let imageDelete = this.state.imageDelete
        const value = e.target.value
      
        if (e.target.checked) {
            imageDelete.push(value)
            this.setState({
                imageDelete: imageDelete
            })
        } 
        else {
            let index = imageDelete.indexOf(value)
            imageDelete.splice(index,1)
            this.setState({
                imageDelete: imageDelete
            })
        }      
        console.log(this.state.imageDelete)
        
    }
    render() {
        return (
            <section id="cart_items">
                <div className="table-responsive cart_info">
                    <div className="col-sm-9 padding-right">
                        <div className='formErrors'>
                            {this.renderError()}
                        </div>
                        <div className="signup-form">
                            <h2>Create product!</h2>
                            <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                                <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleInput} />
                                <input type="text" placeholder="Price" name="price" value={this.state.price} onChange={this.handleInput} />
                                <select name="category" value={this.state.category} onChange={this.handleInput}>
                                    {this.renderCategory()}
                                </select>
                                <select name="brand" value={this.state.brand} onChange={this.handleInput}>
                                    {this.renderBrand()}
                                </select>
                                <select name="status" value={this.state.status} onChange={this.handleInput}>
                                    <option value="1">New</option>
                                    <option value="0">Sale</option>
                                </select>
                                {this.renderSale()}
                                <input type="file" id="myFile" name="image" onChange={this.handleUserInputFile} multiple />
                                <ul>
                                    {this.renderImage()}
                                </ul>
                                <input type="text" placeholder="Detail" name="detail" value={this.state.detail} onChange={this.handleInput} />
                                <button type="submit" className="btn btn-default">Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Edit;
