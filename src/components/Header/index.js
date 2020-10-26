import React, {useState}from 'react'
import {Link, withRouter} from 'react-router-dom'
import './Header.css'
// import firebase from '../../firebase'
import { Button } from '@material-ui/core'



const Header = (props) => {

    const [userState, setUserState] = useState(null)


    const logout = () => {
        console.log("User saiu")
    }


    let buttons;

    if(userState != null){
        buttons = (
            <React.Fragment>
                      <li><Button onClick={logout}>Sair</Button></li>
                      <li><Button onClick={logout}>Sair</Button></li>
            </React.Fragment>
        )
    }else {
        buttons= (
            <React.Fragment>
                <li><Link to="/register">Registra-se</Link></li>
                <li><Link to="/login">Entrar</Link></li>

            </React.Fragment>
        )
    }

    return(
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
            </ul>
            <ul>
                <li><Link to="/create">New Calc</Link></li>
                {buttons}
            </ul>
        </nav>
    )
}

export default withRouter(Header) 
