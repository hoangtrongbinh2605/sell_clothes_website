import { Component } from 'react';

class ListComment extends Component {
    constructor(props) {
        super(props)
        this.handleReplay = this.handleReplay.bind(this);
    }

    handleReplay(e){
        this.props.getIdUser(e.target.id)
    }
    renderListcomment(){
        return this.props.listComment.map((value,index)=>{
            if(value.id_comment == 0){
                return(<>
                    <li className="media">
                            <a className="pull-left" href="#">
                                <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                            </a>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user" />{value.name_user}</li>
                                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                </ul>
                                <p>{value.comment}</p>
                                <a className="btn btn-primary" href  id={value.id_user} onClick={this.handleReplay} ><i className="fa fa-reply"/>Replay</a>
                            </div>
                    </li>
                    {this.renderChildcomment(value.id_user)}
                    </>
                )
            }
        })
    }
    renderChildcomment(idCha){
        console.log(idCha)
        return this.props.listComment.map((value,index)=>{
            if(value.id_comment == idCha){
            return(<>
                <li className="media second-media">
                        <a className="pull-left" href="#">
                            <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                        </a>
                        <div className="media-body">
                            <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user" />{value.name_user}</li>
                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                            </ul>
                            <p>{value.comment}</p>
                            <a className="btn btn-primary" href  id={value.id_user} onClick={this.handleReplay} ><i className="fa fa-reply"/>Replay</a>
                        </div>
                </li>
                </>
            )
            }
        })
    }
    render() {
        return (
            <div className="response-area">
                <h2>3 RESPONSES</h2>
                <ul className="media-list">
                    {this.renderListcomment()}
                </ul>
            </div>
            
        )
    }
}

export default ListComment;

