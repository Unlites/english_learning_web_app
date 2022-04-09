import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { QueryOptions, Word } from '../types/data';

const Learning: React.FC = () => {

    const [word, setWord] = useState<Word | null>(null);
    const [counter, setCounter] = useState<number>(1);
    const params = useParams<string>();
    const [translation, setTranslation] = useState<string>('');
    const [priority, setPriority] = useState<number>(1);
    const [response, setResponse] = useState<string>('')
    const [redirectResponse, setRedirectResponse] = useState<boolean>(false)


    useEffect(() => {
        fetchWord()
    }, [])

    async function fetchWord() {
        switch (counter) {
            case 10: {
                setPriority(0);
                break;
            }
            case 15: {
                setResponse("finished")
                setRedirectResponse(true);
                break;
            }
        }
        try {
            const response = await axios.get<Word>(
                `http://localhost:8000/api/wordlist/types/${params.type_id}/words/${priority}`,
                QueryOptions);
            setWord(response.data);

        } catch (e: any) {
            if (e.message.includes("501")) {
                setResponse("words_over");
                setRedirectResponse(true);
            } else {
                alert(e);
            }

        }
    }
    const checkWord = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (translation === word?.translation) {
            setCounter(counter + 1);
            if (word.priority !== 0) {
                try {
                    await axios.patch<Word>(
                    `http://localhost:8000/api/wordlist/words/${word.id}`,
                    {
                        priority: word.priority - 1
                    },
                    QueryOptions);
                } catch (e) {
                    alert(e)
                }
            }
            document.querySelector('form')?.reset()
            fetchWord()
        } else {
            alert("Incorrect! Try again.")
        }

    }

    if (redirectResponse) {
        return <Navigate to={`/response/${response}`} />
    }

    return (
        <div className="container">
        <h1 className="title text-center">Learning</h1>
        <div className="menu col-md-5 mx-auto">
            <div className="mb-3">
                    <h3 className="form-label text-center">
                        {counter} / 15
                    </h3>
                </div>
            <div className="mb-3">
                <h3 className="form-label text-center">
                    {word?.word}
                </h3>
                {/* <img src="правый.png" className="rounded img-fluid" alt="..."> */}
              </div>
            <form id="form">
                <div className="mb-3">
                  <label className="form-label">Translate word</label>
                  <input className="form-control" required
                    onChange={e => setTranslation(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Make the sentence with this word</label>
                  <textarea className="form-control" rows = {2} ></textarea>
                </div>
                <div className="row d-flex justify-content-between mx-0 gy-2">
                    <button onClick={checkWord} className="btn btn-outline-dark col-md-5 col-12">Check</button>    
                    <Link to="/menu" className="btn btn-outline-danger col-md-5 col-12">Exit</Link>
                </div>
            </form>
        </div>
    </div>
    );
};

export default Learning;