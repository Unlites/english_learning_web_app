import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface stateType {
    useCase: string
}

const ChooseType: React.FC = () => {
    const [typeId, setTypeId] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const location = useLocation();
    const state = location.state as stateType;
    const { useCase } = state;

    if (redirect) {
        return <Navigate to={`/${useCase}/${typeId}`}/>
    }

    const verbs = () => {
        setTypeId(1);
        setRedirect(true);
    }

    const nouns = () => {
        setTypeId(2);
        setRedirect(true);
    }

    const adjectives = () => {
        setTypeId(3);
        setRedirect(true);
    }

    

    return (
        <div className="container">
            <h1 className="title text-center">Choose type of word</h1>
            <div className="menu vstack gap-3 col-md-6 text-center mx-auto">
                <button className="item btn-outline-dark" onClick={verbs}>Verbs</button>
                <button className="item btn-outline-dark" onClick={nouns}>Nouns</button>
                <button className="item btn-outline-dark" onClick={adjectives}>Аdjectives</button>
            </div>
        </div>
    );
};

export default ChooseType;