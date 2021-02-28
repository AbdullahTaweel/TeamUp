import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from './api';
import Project from './Project';


export default function projects(){
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    const [userId, setUserId] = useState('');

    useEffect(() => {
        fetchProjects();

        fetchUsers();
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
        console.log(response.data)
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
            console.log('deleted');
        })
    }
}

function formAddMemeber(id){
 document.getElementById("member"+id).style.display="block";
}

function addMemeber(id){
    const member = {
        user_id: userId
    }
    api.addMember(member, id).then(response => {
    })
}

function renderProjects(){
    return projects.map(project => {
        return(
            <div className="col-md-3" key={project.id}>
            <div id={`member${project.id}`}
            style={{display:'none'}}
            >
            <form onSubmit={() => addMemeber(project.id)}>
            <select onChange={(e) => setUserId(e.target.value)}>
            {renderUsers()}
            </select>

                <button type="submit">Add Member</button>
            </form>
            </div>

            <div className="card">
            <a onClick={() => formAddMemeber(project.id)}>Add Member</a>
        <form onSubmit= {() => handleDeleteProject(event, project.id)}>
            <Project props={project}  />


            <Link to={`/projects/${project.id}/tasks`} >Show Tasks</Link><br/>
            <Link to={"/project/edit/"+project.id} >Edit</Link> &nbsp;
            <button type="submit">delete</button>
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
