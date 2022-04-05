import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { User, QueryOptions } from '../types/data';

const SignIn: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const Auth = useAuth();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            await axios.post<User>(
                "http://localhost:8000/auth/sign_in",
                {
                    username: username,
                    password: password
                },
                QueryOptions);
        } catch (error) {
            alert("Incorrect login or password.")
            return
        }
        setRedirect(true);
        Auth?.signIn()
    }

    if (redirect) {
        return <Navigate to="/menu"/>
    }

    return (
        <div className="container">
            <h1 className="title text-center">Sign in</h1>
            <div className="menu col-md-5 mx-auto">
                <form>
                    <div className="mb-3">
                        <label className="form-label">Login</label>
                        <input type="login" className="form-control" required
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center mx-0">
                        <button onClick={submit} className="btn btn-outline-success col-md-5 col-12">Sign in</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignIn;