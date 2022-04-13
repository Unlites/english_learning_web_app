import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { QueryOptions } from '../types/data';

const Menu: React.FC = () => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_API_URL}/api/reset`, 
        QueryOptions);
    }, [])

    const logout = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try { 
            await fetch(`http://${process.env.REACT_APP_API_URL}/auth/logout`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
            });
        } catch (e) {
            alert(e);
        }

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/"/>
    }

    return (
        <div className="container">
            <h1 className="title text-center">English WebApp</h1>
            <div className="menu vstack gap-3 col-md-6 text-center mx-auto">
                <Link to="/choose_type" state={{useCase: "learning"}}><div className="item btn-outline-dark">Start learning</div></Link>
                <Link to="/choose_type" state={{useCase: "add_words"}}><div className="item btn-outline-dark">Add words</div></Link>
                <Link to="/logout" onClick={logout}><div className="item btn-outline-danger">Logout</div></Link>
            </div>
        </div>
    );
};

export default Menu;