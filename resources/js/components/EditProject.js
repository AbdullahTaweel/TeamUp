import React, {useState, useEffect} from 'react';
import api from '../api';
import {useHistory, Link} from 'react-router-dom';

export default function EditProject (props){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const history = useHistory();

    useEffect(() => {
        handleEditProject(props.match.params.id)
    },[]);

    function handleEditProject(id){
        api.editProject(id)
        .then(response => {
            setName(response.data.name);
            setDescription(response.data.description);
            setCompleted(response.data.completed);
            setStartDate(response.data.start_date);
            setEndDate(response.data.end_date);
        })
    }

    function handleUpdateProject(){
        const project = {
            name: name,
            description: description,
            completed: completed,
            start_date: startDate,
            end_date: endDate
        }
        api.updateProject(project, props.match.params.id)
            .then(response => {
            })
            history.push('/projects');
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
                        <form onSubmit= {handleUpdateProject}>
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
                                <label className="col-md-5 col-form-label text-md-left">Start Date:</label>
                                <input type="date" value={startDate} className="form-control col-md-6"
                                onChange={(e) => handleStartDate(e)}/>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">End Date:</label>
                                <input type="date" value={endDate} className="form-control col-md-6"
                                onChange={(e) => handleEndDate(e)}/>
                            </div>
                            <button className="btn btn-dark" type="submit" >Update Project</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
