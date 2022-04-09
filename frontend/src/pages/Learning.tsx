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
    const [response, setResponse] = useState<string>('');
    const [redirect, setRedirect] = useState(false);
    const [redirectResponse, setRedirectResponse] = useState<boolean>(false);
    const [needRemind, setNeedRemind] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false);
    var remindedWord:string | undefined = undefined;
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [failedMessage, setFailedMessage] = useState<string>('');


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
                setRedirect(true);
            }

        }
    }
    const checkWord = async (e: SyntheticEvent) => {
        e.preventDefault();
        setNeedRemind(false);
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
            setSuccessMessage("Correct!")
            setResult(true)
            document.querySelector('form')?.reset()
            fetchWord()
        } else {
            setFailedMessage("Incorrect!")
            setResult(true)
        }

    }

    const remindWord = () => {
        setNeedRemind(true);
    }

    if (result) {
        setTimeout(() => {
            setSuccessMessage("")
            setFailedMessage("")
            setResult(false)
         }, 2000);
    }

    if (needRemind) {
        remindedWord = "- " + word?.translation
    }

    if (redirect) {
        return <Navigate to="/menu"/>
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
                    {word?.word} {remindedWord}
                </h3>
              </div>
              <h4 className="form-label text-center">
                  <span className="text-success">{successMessage}</span>
                  <span className="text-danger">{failedMessage}</span>
                  &nbsp;
              </h4>
            <form id="form">
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                  <label className="form-label">Translate word</label>
                  <div onClick={remindWord} className="py-1 px-1 btn btn-outline-success col-md-1 col-1 text-center">?</div>
                  </div>
                  <input className="my-1 form-control" required
                    onChange={e => setTranslation(e.target.value.toLowerCase().split(' ').join(''))}
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