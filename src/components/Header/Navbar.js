import React from 'react'
import './Header.css'
import styled from 'styled-components'
import Avatar from './Avatar'
import {Link} from 'react-router-dom'

const Ul = styled.ul `
    list-style: none;
    display: flex;
    flex-flow: row nowrap; 
    justify-self: center;
    z-index: 5;

    li{
    padding: 18px 10px
    }
    @media (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: #1c313a;
        position: fixed;
        transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
        top: 0;
        right: 0;
        height: 100vh;
        width: 300px;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;

        li {
            color: #1c313a;
        }
    }
`;

const Navbar = ({open}) => {

    return (
        <Ul open={open}>
            <li><Link className="link-menu" color="primary" to="/newCalc">Novo Cálculo</Link></li>  
            <li><Link className="link-menu" color="primary"to="/Calculos">Meus cálculos</Link></li>  
            <li><Link className="link-menu" color="primary"to="/Jurisprud">Jurisprudência</Link></li>  
            <li><Link className="link-menu" color="primary" to="/Suporte">Suporte</Link></li>  
            <Avatar />
        </Ul>
    )
}
export default Navbar