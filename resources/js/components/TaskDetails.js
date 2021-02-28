import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Link}  from 'react-router-dom';
import api from '../api';

export default function TaskDetails(props){
    const [viewer, setViewer] = useState([]);

    function handleCompleted (event, task_id) {
        if(event.target.checked){
            api.setTaskCompleted({completed: true}, task_id);
        }else{
            api.setTaskCompleted({completed: false}, task_id);
        }
    }

    function hanldeViewers(){

        if (document.getElementById("view").style.display =="none"){

            document.getElementById("view").style.display = "block";
        }
        else{
            document.getElementById("view").style.display = "none";
        }
            api.getViewer(props.props.id).then(response => {
            
                console.log(response.data);
                setViewer(response.data);

        });
    }

    function showViewers(){
        return viewer.map(viewer => {
            return (
               <i key={viewer.id} value={viewer.id}> {viewer.name} </i>
            );
        });
    } 

    return (
        <div key={props.props.id} className="card">
            
            <Link to="#" onMouseEnter={hanldeViewers} onMouseLeave={hanldeViewers}><i className="fa fa-eye"></i> {viewer.length}</Link>
            <Link to={`/tasks/edit/${props.props.id}`} ><i className="fa fa-edit"></i></Link>
            <div id="view" style={{ display: 'none' }}>
                {showViewers()}
            </div>
            <h1>{props.props.name}</h1>
            <p>{props.props.description}</p>
            <div>
                <label>Created At:&nbsp;</label>
                    {moment(props.props.created_at).format('DD/MM/YYYY')}
                <br/>

                <label>Start Date: &nbsp;</label>
                    {moment(props.props.start_date).format('DD/MM/YYYY')}
                <br/>

                <label>End Date: &nbsp;</label>
                    {moment(props.props.end_date).format('DD/MM/YYYY')}
                <br/>

                <label>Stage: &nbsp;</label>
                    {(props.props.stage == 2 ) ? 'Finalized' : ((props.props.stage == 1) ? 'In Progress' : 'Due')}
                <br/>

                <label>Priority: &nbsp;</label>
                    {(props.props.priority == 2 ) ? 'Urgent' : ((props.props.priority == 1) ? 'Important' : 'not Important')}
                <br/>

                <label>Completed:&nbsp;</label>
                    <input type="checkbox" defaultChecked={props.props.completed}
                        onChange={(event) => handleCompleted(event, props.props.id)}/> <br/>
            </div>
        </div>
    )
}

