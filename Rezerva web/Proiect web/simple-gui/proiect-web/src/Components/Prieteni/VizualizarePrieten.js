import React, {Component} from 'react';
import "./VizualizarePrieten.css";

class VizualizarePrieten extends Component{
    render(props) {
        return(
            <div className="content">
                <input type="image" src= "Media/prieten_icon.png" width="100" height="100"/>
                <div className="divtext">{this.props.numeprieten}</div>
                <div className="divCaracteristica">#{this.props.caracteristica}</div> 
            </div>
        )
    }
}

export default VizualizarePrieten