import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { QueryOptions, User } from '../types/data';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const Auth = useAuth();
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            await axios.post<User>(
                `http://${process.env.REACT_APP_API_URL}/auth/sign_up`,
                {   
                    name: name,
                    username: username,
                    password: password
                },
                QueryOptions);
        } catch (error: any) {
            if (error.message.includes("400")) {
                alert("This login is already in use");
            } else {
                alert("Internal server error. Please try later.");
                setRedirect(true);                
            }

            return
        }
        setRedirect(true);
    }

    if (redirect) {
        axios.post<User>(
            "http://localhost:8000/auth/sign_in",
            {
                username: username,
                password: password
            },
            QueryOptions);
        Auth?.signIn();
        return <Navigate to="/menu"/>
    }

    return (
        <div className="container">
            <h1 className="title text-center">Sign up</h1>
            <div className="menu col-md-5 mx-auto">
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="login" className="form-control" required
                            onChange={e => setName(e.target.value.toLowerCase().split(' ').join(''))}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Login</label>
                        <input type="login" className="form-control" required
                            onChange={e => setUsername(e.target.value.toLowerCase().split(' ').join(''))}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" required
                            onChange={e => setPassword(e.target.value.toLowerCase().split(' ').join(''))}
                        />
                    </div>
                    <div className="d-flex justify-content-center mx-0">
                        <button type="submit" className="btn btn-outline-dark col-md-5 col-12">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;