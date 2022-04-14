import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './pages/Menu';
import { RequireAuth } from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';
import Learning from './pages/Learning';
import AddWords from './pages/AddWords';
import ChooseType from './pages/ChooseType';
import Response from './pages/Response';
import ChangeWord from './pages/ChangeWord';


function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/sign_in" element={<SignIn/>}/>
              <Route path="/sign_up" element={<SignUp/>}/>
              <Route path="/response/:message" element={<Response/>}/>
              <Route path="/menu" element={
                <RequireAuth><Menu/></RequireAuth>
              } />
              <Route path="/learning/:type_id"element={
                <RequireAuth><Learning/></RequireAuth>
              } />
              <Route path="/add_words/:type_id" element={
                <RequireAuth><AddWords/></RequireAuth>
              } />
              <Route path="/change_word/" element={
                <RequireAuth><ChangeWord/></RequireAuth>
              } />
              <Route path="/choose_type/" element={
                <RequireAuth><ChooseType/></RequireAuth>
              } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
