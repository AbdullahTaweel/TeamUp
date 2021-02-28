import React, {useState, useEffect} from 'react';
import api from '../api';
import {useHistory} from 'react-router-dom';

export default function AddComment (props){

    const [content, setContent] = useState('');
    const [issue, setIssue] = useState(0);
    const history = useHistory();

    function handleCreateComment(event){
        event.preventDefault();
        const comment = {
            content: content,
            issue: issue
        }
        api.createComment(comment, props.match.params.id)
            .then(response => {
                history.goBack();
            })
    }

    return(
        <form onSubmit= {() => handleCreateComment(event)}>
            Content:
            <textarea value={content}
            onChange={(e) => setContent(e.target.value)} /> <br/>
            issue:
            <input type="checkbox"
            defaultChecked={false}
            onChange={(e) => setIssue(e.target.checked)} />
            <button type="submit" >Add Comment</button>
        </form>

    )
}
