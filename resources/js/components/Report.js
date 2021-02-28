import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';

export default function Report(props) {
    const [results, setResults] = useState([]);

    const[project,setProject]= useState([]);
    const[task, setTask] = useState([]);
    const[projectMember,setPMember]= useState([]);
    const[taskMember, setTMember]= useState([]);
    
    useEffect(() => {
        api.getReport(props.match.params.id).then(response => {
            console.log(response.data);
            setProject(response.data[0]);
            setPMember(response.data[1]);
            setTask(response.data[2]);
            setTMember(response.data[3]);
            setResults(response.data);
        })
    }, []);

    function renderProject(){
            return (
                <i key={project.id} >
            <li >
                <u>Project Name:</u> {project.name}</li>
                <li ><u>Description:</u> {project.description}</li>
                <li ><u>Description:</u> {project.description}</li>
                <li ><u>Completed:</u> {project.completed}</li>
                <li ><u>Start Date:</u> {project.start_date}</li>
                <li ><u>End Date:</u> {project.end_date}</li>
                <li ><u>Created At:</u> {project.created_at}</li>
            </i>
            )
    }

    function renderTask(){
        return task.map(task => {
            return (
                <i key={task.id} >
                <b><u style={{ color: '#CB4154', fontSize:'20px'}}> Task Details</u></b>
                <li><u>Task Name:</u> {task.name}<br/> </li>
                <li><u>description:</u> {task.description}<br/> </li>
                <li><u>completed:</u> {task.completed}<br/> </li>
                <li><u>Stage:</u> {task.stage}<br/> </li>
                <li><u>Priority:</u> {task.prioirty}<br/> </li>
                <li><u>Start Date:</u> {task.start_date}<br/> </li>
                <li><u>End Date:</u> {task.end_date}<br/> </li>
                <li><u>Created At:</u> {task.created_at}<br/> </li>
                <hr/>
                </i>
            )
        })
    }

    function renderPMember(){
        return projectMember.map(pm => {
            return (
                <div key={pm.id}
                >
                 {pm.name}
            </div>
            )
        })
    }

    function renderTMember(){
        return taskMember.map(tm => {
            return (
                <div key={tm.id}
                >
               {tm.name}

               
            </div>
            )
        })
    }

    return (
        <div className="container-fluid">
        <div class="row" >
            {/* {JSON.stringify(results)} */}
            <div className="col-md-3" style={{ border: '1px solid black', overflowY:'scroll',height:'250px', width:'100px'}}>
            <b><u style={{ color: '#CB4154', fontSize:'20px'}}>Project Details</u></b>
            <ul className="bool">
            {renderProject()}<br/>
            </ul>

</div>
            <div className="col-md-3" style={{ border: '1px solid black',overflowY:'scroll',height:'250px'}}>
            <b><u style={{ color: '#CB4154', fontSize:'20px'}}>Project Member Name: </u></b>
            { projectMember.length >0 ? renderPMember() : 'no member yet in project'}<br/>
</div>
            <div className="col-md-3" style={{ border: '1px solid black',overflowY:'scroll',height:'250px'}}>
            
            <ul className="bool">
            { task.length >0 ? renderTask() : 'no task yet'}<br/>
            </ul>
</div>

            <div className="col-md-3" style={{ border: '1px solid black',overflowY:'scroll',height:'250px'}}>
            <b><u style={{ color: '#CB4154', fontSize:'20px'}}>Task Member Name: </u></b>
           
            { taskMember.length >0 ? renderTMember() : 'not assignet task to member' }<br/>
            
</div>
        </div>
        </div>
    )
}
