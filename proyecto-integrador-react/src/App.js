import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import CardContainer from "./Components/CardContainer/CardContainer";
import Footer from "./Components/Footer/Footer";
import './App.css'

function App() {
  return (
    <React.Fragment>
      <header>
        <h1>Título/ Nombre de la app</h1>
        <NavBar/>
      </header>
      <main>
        <CardContainer/>
      </main>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
