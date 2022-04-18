import React, {Component} from "react";
import Card from "../Card/Card";
import "./CardContainer.css"
import Form from "../Form/Form";
import FontAwesome from "react-fontawesome";

class CardContainer extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            apiKey: "10f78e3fda22c77ede57586773891285",
            nextPageUrl: "",
            infoApiBKP: [], // Tiene toda la info, pero se actualiza cuando borramos tarjetas
            infoApiRender: [], // Lo que renderizamos
            infoApiFullBKP: [], // Tiene toda la info que le pedimos a la API, nunca se borra nada
            first20movies: [], // Almacena las primeras 20 peliculas --> Util para la ejecucion del metodo resetCards
            display: "row"
        }
    }

    componentDidMount(){
        let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=1`
        fetch(apiUrl)
            .then( response => response.json())
            .then( data => 
                this.setState({
                    infoApiRender: data.results,
                    infoApiBKP: data.results,
                    infoApiFullBKP: data.results,
                    first20movies: data.results,
                    nextPageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=${parseInt(data.page) + 1}`,
                })
            )
            .catch( error => console.log(`Error found: ${error}`))
    }

    // Método para traer mas tarjetas
    bringMore(){
        let apiUrl = this.state.nextPageUrl
        fetch(apiUrl)
            .then( response => response.json())
            .then( data => this.setState(
                {
                    infoApiRender: this.state.infoApiRender.concat(data.results),
                    infoApiBKP: this.state.infoApiBKP.concat(data.results),
                    infoApiFullBKP : this.state.infoApiFullBKP.concat(data.results),
                    nextPageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=${parseInt(data.page) + 1}`,
                }
            ))
            .catch(error => console.log(`El error es ${error}`))
    }

    // Método para resetear nuestras tarjetas --> Volvemos a las 20 originales
    resetCards(){
        this.setState({
            infoApiRender: this.state.first20movies,
            infoApiBKP: this.state.first20movies,
            nextPageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=2` //Reseteamos para que el bringMore comienza desde la segunda pagina nuevamente
        })
    }

    // Método para eliminar tarjeta --> Se lo pasamos como props al componente Card.js
    delete(id){
        let infoApiRenderUpdated = this.state.infoApiRender.filter(movie => movie.id !== id);
        let infoApiBKPUpdated = this.state.infoApiBKP.filter(movie => movie.id !== id);
        this.setState({
            infoApiRender: infoApiRenderUpdated,
            infoApiBKP: infoApiBKPUpdated
        })
    }   
   
    // Método para filtrar peliculas --> Se lo pasamos como props al componente Form.js
    filterMovies(filtro){
        let peliculasFiltradas = this.state.infoApiBKP.filter( oneMovie => oneMovie.title.toLowerCase().includes(filtro.toLowerCase()));
        this.setState ({
            infoApiRender: peliculasFiltradas,
        })
    }

    // Método para cambiar la tarjetas de filas a una sola columna
    changeDisplay(){
        if (this.state.display === "row") {
            this.setState({
                display: "column",
            })
        } else {
            this.setState({
                display: "row",
            })
        }
    }

    render(){
        return(
            <React.Fragment>
                
                <section className="interactions">

                <Form filterMovies ={(filtrado)=> this.filterMovies(filtrado)}/>

                <button type="button" className="button" onClick={() =>this.bringMore()}>Cargar más tarjetas</button>
                <button type="button" className="button" onClick={() => this.resetCards()}>Tarjetas Iniciales</button>

                <button type="button" className="button" id="button-display" onClick={() =>this.changeDisplay()}>
                {this.state.display === "row" ?
                <FontAwesome name="bars"/> :
                <FontAwesome name="table"/>}
                </button>

                </section>

                {this.state.infoApiFullBKP.length === 0 ?
                <p>Cargando... </p> :

                this.state.infoApiRender.length === 0 ?
                <p>No hay resultados</p> :

                <section className={this.state.display === "row" ? "card-container-row" : "card-container-column"}>
                {this.state.infoApiRender.map( (oneMovie, idx) => 
                <Card key={oneMovie.title + idx} movieInfo={oneMovie} delete={(id) => this.delete(id)} display={this.state.display}/>)}
                </section>
                
                }

            </React.Fragment>
        )
    }
}

export default CardContainer;