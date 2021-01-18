import React from 'react'
import './App.css'
import Register from '../Register/Register'
import LogIn from '../LogIn/LogIn';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            isLogginActive: true
        };
    }

   changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }
   
   componentDidMount() {
    this.rightSide.classList.add("right");
   }

    render() {
        const { isLogginActive } = this.state;
        const current = isLogginActive ? "Register" : "LogIn";
        const currentActive = isLogginActive  ? "divLogIn" : "register"
        return (
            <div className="divApp">
                <div class="divLogIn" >
                    <div className="containerLogIn" ref={ref => (this.container = ref)}>
                        {isLogginActive && (
                            <LogIn containerRef = {ref => (this.current = ref)} />
                        )}
                        {!isLogginActive && (
                            <Register containerRef = {ref => (this.current = ref)} />
                        )}
                    </div>
                <RightSide
                    current={current}
                    currentActive={currentActive}
                    containerRef={ref => (this.rightSide = ref)}
                    onClick={this.changeState.bind(this)}
                />
            </div>
        </div>
        )
    }
}

const RightSide = props => {
    return (
      <div
        className="right-side"
        ref={props.containerRef}
        onClick={props.onClick}
      >
        <div className="inner-container">
          <div className="text">{props.current}</div>
        </div>
      </div>
    );
  };

export default App