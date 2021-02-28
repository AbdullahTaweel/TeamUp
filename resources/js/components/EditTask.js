import React, {useState, useEffect} from 'react';
import api from '../api';
import {useHistory, Link} from 'react-router-dom';

export default function EditTask (props){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(0);
    const [stage, setStage] = useState(0);
    const [priority, setPriority] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const history = useHistory();

    useEffect(() => {
        handleEditTask(props.match.params.id)
    },[]);

    function handleEditTask(id){
        api.editTask(id)
        .then(response => {
            setName(response.data.name);
            setDescription(response.data.description);
            setCompleted(response.data.completed);
            setStartDate(response.data.start_date);
            setEndDate(response.data.end_date);
            setStage(response.data.stage);
            setPriority(response.data.priority);
        })
    }

    function handleUpdateTask(event){
        event.preventDefault();
        const task = {
            name: name,
            description: description,
            completed: completed,
            stage: stage,
            priority: priority,
            start_date: startDate,
            end_date: endDate
        }
        api.updateTask(task, props.match.params.id)
            .then(response => {
                history.goBack();
            })
    }

    return(
        <div style={{backgroundColor:'rgba(0,0,0,0.8)', width:'100%',height:'100%',position:'fixed'}}>
            <div className="container-fluid">
            <Link to={`/tasks/${props.match.params.id}/comments`} className="btn btn-danger">back</Link>
                <div className="row">
                    <div className="col-md-3 login tm-bg-black-transparent">
                        <form onSubmit= {(event) => {handleUpdateTask(event)}}>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">Name:</label>
                                <input type="text" value={name} className="form-control col-md-6"
                                onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">Description:</label>
                                <textarea value={description} className="form-control col-md-6"
                                onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">Stage:</label>
                                <select className="form-control col-md-6" value={stage}
                                onChange={(e)=>setStage(e.target.value)}>
                                    <option value='0'>Due</option>
                                    <option value='1'>In Progress</option>
                                    <option value='2'>Finalized</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">Priority:</label>
                                <select className="form-control col-md-6" value={priority}
                                onChange={(e)=>setPriority(e.target.value)}>
                                    <option value='0'>not Important</option>
                                    <option value='1'>Important</option>
                                    <option value='2'>Urgent</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">Start Date:</label>
                                <input type="date" value={startDate} className="form-control col-md-6"
                                onChange={(e) => setStartDate(e.target.value)}/>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">End Date:</label>
                                <input type="date" value={endDate} className="form-control col-md-6"
                                onChange={(e) => setEndDate(e.target.value)}/>
                            </div>
                            <button type="submit" >Update Task</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
