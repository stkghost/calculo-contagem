import React from 'react';
import './Header.css'
import Burger from './Burger'
import { withRouter} from 'react-router-dom'
import styled from 'styled-components'


function Header() {

  const Nav = styled.nav `
    width: 100%;
    height: 90px;
    background: #1c313a;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      height: 75px;
      width: 75px;
      justify-self: center;
    }
`

  return (
    <div>
            <Nav className="header-main">
              <img alt="Macohin"className="logo"src={require('../../asstes/macohin-branca.png')}/>
              <Burger />
            </Nav>
    </div>
  );
}
export default withRouter(Header)