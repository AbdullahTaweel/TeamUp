import React, {useState, useEffect} from 'react';
import moment from 'moment';
import api from '../api';
import avatar from './../../images/avatar.svg';

export default function Comment(props){
    const [name, setName] = useState('');
    useEffect(() => {
        api.getCommenter(props.props.id).then(response => {
            setName(response.data)
        }).catch(error => {
        })
     },[]);

    return (
        <i>
            <img src={avatar} alt="Avatar"></img>
            <h4>{name}</h4>
            <p>{props.props.content}</p>
            <span className="time-right">{moment(props.props.created_at).format('DD/MM/YYYY')}</span>
        </i>
    )
}





