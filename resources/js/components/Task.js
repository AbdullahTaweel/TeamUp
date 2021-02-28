import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Link}  from 'react-router-dom';


export default function Task(props){

 
    return (
        <i key={props.props.id}>
        <h1>{props.props.name} </h1> 
        <p>{props.props.description}</p>
        <div>
            <label>Created At:&nbsp;</label>
                {moment(props.props.created_at).format('DD/MM/YYYY')}<br/>
                <label>Start Date: </label>
                    {props.props.start_date} <br/>
                <label>End Date: </label>
                    {props.props.end_date}<br/>
                <label>Completed:&nbsp;</label>
                    <input type="checkbox" value={props.props.completed}/> <br/>
        </div>
        </i>
    )
}





