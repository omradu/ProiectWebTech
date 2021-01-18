import React from 'react'
import aliments from'../Util/Alimente'
import Aliment from './Aliment'
import "./PaginaAlimente.css"
import "./Aliment.css"
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';


class PaginaAlimente extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lista: [],
            username: props.username
        }
        
    }

    getAllLactate = async () => {
        let x = await aliments.getAllCateg("Lactate", this.state.username)
        this.setState({lista: x})
        this.notificare()
    }
    
    getAllCarne = async () => {
        let x = await aliments.getAllCateg("Carne", this.state.username)
        this.setState({lista: x})
        this.notificare()
    }

    getAllFructe = async () => {
        let x = await aliments.getAllCateg("Fructe", this.state.username)
        this.setState({lista: x})
        this.notificare()
    }
    
    getAllLegume = async () => {
        let x = await aliments.getAllCateg("Legume", this.state.username)
        this.setState({lista: x})
        this.notificare()
    }

    getAllMezeluri = async () => {
        let x = await aliments.getAllCateg("Mezeluri", this.state.username)
        this.setState({lista: x})
        this.notificare()
    }

    getAllBauturi = async () => {
        let x = await aliments.getAllCateg("Bauturi", this.state.username)
        this.setState({lista: x})
        this.notificare()
    }

    getAllDulciuri = async () => {
        let x = await aliments.getAllCateg("Dulciuri", this.state.username)
        this.setState({lista: x})
        this.notificare()
    }

    eatOne = async (evt) => {
        let id = evt.target.id
        aliments.eatAliment(id)
        alert("Alimentul a fost mancat")
    }

    changeDisponibil = async (evt) => {
        let id = evt.target.id - 1
        aliments.changeDisp(id)
    }

    notificare() {
        this.state.lista.map((aliment) =>{
            const {codAliment, categorie, denumire, producator, calorii, vegan, dataExpirare} = aliment;

            var newDate = new Date(Date.now());
            var nrZilePanaLaExpirare = ( (new Date(aliment.dataExpirare)).getTime() - newDate.getTime() ) / (1000 * 3600 * 24) ;
            if( (nrZilePanaLaExpirare <= 2) && (nrZilePanaLaExpirare >=0)){
                addNotification({
                    title: 'Atentionare',
                    subtitle: 'Data expirare',
                    message: 'Alimentul ' + aliment.denumire + ' va expira in curand!',
                    theme: 'darkblue',
                    native: true
                });
            } else if( nrZilePanaLaExpirare < 0) {
                addNotification({
                    title: 'Atentionare',
                    subtitle: 'Data expirare',
                    message: 'Alimentul ' + aliment.denumire + ' a expirat!',
                    theme: 'darkblue',
                    native: true
                });
            }
        })
    }

    render() {
        
        return (
        <div className="Content">
            <Notifications />
            <div className="buttons">
            <button type="button" value="Lactate" className="unButon" onClick={this.getAllLactate}><input type="image" src="Media\lactate.png" width="300" height="100"/></button>
            <button type="button" value="Carne" className="unButon" onClick={this.getAllCarne}><input type="image" src="Media/carne.png" width="300" height="100" /></button>
            <button type="button" value="Fructe" className="unButon" onClick={this.getAllFructe}><input type="image" src="Media/fructe.png" width="300" height="100" /></button>
            <button type="button" value="Legume" className="unButon" onClick={this.getAllLegume}><input type="image" src="Media/legume.png" width="300" height="100" /></button>
            <button type="button" value="Mezeluri" className="unButon" onClick={this.getAllMezeluri}><input type="image" src="Media/mezeluri.png" width="300" height="100" /></button>
            <button type="button" value="Bauturi" className="unButon" onClick={this.getAllBauturi}><input type="image" src="Media/bauturi.png" width="300" height="100" /></button>
            <button type="button" value="Dulciuri" className="unButon" onClick={this.getAllDulciuri}><input type="image" src="Media/dulciuri.png" width="300" height="100" /></button>
            </div>
            <div className="mapare">
             {this.state.lista.map((aliment) =>{
                    const {codAliment, categorie, denumire, producator, calorii, vegan, dataExpirare, disponibil} = aliment;
                    return (
                    <div className="alimentPA">
                         
                        <Aliment denumire = {aliment.denumire} producator = {aliment.producator} calorii = {aliment.calorii} vegan = {aliment.vegan.toString()} dataExpirare = {aliment.dataExpirare} disponibil = {aliment.disponibil.toString()}/>
                        <input type="button" id = {aliment.codAliment} className="eatClass" onClick={this.eatOne} value="Mananca" />
                        <input type="button" id = {aliment.codAliment + 1} className="dispClass" onClick={this.changeDisponibil} value="Schimba dispoibilitatea" />
                    </div>
                    )
             })}
             </div>
        </div>)
    }
}

export default PaginaAlimente