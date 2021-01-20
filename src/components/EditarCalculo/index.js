import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Header from '../Header'
import Axios from 'axios'

export default function Editar() {
    
    var {clienteId} = useParams()
    console.log(clienteId)
    useEffect(() => {
        Axios.get(`http://localhost:3001/api/getFromId/${clienteId}`).then((response) => {
            console.log(response)
        })
    }, [])
    return (
        <div>
            <Header/>
            <div className="manual-container">
                <h1>teste</h1>
            </div>
        </div>
    )
}