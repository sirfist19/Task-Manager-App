import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import AddToDo from './pages/AddToDo';
import ToDoToday from './pages/ToDoToday';
import AddCategory from './pages/AddCategory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="routes">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/createToDo' element={<AddToDo/>}/>
            <Route path='/createCategory' element={<AddCategory/>}/>
            <Route path='/daily' element={<ToDoToday/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
