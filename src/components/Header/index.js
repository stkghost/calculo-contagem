import React from 'react'

import Button from '@material-ui/core/Button'
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
                    <Button>Novo Cálculo</Button>
                    <Button>Cálculos Cadastrados</Button>
                    <Button>Jurisprudência</Button>
                    <Button>Suporte</Button>
                    <Button>Parceria Macohin</Button>


                    <div>
                        {/* onClick=handleUserProfile */}
                        <Avatar className="avatar" >G</Avatar> 
                    </div>   
            </div>
        </header>
    )
}

export default Header;