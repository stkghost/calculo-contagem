import React from 'react'
import './Header.css'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import firebase from '../../firebase'
import {useHistory} from 'react-router-dom'

const Avatar = () => {

    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    }
    const handleClose = async (e) => {
      e.preventDefault()
      setAnchorEl(null)
  
      await firebase.logout(); 
      history.push("/login")
    }
    const goToPerfil = (e) => {
        e.preventDefault()
        history.push("/perfil")
    }
    return (
        <div className="avatar-position">
            <IconButton  
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                style={{
                    color: '#e0e0e0',
                }}
              >
                <AccountCircleIcon fontSize="large"/>
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
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={goToPerfil}>Meu perfil</MenuItem>
                <MenuItem onClick={handleClose}>Sair</MenuItem>
              </Menu>
        </div>
    )
}

export default Avatar