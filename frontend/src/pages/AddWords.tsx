import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { QueryOptions, Word } from '../types/data';

const AddWords: React.FC = () => {
    const [word, setWord] = useState('');
    const [translation, setTraslation] = useState('');
    const [redirect, setRedirect] = useState(false);
    const params = useParams<string>();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            await axios.post<Word>(
                `http://localhost:8000/api/wordlist/types/${params.type_id}/words`,
                {
                    word: word,
                    translation: translation
                },
                QueryOptions);
        } catch (error) {
            alert("Internal server error.")
            return
        }
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/menu" />
    }

    return (
        <div className="container">
            <h1 className="title text-center">Add word</h1>
            <div className="menu col-md-5 mx-auto">
                <form>
                    <div className="mb-3">
                        <label className="form-label">Word</label>
                        <input className="form-control" required
                            onChange={e => setWord(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Translation</label>
                        <input className="form-control" required
                            onChange={e => setTraslation(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center mx-0">
                        <button onClick={submit} className="btn btn-outline-success col-md-5 col-12">Add</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddWords;