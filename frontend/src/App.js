import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import AddToDo from './pages/AddToDo';
import ToDoToday from './pages/ToDoToday';
import AddCategory from './pages/AddCategory';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuthContext } from './hooks/useAuthContext';
// other css
import './loginRegister.css'
import EditToDo from './pages/EditToDo';

function App() {
  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="routes">
          <Routes>
            <Route path='/' element={user ? <Home/> : <Navigate to="login"/>}/>
            <Route path='/createToDo' element={
              user ? <AddToDo/> : <Navigate to='login'/>}/>
            <Route path='/editToDo' element={
              user ? <EditToDo/> : <Navigate to='login'/>
            }/>
            <Route path='/createCategory' element={user ? <AddCategory/> : <Navigate to='login'/>}/>
            <Route path='/daily' element={user ? <ToDoToday/> : <Navigate to='login'/>}/>
            <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
            <Route path='/register' element={!user ? <Register/> : <Navigate to='/'/>}/>
          
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
