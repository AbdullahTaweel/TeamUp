import React, {useState, useEffect} from 'react';
import api from '../api';
import {useHistory, Link} from 'react-router-dom';

export default function EditComment (props){

    const [content, setContent] = useState('');
    const [issue, setIssue] = useState();
    const [check, setChecked] = useState(0);
    const history = useHistory();

    useEffect(() => {
        handleEditComment(props.match.params.id)
    },[]);

    function handleEditComment(id){
        api.editComment(id)
        .then(response => {
            console.log(response.data)
            setContent(response.data.content);
            if(response.data.issue==1){
                setIssue(true);
            }else{
                setIssue(false);
            }
        })
    }

    function handleUpdateComment(event){
        event.preventDefault();
        const comment = {
            content: content,
            issue: check
        }
        api.updateComment(comment, props.match.params.id)
            .then(response => {
                history.goBack();
            })
    }


    function checked(event){
        if(event.target.checked){
            setChecked(1)
        }else{
            setChecked(0)
        }
    }

    return(
        <div style={{backgroundColor:'rgba(0,0,0,0.8)', width:'100%',height:'100%',position:'fixed'}}>
            <div className="container-fluid">
                <Link to={`/tasks/${props.match.params.id}/comments`} className="btn btn-danger">back</Link>
                <div className="row">
                    <div className="col-md-3 login tm-bg-black-transparent">
                        <form onSubmit= {() => handleUpdateComment(event)}>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">Content:</label>
                                <textarea value={content} className="form-control col-md-6"
                                onChange={(e) => setContent(e.target.value)} />
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">Issue:</label>
                                <input type="checkbox" className="form-control col-md-6"
                                defaultChecked={issue} onChange={checked} />
                            </div>
                            <button type="submit" >Update Comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
