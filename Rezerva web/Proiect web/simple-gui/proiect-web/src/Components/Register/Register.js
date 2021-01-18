import React from 'react';
import users from '../Util/Users';
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            nume: '',
            prenume: '',
            username: '',
            parola: '',
            judet: '',
            oras: '',
            vegan: false
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

    registerAccount = async () => {
        let ok = true
        let x = await users.getAll()
        for(let acc of x){
            if(acc.username === this.state.username){
                ok=false;
            }
        }
        if(ok === true) {
        users.addAccount({
            nume: this.state.nume,
            prenume: this.state.prenume,
            username: this.state.username,
            parola: this.state.parola,
            judet: this.state.judet,
            oras: this.state.oras,
            vegan: this.state.vegan
        })
        alert('Contul dumneavoastra a fost creat!')
        window.location.reload()
    } else {
        alert('Acest username deja exista')
    }
    }

    render() {
        return(
            <div className="formRegister" ref={this.props.containerRef}>
                <div className="rowRegister">
                    <label className="labelRegister">Nume: </label>
                    <input type="text" id="idNume" className="inputRegister" onChange={this.handleChange} name="nume" />
                </div>
                <div className="rowRegister">
                    <label className="labelRegister">Prenume: </label>
                    <input type="text" id="idPrenume" className="inputRegister" onChange={this.handleChange} name="prenume" />
                </div>
                <div className="rowRegister">
                    <label className="labelRegister">Username: </label>
                    <input type="text" id="idUsername" className="inputRegister" onChange={this.handleChange} name="username" />
                </div>
                <div className="rowRegister">
                    <label className="labelRegister">Parola: </label>
                    <input type="password" id="idParola" className="inputRegister" onChange={this.handleChange} name="parola" />
                </div>
                <div className="rowRegiser">
                    <label className="labelRegister">Judet: </label>
                    <input type="text" id="idJudet" className="inputRegister" onChange={this.handleChange} name="judet" />
                </div>
                <div className="rowRegister">
                    <label className="labelRegister">Oras: </label>
                    <input type="text" id="idOras" className="inputRegister" onChange={this.handleChange} name="oras" />
                </div>
                <div className="rowRegister">
                <label className="labelRegister">Vegan: </label>
                <input type="checkbox" className="inputRegisterVegan" onChange={this.bifa} name="vegan"/>
                </div>
                <button className="btnAdaugaRegister" onClick={this.registerAccount}>Inregistrare</button>
            </div>
        )
    }
}

export default Register