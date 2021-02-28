import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import CookieService from '../Service/CookieService';
import api from '../api';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(0);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function hasErrorFor (field) {
        return !!errors[field]
    }

    function renderErrorFor (field) {
        if (hasErrorFor(field)) {
            return (
                <span style={{ color: 'red' }}>
                    <strong>{errors[field][0]}</strong>
                </span>
            )
        }
    }

    function handleEmailChange (event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    function handleRememberChange (event) {
        if(event.target.checked){
            setRemember(1)
        }else{
            setRemember(0)
        }
    }

    function handleLogin (event) {
        event.preventDefault();
        const login = {
            email: email,
            password: password,
            remember_token: remember
        }
        api.checkLogin(login, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {

                const options = {Path: "/",Expires: response.data.expires, Secure: true};
                CookieService.set('access_token', response.data.access, options);

                history.push('/projects')
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response.data.errors);
                if(email=='' || password==''){
                setErrors(error.response.data.errors)
                }else{
                    alert('incorrect username or password');
                }
            })
    }

    return(
        <div className="logincontainer">
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-3 login ">
                        <img src="../images/avatar.svg" className="img-fluid"></img>
                        <br/><br/>
                        <form onSubmit={handleLogin}>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">
                                    <i className="fa fa-user" /> Email:
                                </label>
                                <input type="email" className="form-control col-md-6" placeholder="Enter email"
                                value={email} onChange={handleEmailChange} />
                                {renderErrorFor('email')}
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">
                                    <i className="fa fa-lock" /> Password:
                                </label>
                                <input type="password" className="form-control col-md-6"
                                placeholder="Enter password" value={password}
                                onChange={handlePasswordChange} />
                                {renderErrorFor('password')}
                            </div>
                            <div>
                                <input type="checkbox"
                                defaultChecked={false}
                                onChange={handleRememberChange}/>
                                <label>&nbsp;Remember Me</label>
                            </div>
                            <div>
                                <label>
                                    <Link to="/register" className="ancore">Sign up</Link>
                                </label>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-secondary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
