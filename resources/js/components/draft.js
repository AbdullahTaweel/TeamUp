import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from '../api';
import Comment from './Comment';
import moment from 'moment';
import TaskDetails from './TaskDetails';

export default function CommentTask(props){
    const [taskDetails, setTaskDetails] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchTaskDetails();
        // fetchTaskAssignees();
        fetchComments();
     },[]);

    function fetchComments(){
        api.getComments(props.match.params.id).then(response => {
            setComments(response.data)
        }) .catch(error => {
            //history.push('/login');
        })
    }

    function fetchTaskDetails() {
        api.showTask(props.match.params.id).then(response => {
            setTaskDetails(response.data);
        })
    }

    function handleDeleteComment(event, commentId){ //Added event here and in line 37
        event.preventDefault();
        var confirm_delete = confirm('Are you sure you want to Delete Comment?');
        if (confirm_delete == true) {
            api.deleteComment(commentId).then(response => {
                console.log('deleted')
            })
        }
    }

    function renderComments(){
        return comments.map(comment => {
            return(
                <div className="col-md-3" key={comment.id}>
                <div className="card">
            <form onSubmit= {() => handleDeleteComment(event, comment.id)}>
            <Link to={`/comments/edit/${comment.id}`} ><i className="fa fa-edit"></i></Link> &nbsp;
                <button type="submit"><i className="fa fa-trash"></i></button>
                <Comment props={comment}  />
            </form>
            </div>
            </div>
            )
        })
    }

    return(
        <div>
            <div className="main">
            <nav className="navbar navbar-dark navbar-expand-sm bg-dark">
            <a className="navbar-brand" href="#">
                <img src="./images/logo.png" width="120" height="80" />
                </a>
                {/* <a className="navbar-brand" href="#"></a>         */}
                <ul className="navbar-nav" id="nav-profile">
                    {/* <li className="nav-item">
                        <a className="nav-link" href="login">login</a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" href="#">Name </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">LogOut</a>
                    </li>
                </ul>
            </nav>
            </div>

            <div className="project">

            <TaskDetails props={taskDetails}/>

            <Link to={`/tasks/${props.match.params.id}/comments/add`} className='btn btn-dark' title='Create New Task' >
            Add Comment</Link>

                <br/><br/><br/>

                <div className="container-fluid">
                    <div className="row">
                    {renderComments()}
                    </div>
                </div>
            </div>
        </div>
    )
}
