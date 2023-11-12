import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useToDoContext } from '../hooks/useToDoContext';

const Dropdown = ({items}) => {
  return (
    <div className="dropdown">
      <Link to='/createCategory'>{items[0]}</Link>
      <Link to='/createToDo'>{items[1]}</Link>
    </div>
  );
};

const Navbar = () => {
  const {logout} = useLogout();
  const {user} = useAuthContext(); // gets the stored user
  const [addDropdownVisibile, setAddDropdownVisible] = useState(false);
  const {dispatch} = useToDoContext();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <header>
        <nav>
          <div className="navbar">
            <div className="left-info">
              <Link to='/'
                onClick={ ()=>// now that we have all the information about the to do, close the to do description opened on the home page
                dispatch({type: 'CLOSE_DETAILS'})
                }
              >Home</Link>
              <Link to='/daily'>Today</Link>
              <Link
                onClick={()=>{
                  setAddDropdownVisible(!addDropdownVisibile)
                }}
              >
                Add
                {addDropdownVisibile && 
                <Dropdown items={['Category', 'Task']}/>}
              </Link>
            </div>

            {user &&
              <div className="right-info">
                <h3 className="user-email">{user.email}</h3>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            }
            {!user && 
              <div>
                  <Link to='/login'>
                    Login
                  </Link>
                  <Link to='/register'>
                    Register
                  </Link>
              </div>
            }
          </div>
        </nav>
    </header>
  )
}

export default Navbar
