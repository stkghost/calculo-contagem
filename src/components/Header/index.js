import React from 'react';
import './Header.css'
import Burger from './Burger'
// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import firebase from '../../firebase'
import { withRouter, useHistory} from 'react-router-dom'
import styled from 'styled-components'


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

function Header() {

  const Nav = styled.nav `
    width: 100%;
    height: 90px;
    background: #ccc;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

    .logo {
      height: 75px;
      width: 75px;
      justify-self: center;
    }
`
  // const history = useHistory();
  // const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = async (e) => {
  //   e.preventDefault()
  //   setAnchorEl(null);

  //   await firebase.logout(); 
  //   history.push("/login")
  // }

  return (
    <div>
            <Nav className="header-main">
              <img className="logo"src={require('../../asstes/logo.png')}/>
              
              <Burger />
              {/* <IconButton
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
                open={open}
              >
                <MenuItem onClick={handleClose}>Meu perfil</MenuItem>
                <MenuItem onClick={handleClose}>Sair</MenuItem>
              </Menu> */}
            </Nav>
    </div>
  );
}
export default withRouter(Header)