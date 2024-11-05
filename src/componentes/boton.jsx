import React from "react";
import audios from "../audios/audios";
import '../stylesheet/boton.css';

import { connect } from "react-redux";
import { showCurrentKey } from "../redux/slices/drumMachine";

class Boton extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) { 
    if (this.props.drumMachine.boton) {
      const index = audios.findIndex(item => item.letra === e.key.toUpperCase());
      if (index > -1 && audios[index] !== undefined) {
        this.efectoClick(audios[index].letra)
        this.props.actualizarTecla(audios[index].nombre)
        const audioElement = document.getElementById(audios[index].letra);
        if (audioElement.paused) {
          this.reproducir(audios[index].letra);
        }
      }
    }
  }

  efectoClick(id) {
    const audioElemento = document.getElementById(id);
    const contenedorElemento = audioElemento.closest('div');
    contenedorElemento.classList.add('color-efecto');
     setTimeout(() => {
       contenedorElemento.classList.remove('color-efecto')
     }, 110)
  }

  handleClick() {
    if (this.props.drumMachine.boton) {      
      this.efectoClick(this.props.letra)
      this.props.actualizarTecla(this.props.nombre)
      this.reproducir(this.props.letra);
    }
  }

  reproducir(id) {
    const audioElement = document.getElementById(id);
    const playPromise = audioElement.play();
    console.log(audioElement)

    if (playPromise !== undefined) {
      audioElement.currentTime = 0;
      playPromise.then(() => {
        console.log('playing...')
      }).catch(error => {
        console.log(error)
      })
    }
  }

  render() {
    return (
      <div 
      className='drum-pad' 
      id={this.props.nombre} 
      onClick={() => this.handleClick()} 
      >
        <audio 
        id={this.props.letra} 
        src={this.props.src} 
        className="clip" 
        />
        {this.props.letra}
      </div>
    )  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actualizarTecla: (nombre) => {
      dispatch(showCurrentKey(nombre))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    drumMachine: state.drumMachine
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boton);