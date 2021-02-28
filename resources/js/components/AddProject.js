import React, {useState} from 'react';
import api from '../api';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function AddProject (){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const history = useHistory();

    function handleCreateProject(event){
        event.preventDefault();
        const project = {
            name: name,
            description: description,
            completed: completed,
            start_date: startDate,
            end_date: endDate
        }
        api.createProject(project)
            .then(response => {
                console.log(response);
            history.push('/projects');
            })
    }

    function handleStartDate(e) {
        var d = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())

        var start_date = new Date(e.target.value);
        start_date.setHours(0);
        start_date.setMinutes(0);
        start_date.setSeconds(0);

        if (start_date >= d)
            setStartDate(e.target.value);
        else
            alert("Cannot choose a date before the current date");
    }

    function handleEndDate(e) {
        if(startDate != '') {
            var end_date = e.target.value;

            if (end_date > startDate)
                setEndDate(e.target.value);
            else
                alert("Choose a date after the start date");
        } else {
            alert("You have to choose start date first");
        }
    }

    return(
        <div style={{backgroundColor:'rgba(0,0,0,0.8)', width:'100%',height:'100%',position:'fixed'}}>
            <div className="container-fluid">
                <Link to="/projects" className="btn btn-danger">back</Link>
                <div className="row">
                    <div className="col-md-3 login tm-bg-black-transparent">
                        <form onSubmit= {() => handleCreateProject(event)}>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left"> name:</label>
                                <input className="form-control col-md-6" type="text" value={name} required
                                placeholder="project name" onChange={(e) => setName(e.target.value)}/> <br/>
                            </div>
                            <div className="form-group row" >
                                <label className="col-md-5 col-form-label text-md-left"> Description:</label>
                                <textarea className="form-control col-md-6" value={description} required
                                placeholder="project description"
                                onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="form-group row" >
                                <label className="col-md-5 col-form-label text-md-left"> start date:</label>
                                <input className="form-control col-md-6" type="date" value={startDate} required
                                onChange={(e) => handleStartDate(e)}/>
                            </div>
                            <div className="form-group row" >
                                <label className="col-md-5 col-form-label text-md-left"> end date:</label>
                                <input  className="form-control col-md-6" type="date" value={endDate} required
                                onChange={(e) => handleEndDate(e)}/>
                            </div>
                            <button type="submit" className="btn btn-dark">Add Project</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
