import React, {Component}from 'react'

import './Dashboard.css'
import Box from '@material-ui/core/Box'
export default class Dashboard extends Component{
    render(){
        return(
            <Box className="box-container">
                <Box className="box-cadastrados">
                    <div>cadastrados</div>
                </Box>
                <Box className="box-pendentes">
                    <div>pendentes</div>
                </Box>
                <Box className="box-finalizados">
                    <div>finalizados</div>
                </Box>
                <Box className="box-banner">
                    <div>banner</div>
                </Box>
            </Box>
        )
    }
} 