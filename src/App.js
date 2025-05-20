import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const mainDiv = useRef(null)

  useEffect(() => {
    if (counter % 2 === 0) {
      mainDiv.current.classList.add("screen_light");
      mainDiv.current.classList.remove("screen_dark");
    } else {
      mainDiv.current.classList.add("screen_dark");
      mainDiv.current.classList.remove("screen_light");
    }
  }, [counter]);
  return (
    <div className="App" id="main" ref={mainDiv}>
      <h1>¡Universidad Católica de Pereira !</h1>
      <p>Listado de integrantes - Proceso de Desarrollo de Software I</p>
      <p>José Nicolás Aristizabal Ramirez </p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        incrementar visitas al sitio web
      </button>
      <span style={{ display: "block", margin: "5px" }}>{counter}</span>
    </div>
  );
}
export default App;
