import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import CookieService from '../Service/CookieService';

export  default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setCpassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function handleNameChange (event) {
        setName(event.target.value)
    }

    function handleEmailChange (event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    function handleCPasswordChange (event) {
        setCpassword(event.target.value)
    }

    function handleRoleChange (event) {
        console.log(event.target.value);
        setRole(event.target.value)
    }

    function hasErrorFor (field) {
        return !!errors[field]
    }

    function renderErrorFor (field) {
        if (hasErrorFor(field)) {
            return (
                <span style={{ color: 'red' }}> {/*make it in boostrap*/}
                    <strong>{errors[field][0]}</strong>
                </span>
            )
        }
    }

    function handleCreateNewUser (event) {
        event.preventDefault();
        const register = {
            name: name,
            email: email,
            password: password,
            c_password: c_password,
        }
        api.register(register, {headers:{'Accept': "application/json", 'content-type': "application/json"}})
            .then(response => {
                const options = {Path: "/",Expires: response.data.expires, Secure: true};
                CookieService.set('access_token', response.data.access, options);

                history.push('/projects');
                window.location.reload();
            }) .catch(error => {
                setErrors(error.response.data.errors);
            })
    }

    return(
        <div className="logincontainer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 login">
                        <img src="../images/avatar.svg" className="img-fluid"></img>
                        <br/><br/>
                        <form onSubmit={handleCreateNewUser}> {/*put scroll here*/}

                            <div className="form-group row" >
                                <label className="col-md-5 col-form-label text-md-left">
                                    <span className="fontcolor">
                                    <i className="fa fa-user"></i> Name:</span>
                                </label>
                                
                                <input type="text" className="form-control col-md-6" placeholder="Enter name"
                                        onChange={handleNameChange}
                                        value={name}
                                />
                                    {renderErrorFor('name')}
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">
                                    <i className="fa fa-envelope"></i> Email:
                                </label>
                                <input  type="email" className="form-control col-md-6" placeholder="Enter email"
                                        onChange={handleEmailChange}
                                        value={email}
                                />
                                    {renderErrorFor('email')}
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left">
                                    <i className="fa fa-lock"></i> Password:
                                </label>
                                <input  type="password" className="form-control col-md-6" placeholder="Enter password"
                                        onChange={handlePasswordChange}
                                        value={password}
                                />
                                    {renderErrorFor('password')}
                            </div>
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label text-md-left"> 
                                    <i className="fa fa-lock"></i> Confirm:
                                </label>
                                <input  type="password" className="form-control col-md-6" placeholder="Confirm password"
                                        onChange={handleCPasswordChange}
                                        value={c_password}
                                />
                                    {renderErrorFor('c_password')}
                            </div>
                            <div>
                                <label>
                                    <Link to="/login" className="ancore">Already have account</Link>
                                </label>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-secondary">Register</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    )

}
