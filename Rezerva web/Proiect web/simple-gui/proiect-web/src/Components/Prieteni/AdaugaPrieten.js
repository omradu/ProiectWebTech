import React from 'react';
import prieteni from '../Util/Users'
import './AdaugaPrieten.css'

class AdaugaPrieten extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: Math.floor(Math.random() * 100000),
            username: props.username,
            usernamePrieten: '',
            caracteristica: ''
        }
    }

    AdaugaPrieten = async () => {
        try{
            prieteni.addPrieten({
                id: this.state.id,
                username: this.state.username,
                usernamePrieten: this.state.usernamePrieten,
                caracteristica: this.state.caracteristica
            })
            document.getElementById("idUsername").value=''
            document.getElementById("idCaracteristica").value=''
            alert("Prietenul a fost adaugat!")
        } catch(err) {
            console.log(err)
        }
    }

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value
        })
    }


    render() {
        return (
            <div className="formAdaugaP">
                <div className="rowAdaugaP">
                    <label className="labelAdaugaP">Username prieten: </label>
                    <input type="text" id="idUsername" className="inputAdaugaP" onChange={this.handleChange} name="usernamePrieten"/>
                </div>
                <div className="rowAdaugaP">
                    <label className="labelAdaugaP">Caracteristica prieten: </label>
                    <input type="text" id="idCaracteristica" className="inputAdaugaP" onChange={this.handleChange} name="caracteristica" />
                </div>
                <button className="btnAdaugaPrieten" onClick={this.AdaugaPrieten}>Adauga</button>
                <p class="paragrafAdaugaP">Sugestie caracteristica: "iubitor de zacusca"</p>
            </div>
        )
    }

}



export default AdaugaPrieten