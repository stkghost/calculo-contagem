import React, {useState} from 'react'
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import firebase from '../../firebase'
import {useHistory} from 'react-router-dom'

const Ul = styled.ul `
    list-style: none;
    display: flex;
    flex-flow: row nowrap; 
    justify-self: center;

    li{
    padding: 18px 10px
    
    }

    @media (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: #f1f1f1;
        position: fixed;
        transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
        top: 0;
        right: 0;
        height: 100vh;
        width: 300px;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;

        li {
            color: #000;
        }
    }
`;
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


const Navbar = ({open}) => {
    const history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openPerfil = Boolean(anchorEl);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = async (e) => {
      e.preventDefault()
      setAnchorEl(null);
  
      await firebase.logout(); 
      history.push("/login")
    }
    return (
        <Ul open={open}>
            <li><Button color="primary">Novo Cálculo</Button></li>  
            <li><Button color="primary">Meus cálculos</Button></li>  
            <li><Button color="primary">Jurisprudência</Button></li>  
            <li><Button color="primary">Suporte</Button></li>  
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                openPerfil={openPerfil}
              >
                <MenuItem onClick={handleClose}>Meu perfil</MenuItem>
                <MenuItem onClick={handleClose}>Sair</MenuItem>
              </Menu>
        </Ul>
    )
}

export default Navbar;