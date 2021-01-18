import React, {Component} from 'react';
import "./Aliment.css";

class Aliment extends Component{

    render(props) {
        return (
        <div className="aliment">
            <div className="details">
                <div>Denumire: <span>{this.props.denumire}</span></div>
                <div>Producator: <span>{this.props.producator}</span></div>
                <div>Calorii: <span>{this.props.calorii}</span></div>
                <div>Vegan: <span>{this.props.vegan}</span></div>
                <div>Data Expirare: <span>{this.props.dataExpirare}</span></div>
                <div>Disponibil: <span>{this.props.disponibil}</span></div>
            </div>
        </div>
        )
    }
}

export default Aliment;