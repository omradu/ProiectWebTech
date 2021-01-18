import React from 'react';
import users from '../Util/Users';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PaginaAlimente from '../Alimente/PaginaAlimente';
import Navbar from '../Aplicatie/Navbar'
import Prieteni from '../Prieteni/Prieteni'
import AdaugareAliment from '../Alimente/AdaugareAliment'
import AdaugaPrieten from '../Prieteni/AdaugaPrieten';
import AlimentePrieteni from '../Prieteni/AlimentePrieteni';
import Register from '../Register/Register'
import './LogIn.css'

class LogIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lista: [],
            username: '',
            password: '',
            registerClick: false
        }
    }

    logIn = () => {
        return (
            ReactDOM.render(
                <React.StrictMode>
                    <Router>
                        <Navbar/>
                        <Switch>
                           <Route exact path='/alimente'>
                             <PaginaAlimente username={this.state.username} />
                            </Route>
                           <Route path='/utilizatori'>
                             <Prieteni username={this.state.username} />
                            </Route>
                           <Route path='/adaugare-aliment'>
                             <AdaugareAliment username={this.state.username} />
                            </Route>
                           <Route path='/adaugare-prieten'>
                             <AdaugaPrieten username={this.state.username} />
                            </Route>
                           <Route path='/alimente-prieteni'>
                             <AlimentePrieteni username={this.state.username} />
                            </Route>
                            <Route path='/register'>
                                <Register />
                            </Route>
                         </Switch>
                    </Router>
                </React.StrictMode>,
            document.getElementById('root')
            )
        )
        }

        verificare = () => {
            let ok = false
            for(let user of this.state.lista) {
                if(user.username === this.state.username && user.parola === this.state.password) {
                    ok=true;
                }
            }
            if(ok===true){
                this.logIn();
            } else {
                alert("Username sau parola gresite!")
            }
        }
        
    
       getUtilizatori = async () => {
           let x = await users.getAll()
           this.setState({lista: x})
       }
    
       handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
          })
       }
       
       componentDidMount() {
            this.getUtilizatori()
       }

       render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
        <div className="imageLogo">
            <img src='./Media/logo_foodie.png' width = "50%" height="50%"/>
          </div>
        <div className="contentLogIn">
          <div className="form">
            <div className="form-group">
              <input type="text" className="inputTextLogIn" name="username" placeholder="username" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input type="password" className="inputTextLogIn" name="password" placeholder="password" onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.verificare}>
            LOG IN
          </button>
        </div>
      </div>
        )
    } 
}

export default LogIn