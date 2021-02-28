import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Link}  from 'react-router-dom';

export default function Project(props){

    return (
        <i key={props.props.id}>
            <h1>{props.props.name}</h1>
            <p>{props.props.description}</p>
            <div>
                <label>Created At:&nbsp;</label>
                {moment(props.props.created_at).format('DD/MM/YYYY')} <br/>
                <label>Start Date: &nbsp;</label>
                {moment(props.props.start_date).format('DD/MM/YYYY')} <br/>
                <label>End Date: &nbsp;</label>
                {moment(props.props.end_date).format('DD/MM/YYYY')} <br/>
            </div>
        </i>
    )
}
