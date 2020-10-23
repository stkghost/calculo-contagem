import React, {useState}from 'react'
import {Button} from '../Button'
import {Link} from 'react-router-dom'
import './Header.css'
import Dropdown from '../Drowpdown'


function Header() {

    const [click, setClick] = useState(false)
    const [dropdown, setDropdown] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    
        // const goToRegister = () => {

        //    return <Route exact path='/' component={RegisterScreen} />
        // }
        // const goToLogin = () => {
        //     return <Route exact path='/' component={LoginScreen} />
        // }
        

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false)
        } else {
            setDropdown(true)
        }
    }

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false)
        } else {
            setDropdown(false)
        }
    }
    return (
        <>
            <nav className="navbar">
                
                    <Link to='https://macohin.com' className="logo">
                        <img className="logo" src={require('../../asstes/macohin-branca.png')}>
                        </img>
                    </Link>
                
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>                  
                    <li className='nav-item'
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                            Suporte <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown && <Dropdown />}
                    </li>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                            Entrar
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/register' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Registar-se
                        </Link>
                        
                    </li>
                </ul>
                <Button />
            </nav>
        </> 
    )
}
export default Header 
