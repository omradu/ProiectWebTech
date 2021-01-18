import React from 'react'
import users from '../Util/Users'
import VizualizarePrieten from './VizualizarePrieten'
import './Prieteni.css'

class Prieteni extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            lista: [],
            username: props.username
        }
    }

    getPrieteni = async() => {
        let x = await users.getPrieteni(this.state.username)
        this.setState({lista: x})
    }

    componentDidMount(){
        this.getPrieteni()
    }

    render() {
        return (
            <div className="classPrieteni">
                {this.state.lista.map((prieten) => {
                const {username, usernamePrieten, caracteristica} = prieten;
                    return(
                        <div className="classViz">
                            <VizualizarePrieten numeprieten = {prieten.usernamePrieten} caracteristica = {prieten.caracteristica}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Prieteni