import React from 'react'
import Navbar from './Navbar'
import TitleBar from './TitleBar'

const Header = ({title}) => {
  return (
    <div className="header">
        <Navbar/>
        <TitleBar titleToDisplay={title}/>
    </div>
  )
}

export default Header
