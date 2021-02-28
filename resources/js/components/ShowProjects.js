import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from '../api';
import Project from './Project';
import Header from './Header';
import ShowTasks from './ShowTasks';


export default function ShowProjects(){
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    const [userId, setUserId] = useState('');

    const[access, setAccess]= useState('');

    useEffect(() => {
        fetchProjects();
        fetchUsers();


        api.getOwner().then(response => {
            console.log(response.data)
            setAccess(response.data)
        }) .catch(error => {
            //history.push('/login');
        })
     },[]);


    function fetchProjects(){
        api.getProjects().then(response => {
            setProjects(response.data)
        }) .catch(error => {
            //history.push('/login');
        })
    }


    function fetchUsers(){
        api.getUsers().then(response => {
            setUsers(response.data)

            setUserId(response.data[0].id)
        }) .catch(error => {
            //history.push('/login');
        })
    }


    function renderUsers(){
        return users.map(user => {
            return(
                <option key={user.id} value={user.id}>{user.email}</option>
            )
        })
    }

    function handleDeleteProject(event, projectId){ //I added event here and in line 89
        event.preventDefault();
        var confirm_delete = confirm('Are you sure you want to Delete Project?');
        if (confirm_delete == true) {
            api.deleteProject(projectId).then(response => {
                window.location.reload();
            })
        }
    }

    function formAddMemeber(id){

        if (document.getElementById("member"+id).style.display =="none"){

            document.getElementById("member"+id).style.display = "block";
        }
        else{
            document.getElementById("member"+id).style.display = "none";
        }
    }

    function addMemeber(event, id){
        event.preventDefault();
        const member = {
            user_id: userId
        }
        api.addMember(member, id).then(response => {
            window.location.reload();
        }).catch(error => {
            alert('this member is already exist in this project');
        })
    }

    function showTasks(id){
        window.location.href = `/projects/${id}/tasks`;
    }

    function handleCompleted (event, project_id) {
        if(event.target.checked){
            api.setProjectCompleted({completed: true}, project_id);

        }else{
            api.setProjectCompleted({completed: false}, project_id);
        }
    }


    function accessBtnMember(project){
        return(
            <a className="btn btn-light" style={{ border: '1px solid #CB4154' }}
                href="#" onClick={() => formAddMemeber(project.id)}>Add Member
            </a>
        )
    }


    function accessBtnAction(project){
        return(
            <i>
                <label>Completed:</label>&nbsp;
                    <input type="checkbox" defaultChecked={project.completed} onChange={(event) => handleCompleted(event, project.id)} />           
                <br/>
                <Link className="btn btn-light" style={{ border: '1px solid #CB4154' }} to={"/project/edit/"+project.id} >Edit</Link>
                &nbsp;
                <button onClick= {() => handleDeleteProject(event, project.id)} className="btn btn-danger" type="submit">Delete</button>
            </i>
        )
    }

    function renderProjects(){
        return projects.map(project => {
            return(
                <div className="col-md-3" key={project.id}>
                    <div id={`member${project.id}`}
                        style={{display:'none'}} className="formSame">
                        <div>
                            <div className="container-fluid ">
                                <div className="row">
                                    <div className="col-md-3 login tm-bg-black-transparent">
                                        <form onSubmit={(e) => addMemeber(e, project.id)}>
                                            <a href="#" onClick={() => formAddMemeber(project.id)}
                                                        style={{fontSize:'40px',color:'#CB4154'}}>
                                                <i className="fa fa-close"></i>
                                            </a>
                                            <div className="form-group row">
                                                <label className="col-md-5 col-form-label text-md-left">
                                                    <i className="fa fa-user"></i> Member:
                                                </label>
                                                <select onChange={(e) => setUserId(e.target.value)}>
                                                    {renderUsers()}
                                                </select>
                                            </div>
                                            <div>
                                                <button type="submit" className="btn btn-secondary">Add Member</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" >
                        <div className="project-task">
                            {access ==1 ? accessBtnMember(project) : ''}  
                            &nbsp;&nbsp;
                            <label>Members:&nbsp;</label>
                            {project.event.length} 
                            &nbsp;
                                <form>
                                    <div className="showCursor" onClick={() => showTasks(project.id)}>
                                        <Project props={project}  />
                                    </div>
                                    {access ==1 ? accessBtnAction(project) : ''}
                                </form>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return(
        <div>
            <div className="main">
                <Header />
            </div>
            <div className="project">
                <Link to="project/add" className='btn btn-dark' title='Create New Project' > Add Project</Link>
                <br/><br/><br/>
                <div className="container-fluid">
                    <div className="row">
                        {renderProjects()}
                    </div>
                </div>
            </div>
        </div>


    )
}
