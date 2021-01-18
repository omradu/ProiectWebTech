import React from 'react';
import Aliment from '../Alimente/Aliment';
import aliments from '../Util/Alimente';
import './AlimentePrieteni.css'

class AlimentePrieteni extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lista: [],
            username: props.username
        }
    }

    getAllAlimentePrieteni = async() => {
        let x = await aliments.getAlimentePrieteni(this.state.username)
        this.setState({lista: x})
    }

    componentDidMount() {
        this.getAllAlimentePrieteni()
    }

    claimOne = async (evt) => {
        let id = evt.target.id
        aliments.claimAliment(id, this.state.username)
        alert("Alimentul a fost revendicat!")
    }

    render() {
        return (
            <div>
                <div className="mapareAlimentePrieteni">
             {this.state.lista.map((aliment) =>{
                    const {codAliment, username, categorie, denumire, producator, calorii, vegan, dataExpirare, disponibil} = aliment;
                    return (
                    <div className="aliment">
                        {aliment.username}
                        <Aliment denumire = {aliment.denumire} producator = {aliment.producator} calorii = {aliment.calorii} vegan = {aliment.vegan.toString()} dataExpirare = {aliment.dataExpirare} disponibil = {aliment.disponibil.toString()}/>
                        <input type="button" id= {aliment.codAliment} className="claimClass" onClick={this.claimOne} value="Revendica" />
                    </div>
                    )
             })}
            </div>
            </div>
        )
    }
}

export default AlimentePrieteni