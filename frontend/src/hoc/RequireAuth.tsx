import { Navigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';

const RequireAuth = ({children}: any) => {
    const Auth = useAuth();

    if (!Auth?.isAuth) {
        return <Navigate to="/sign_in"/>;
    }

    return children;
}

export {RequireAuth}