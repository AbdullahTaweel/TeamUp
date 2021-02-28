import React, { useRef, useEffect, useState } from 'react'
import { Link ,useHistory } from 'react-router-dom';
import api from '../api';
import CookieService from '../Service/CookieService';
import logo from './../../images/logo.png';

export default function Header() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [check, setCheck] = useState('');

    const hasMount = useRef(false)

    useEffect(() => {
        details();
    },[]);

    function details(){
        api.details().then(response => {
            setName(response.data.name)
            setCheck(true)
        }).catch(error => {
            setCheck(false)
           history.push('/login');
        })
    }

    function guest(){
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/login">login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                </li>
            </ul>
        )
    }

    function auth(){
        return(
            <ul className="navbar-nav ml-auto" id="nav-profile">
                <li className="nav-item dropdown">
                    <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {name}
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" onClick= {() => handleLogout()}>Logout</a>
                    </div>
                </li>
            </ul>
        )
    }

    function handleLogout() {
        api.logout().then((response) => {
            CookieService.remove('access_token')
            history.push('/login');
            window.location.reload();
        });
    }

    return (
        <nav className="navbar navbar-dark navbar-expand-sm bg-dark">
            <a className="navbar-brand" href="#">
                {/* src={require(`${imgUrl}`)} */}
                <img src={logo} width="120" height="80" />
            </a>
            { check==true ? auth() : guest() }
        </nav>
    )
}
