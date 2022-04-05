import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Response: React.FC = () => {
    const params = useParams<string>();
    const [response, setResponse] = useState<string>('');

    useEffect(() => {
        switch (params.message) {
            case "words_over": {
                setResponse("Words are over!");
                break
            }
            case "finished": {
                setResponse("Finished!");
            }
        };
    }, []);

    return (
        <div className="container text-center py-5">
            <h1 className="title">{response}</h1>
            <Link to="/menu" className="btn btn-outline-danger col-md-6 col-6">Exit</Link>
        </div>
    );
};

export default Response;