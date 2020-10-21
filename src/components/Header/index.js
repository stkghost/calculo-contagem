import React from 'react'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';


import './Header.css'

function Header() {
    return(
        <header id="main-header">
            <div className="header-content">
                    <img 
                        src={require('../../asstes/logo.png')}
                        className="logo-macohin"    
                    />
                    <div className="avatar">
                        <Avatar >G</Avatar>
                    </div>   
            </div>
        </header>
    )
}

export default Header;