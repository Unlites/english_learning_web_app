import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { QueryOptions, Word } from '../types/data';

const AddWords: React.FC = () => {
    const [word, setWord] = useState('');
    const [translation, setTraslation] = useState('');
    const [redirect, setRedirect] = useState(false);
    const params = useParams<string>();
    const [success, setSuccess] = useState(false);
    var successMessage: string | undefined = undefined;

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post<Word>(
                `http://${process.env.REACT_APP_API_URL}/api/wordlist/types/${params.type_id}/words`,
                {
                    word: word,
                    translation: translation
                },
                QueryOptions);
                document.querySelector('form')?.reset()
                setSuccess(true);
        } catch (error : any) {
            if (error.message.includes(400)) {
                alert("Word is already exist!");
                document.querySelector('form')?.reset()
                return
            }
            alert("Internal server error.");
            setRedirect(true);
        }
        
    }

    if (success) {
        successMessage = "Success!"
        setTimeout(() => { 
            setSuccess(false);
            successMessage = undefined;
         }, 2000);
    }

    if (redirect) {
        return <Navigate to="/menu"/>
    }

    return (
        <div className="container">
            <h1 className="title text-center">Add word</h1>
            <h3 className="form-label text-center text-success">{successMessage}&nbsp;</h3>
            <div className="menu col-md-5 mx-auto">
                <form>
                    <div className="mb-3">
                        <label className="form-label">Word</label>
                        <input className="form-control" required
                            onChange={e => setWord(e.target.value.toLowerCase().split(' ').join(''))}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Translation</label>
                        <input className="form-control" required
                            onChange={e => setTraslation(e.target.value.toLowerCase().split(' ').join(''))}
                        />
                    </div>
                    <div className="row d-flex justify-content-between mx-0 gy-2">
                        <button onClick={submit} className="btn btn-outline-success col-md-5 col-12">Add</button>
                        <Link to="/menu" className="btn btn-outline-danger col-md-5 col-12">Exit</Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddWords;