import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from '../api';
import Task from './Task';
import Header from './Header';

export default function ShowTasks(props){
    const [due, setDue] = useState([]);
    const [inProgress, setProgress] = useState([]);
    const [finalized, setFinalized] = useState([]);
    const [projectDetails, setProjectDetails] = useState([]);
    const[access, setAccess]= useState('');

    useEffect(() => {
        fetchTasks();
        fetchProject();

        api.getOwner().then(response => {
            setAccess(response.data)
        }) .catch(error => {
        })

     },[]);

    function fetchTasks(){
        api.getTasks(props.match.params.id).then(response => {
            setDue(response.data[0]);
            setProgress(response.data[1]);
            setFinalized(response.data[2]);
        }) .catch(error => {

        })
    }

    function fetchProject() {
        api.getOneProject(props.match.params.id)
        .then(response => {
            setProjectDetails(response.data);
        });
    }

    function handleDeleteTask(event, taskId){ //added event here and in line 37
        event.preventDefault();
        var confirm_delete = confirm('Are you sure you want to Delete Task?');
        if (confirm_delete == true) {
            api.deleteTask(taskId).then(response => {
                window.location.reload();
            })
        }
    }

    function handleTaskStage(stage_status, task_id) {
        const stage = {
            stage: stage_status,
        }

        api.changeTaskStage(task_id, stage).then(response => {
            window.location.reload();
        });
    }

    function addViewer(e, id){
        const task ={
            task_id: id,
        }
        api.addTaskViewers(task).then(response => {
            // console.log(response.data);
        })
    }

    function renderDue(){
        return due.map(due => {
            return (
                <li key={due.id}
                    className={`${(due.priority ==2) ? 'danger' : ((due.priority == 1) ? 'important' : '')}`} >
               
                    <Link to={`/tasks/${due.id}/comments`} 
                        onClick={(e)=>addViewer(e, due.id)}>{due.name}
                    </Link>
                    <span id="grpbtn">
                        &nbsp;&nbsp;
                            <Link to="#" onClick={() => handleTaskStage(1, due.id)} ><i className="fa fa-share"></i></Link>
                        &nbsp; 
                            <Link to="#" onClick={() => handleDeleteTask(event, due.id)}><i className="fa fa-trash"></i></Link>
                    </span>
                </li>
            )
        })
    }

    function renderProgress(){
        return inProgress.map(progress => {
            return (
                <li key={progress.id}
                    className={`${(progress.priority ==2) ? 'danger' : ((progress.priority == 1) ? 'important' : '')}`}>
                
                    <Link to={`/tasks/${progress.id}/comments`}
                    onClick={(e)=>addViewer(e, progress.id)}>{progress.name}</Link>
                    <span id="grpbtn">
                        &nbsp;&nbsp;
                        <Link to="#" onClick={() => handleTaskStage(0, progress.id)} style={{ color:'#343a40' }}>
                            <i className="fa fa-reply"></i>
                        </Link>
                        &nbsp;&nbsp;
                        <Link to="#" onClick={() => handleTaskStage(2, progress.id)} >
                            <i className="fa fa-share"></i>
                        </Link>
                        &nbsp; 
                        <Link to="#" onClick={() => handleDeleteTask(event, progress.id)}>
                            <i className="fa fa-trash"></i>
                        </Link>
                    </span>
                </li>
            )
        })
    }

    function renderFinalized(){
        return finalized.map(finalized => {
            return (
                <li key={finalized.id}
                    className={`${(finalized.priority ==2) ? 'danger' : ((finalized.priority == 1) ? 'important' : '')}`} >
                
                    <Link to={`/tasks/${finalized.id}/comments`}
                    onClick={(e)=>addViewer(e, finalized.id)}>{finalized.name}</Link>
                        <span id="grpbtn">
                            &nbsp;&nbsp;
                            <Link to="#" onClick={() => handleTaskStage(1, finalized.id)}
                            ><i className="fa fa-reply"></i>
                            </Link>
                            &nbsp;
                            <Link to="#" onClick={() => handleDeleteTask(event, finalized.id)}>
                            <i className="fa fa-trash"></i></Link>
                        </span>
                </li>
            )
        })
    }

    function renderProjectDetails() {
        return (
            <div style={{border: 'solid black 1px', padding: '10px', borderRadius:'5px', textAlign: 'center',
                 width:'1000px', marginLeft: '145px' }}>
                <span><b style={{ color: '#CB4154' }}>Name:</b> {projectDetails.name}</span> &nbsp;
                <span><b style={{ color: '#CB4154' }}>Description:</b> {projectDetails.description}</span> &nbsp;
                <span><b style={{ color: '#CB4154' }}>Completed:</b> {projectDetails.completed == 1 ? 'Yes' : 'No' }</span> &nbsp;
                <span><b style={{ color: '#CB4154' }}>Start Date:</b> {projectDetails.start_date}</span> &nbsp;
                <span><b style={{ color: '#CB4154' }}>End Date:</b> {projectDetails.end_date}</span>
            </div>
        );
    }

    return(
        <div>
            <div className="main">
                    <Header />
                    <br/>
                    <div>

                    </div>
                <div className="project">
                    {renderProjectDetails()}
                    <br/>
                    <div className="btn-group btn-group-xs pull-left" role="group">
                        <Link to="/projects" className="btn btn-danger">Back</Link>
                        
                        <Link to={`/projects/${props.match.params.id}/tasks/add`} className='btn btn-dark'
                            title='Create New Task' > Add Task</Link>
                        <Link to={`/projects/${props.match.params.id}/report`} className="btn btn-secondary">Report</Link>
                    </div>
                </div>

                <div className="container">
                    <div style={{ float:'right', border: 'dashed 2px #CB4154', padding:'10px', borderRadius:'5px' }}>
                    <h5 style={{ color:'#CB4154' }}><u>Legend</u></h5>
                        <i className="fa fa-circle" style={{ color:'maroon' }}></i> Urgent(Milestone) <br/>
                        <i className="fa fa-circle" style={{ color:'rgb(206, 178, 18)' }}></i> Important <br/>
                        <i className="fa fa-circle" style={{ color:'gray' }}></i> Not Important <br/>
                    </div>

                    <div className="row" id="rowtasks">
                            <div className="col-md-4">
                                <h1>Due </h1>
                                <div id="tasklist">
                                    <ul className="tasklist">
                                        {due.length > 0 ? renderDue() : <li>No due tasks yet.</li>}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h1>in progress </h1>
                                <div id="tasklist">
                                    <ul className="tasklist">
                                        {inProgress.length > 0 ? renderProgress() : <li>No tasks in progress yet.</li>}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h1>finalized </h1>
                                <div id="tasklist">
                                    <ul className="tasklist">
                                        {finalized.length > 0 ? renderFinalized() : <li>No tasks have been finalized yet.</li>}
                                    </ul>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
