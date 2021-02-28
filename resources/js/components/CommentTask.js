import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from '../api';
import Comment from './Comment';
import TaskDetails from './TaskDetails';
import Header from './Header';
import {useHistory} from 'react-router-dom';
import avatar from './../../images/avatar.svg';

export default function CommentTask(props){
    const [taskDetails, setTaskDetails] = useState([]);
    const [comments, setComments] = useState([]);
    const [issue, setIssue] = useState(0);
    const [content, setContent] = useState('');
    const [projectMembers, setProjectMembers] = useState([]);
    const [taskMembers, setTaskMembers] = useState([]);
    const history = useHistory();
    const [userId, setUserId] = useState('');
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        fetchTaskDetails();
        fetchComments();
        getTaskMembers();
     },[]);

     function fetchComments(){
        api.getComments(props.match.params.id).then(response => {
            setComments(response.data)
        }) .catch(error => {
        })
    }

    function fetchTaskDetails() {
        api.showTask(props.match.params.id).then(response => {
            getProjectMembers(response.data.project_id);
            setProjectId(response.data.project_id);
            setTaskDetails(response.data);
        })
    }

    function handleDeleteComment(event, commentId){
        event.preventDefault();
        var confirm_delete = confirm('Are you sure you want to Delete Comment?');
        if (confirm_delete == true) {
            api.deleteComment(commentId).then(response => {
                console.log('deleted')
                window.location.reload();
            })
        }
    }

    function renderComments(){
        return comments.map(comment => {
            return(
            <div className={`container ${comment.issue ==1 ? 'alert-danger' : ''}`}
            id="comments" key={comment.id}>
                <Link to={`/comments/edit/${comment.id}`} ><i className="fa fa-edit"></i></Link> &nbsp;
                <Link to='#' onClick= {() => handleDeleteComment(event, comment.id)}>
                <i className="fa fa-trash"></i>
                </Link>
                <Comment props={comment} />
            </div>
            )
        })
    }

    function handleAddComment() {
        const comment = {
            content: content,
            issue: issue,
        };
        api.createComment(comment, props.match.params.id)
            .then(response => {
                window.location.reload();
            });
    }

    function getProjectMembers(project_id) {
        api.getProjectMembers(project_id)
        .then(response => {
            setProjectMembers(response.data);
            setUserId(response.data[0].id);
        })
    }

    function getTaskMembers() {
        api.getTaskTeam(props.match.params.id)
        .then(response => {
            setTaskMembers(response.data);
        });
    }

    function renderTaskMembers() {
        return taskMembers.map(member => {
            return (
                <div className="chip" key={member.id}>
                    <img src={avatar} id="user" alt="Person"></img>
                    <span>{member.name}</span>
                </div>
            );
        });
    }

    function renderProjectMember() {
        return projectMembers.map(pmember => {
            return (
                <option key={pmember.id} value={pmember.id}>{pmember.name}</option>
            );
        });
    }

    function assignMembers(e){
        e.preventDefault();
        const member = {
            user_id: userId
        }
        api.addTaskMember(member, props.match.params.id).then(response => {
            window.location.reload();
        }).catch(error => {
            alert('this member is already exist in this task');
        })
    }

    return(
        <div className="main">
            <Header />
            <div className="container">
            <Link to={`/projects/${projectId}/tasks`}  className="btn btn-danger">Back</Link>
                <div className="row" id="rowtasks">
                    <div className="col-md-3">
                        <h1>Task info </h1>
                        <TaskDetails props={taskDetails}/>
                    </div>
                    <div className="col-md-3">
                        <select className="form-control"
                        onChange={(e)=> setUserId(e.target.value)}>
                            {renderProjectMember()}
                        </select>
                        <br/>
                        <button className="btn btn-dark" onClick={(e) => assignMembers(e)}>
                        Assign Members
                        </button>
                        <br/> <br/>
                        <h1>Users</h1>
                        {renderTaskMembers()}
                    </div>
                    <div className="col-md-6" id="commentdiv">
                        <h1>Comments</h1>
                        <div className="overflow-auto">
                            {comments.length >0 ?renderComments() : 'no comments'}
                        </div>
                        <div className="form-group row">
                            <textarea onChange={(e) => setContent(e.target.value)}
                            className="form-control col-md-8" id="textcomment" rows="2"
                            placeholder="Put your comments here" />
                            <div className="col-md-3">
                                issue: &nbsp;
                                <input type="checkbox"
                                defaultChecked={false}
                                onChange={(e) => setIssue(e.target.checked)} />
                                <button onClick={() => handleAddComment()} className="btn btn-dark">
                                    <i className="fa fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
