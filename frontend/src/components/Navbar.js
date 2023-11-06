import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({textToDisplay}) => {

  return (
    <header>
        <div className="container">
            <Link to='/'>
                <h1><strong>{textToDisplay}</strong></h1>
            </Link>
        </div>
    </header>
  )
}

export default Navbar
