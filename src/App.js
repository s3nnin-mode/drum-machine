import './App.css';
import React from 'react';
import audios from './audios/audios';
import Boton from './componentes/boton';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { updateBtn } from './redux/slices/drumMachine';

function App() {

  const dispatch = useDispatch();

  const estadoBtn = useSelector((state) => state.drumMachine.boton)
  const teclaActual = useSelector((state) => state.drumMachine.currentKey);

  // useEffect(() => {
  //   window.addEventListener("keydown", actualizarTeclaActual);
  //   return () => {
  //     window.removeEventListener("keydown", actualizarTeclaActual);
  //   };
  // }, [dispatch]);

  return (
    <div className="App">
      <div id='drum-machine'>
        <div className='logo-contenedor'>
          <p className='text-fcc'>FCC</p>
          <i className="bi bi-vinyl"></i>
        </div>
        <div className='contenedor-interno'>
          <div className='btns-contenedor'>
            { 
            audios.map((audio) => {
              return <Boton 
              src={audio.src} 
              nombre={audio.nombre} 
              letra={audio.letra} 
              key={audio.letra}
              />
            })
            }
          </div>
          <div className='detalles'>
            <div className='btn-contenedor'>
              <p>power</p>
              <div className='boton' onClick={() => dispatch(updateBtn())}>
                <div className={estadoBtn ? 'cuadro' : 'cuadro-derecha'}></div>
              </div>
            </div>
            <div id='display'>
              { teclaActual }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}