import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
    <div className="container">
        <h1 className="title text-center">English WebApp</h1>
        <div className="menu vstack gap-3 col-md-6 text-center mx-auto">
            <Link to="/sign_in"><div className="item btn-outline-success">Sign in</div></Link>
            <Link to="/sign_up"><div className="item btn-outline-dark">Sign up</div></Link>
        </div>
    </div>
    );
};

export default Home;