import React from 'react';
import './AdaugareAliment.css'
import aliments from '../Util/Alimente';


class AdaugareAliment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            codAliment: Math.floor(Math.random() * 100000),
            username: props.username,
            categorie: '',
            denumire: '',
            producator: '',
            calorii: '',
            vegan: false,
            dataExpirare: '',
            disponibil: false
        }
    }

    AdaugaAliment = async () => {
        try{
        aliments.addAliment({
            codAliment: this.state.codAliment,
            username: this.state.username,
            categorie: this.state.categorie,
            denumire: this.state.denumire,
            producator: this.state.producator,
            calorii: this.state.calorii,
            vegan: this.state.vegan,
            dataExpirare: this.state.dataExpirare,
            disponibil: this.state.disponibil
        })
        document.getElementById("idDenumire").value=''
        document.getElementById("idProducator").value=''
        document.getElementById("idCalorii").value=''
        document.getElementById("idData").value=''
        alert("Produsul a fost adaugat!")
        } catch(err) {
        console.log(err)
        }  
    }

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value
        })
    }

      bifa = (evt) => {
        {if(evt.target.checked) {
            this.setState({
                [evt.target.name]: true
              })
        } else {
            this.setState({
                [evt.target.name]: false
              })
        }
    }
    }

    render() {
        return(
            <div className="formAdaugaA">
                <div className="rowAdaugaA">
                <label className="labelAdaugaA">Denumire: </label>
                <input type="text" id="idDenumire" className="inputAdaugA" onChange={this.handleChange} name="denumire"/>
                </div>
                <div className="rowAdaugaA">
                <label className="labelAdaugaA">Categorie: </label>
                <select className="selectAdaugaA" onChange={this.handleChange} name="categorie">
                    <option value="Lactate">Lactate</option>
                    <option value="Carne">Carne</option>
                    <option value="Fructe">Fructe</option>
                    <option value="Legume">Legume</option>
                    <option value="Mezeluri">Mezeluri</option>
                    <option value="Bauturi">Bauturi</option>
                    <option value="Dulciuri">Dulciuri</option>
                </select>
                </div>
                <div className="rowAdaugaA">
                <label className="labelAdaugaA">Producator: </label>
                <input type="text" id="idProducator" className="inputAdaugA" onChange={this.handleChange} name="producator"/>
                </div>
                <div className="rowAdaugaA">
                <label className="labelAdaugaA">Numar calorii: </label>
                <input type="number" id="idCalorii" className="inputAdaugA" onChange={this.handleChange} name="calorii"/>
                </div>
                <div className="rowAdaugaA">
                <label className="labelAdaugaA">Vegan: </label>
                <input type="checkbox" className="inputAdaugA" onChange={this.bifa} name="vegan"/>
                </div>
                <div className="rowAdaugaA">
                <label className="labelAdaugaA">Data expirare: </label>
                <input type="date" id="idData" className="inputAdaugA" onChange={this.handleChange} name="dataExpirare"/>
                <button className="btnAdauga" onClick={this.AdaugaAliment}>Adauga</button>
                </div>
            </div>
        )
    }
}

export default AdaugareAliment
