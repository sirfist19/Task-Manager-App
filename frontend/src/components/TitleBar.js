import React from 'react'
import { Link } from 'react-router-dom';

const TitleBar = ({titleToDisplay}) => {

  return (
    
    <div className="title-bar">
            <Link to='/'>
                <h1><strong>{titleToDisplay}</strong></h1>
            </Link>
    </div>
    
  )
}

export default TitleBar
