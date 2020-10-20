import React from 'react'
import Button  from '@material-ui/core/Button';

import NewCalc from '../PageNewCalc'

function NewActivity () {
    
}
function PageNewCalc (){
    return (
        <div>
            <div className="button-new-activity-container">
                <Button variant="contained" color="secondary" >Nova Atividade</Button>
            </div>
            <NewCalc />
        </div>
    )
}

export default PageNewCalc;