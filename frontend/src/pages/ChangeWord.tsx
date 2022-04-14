import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { QueryOptions, Word } from '../types/data';

const ChangeWord: React.FC = () => {
    const [word, setWord] = useState<Word | null>(null);
    const [wordValue, setWordValue] = useState('');
    const [translation, setTraslation] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [success, setSuccess] = useState(false);
    var successMessage: string | undefined = undefined;

    useEffect(() => {
        document.getElementById('change_form')!.style.display = 'none';
    }, [])


    const search = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.get<Word>(
                `http://${process.env.REACT_APP_API_URL}/api/wordlist/words/search/${wordValue}`,
                QueryOptions);
                setWord(response.data)
                document.querySelector('form')?.reset()
                document.getElementById('search')!.style.display = 'none';
                document.getElementById('change_form')!.style.display = 'block';
        } catch (error : any) {
            console.error(error)
            if (error.message.includes(404)) {
                alert(`Word ${wordValue} does not exist!`);
                document.querySelector('form')?.reset()
                return
            }
            alert("Internal server error.");
            setRedirect(true);
        }
        
    }

    const change = async (e: SyntheticEvent) => {
        e.preventDefault();
        setWordValue(word!.word)
        setTraslation(word!.translation)
        try {
            await axios.put<Word>(
                `http://${process.env.REACT_APP_API_URL}/api/wordlist/words/${word?.id}`,
                {
                    word: wordValue,
                    translation: translation
                },
                QueryOptions);
                document.querySelector('form')?.reset()
                document.getElementById('search')!.style.display = 'block';
                document.getElementById('change_form')!.style.display = 'none';
                setSuccess(true);
        } catch (error : any) {
            console.error(error)
            // if (error.message.includes(400)) {
            //     alert(`Word ${word} does not exist!`);
            //     document.querySelector('form')?.reset()
            //     return
            // }
            alert("Internal server error.");
            setRedirect(true);
        }
    }

    const del = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.delete<Word>(
                `http://${process.env.REACT_APP_API_URL}/api/wordlist/words/${word?.id}`,
                QueryOptions);
                document.querySelector('form')?.reset()
                document.getElementById('search')!.style.display = 'block';
                document.getElementById('change_form')!.style.display = 'none';
                setSuccess(true);
        } catch (error : any) {
            console.error(error)
            // if (error.message.includes(400)) {
            //     alert(`Word ${word} does not exist!`);
            //     document.querySelector('form')?.reset()
            //     return
            // }
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
            <h1 className="title text-center">Change or delete word</h1>
            <h3 className="form-label text-center text-success">{successMessage}&nbsp;</h3>
            <div className="menu col-md-5 mx-auto">
                <form>
                    <div id="search">
                        <div className="mb-3">
                            <label className="form-label">Word</label>
                            <input className="form-control"
                                onChange={e => setWordValue(e.target.value.toLowerCase().split(' ').join(''))}
                            />
                        </div>
                        <div className="row d-flex justify-content-between mx-0 gy-2">
                            <div onClick={search} className="btn btn-outline-success col-md-5 col-12">Search</div>
                            <Link to="/menu" className="btn btn-outline-danger col-md-5 col-12">Exit</Link>
                        </div>
                    </div>
                    <div id="change_form">
                        <div className="mb-3">
                            <label className="form-label">New word instead <b>{wordValue}</b></label>
                            <input className="form-control"
                                onChange={e => setWordValue(e.target.value.toLowerCase().split(' ').join(''))}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">New translation of <b>{wordValue}</b></label>
                            <input className="form-control"
                                onChange={e => setTraslation(e.target.value.toLowerCase().split(' ').join(''))}
                            />
                        </div>
                        <div className="row d-flex justify-content-between mx-0 gy-2 mb-3">
                            <div onClick={change} className="btn btn-outline-success col-md-5 col-12">Change</div>
                            <div onClick={del} className="btn btn-outline-danger col-md-5 col-12">Delete</div>
                        </div>
                        <div className="d-flex justify-content-center mx-0">
                            <Link to="/menu" className="btn btn-outline-danger col-md-5 col-12">Exit</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeWord;