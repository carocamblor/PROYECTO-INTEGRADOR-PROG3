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
            infoApi2: [],
            infoApi: [],
            infoApiBKP: [],
            first20movies: [], //Aqui almacenamos nuestras primeras 20 peliculas --> Util para la ejecucion del metodo resetCards
            display: "row"
        }
    }

    componentDidMount(){
        let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=1`
        fetch(apiUrl)
            .then( response => response.json())
            .then( data => 
                this.setState({
                    infoApi: data.results,
                    infoApi2: data.results,
                    infoApiBKP: data.results,
                    first20movies: data.results,
                    nextPageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=${parseInt(data.page) + 1}`,
                })
            )
            .catch( error =>
                console.log(`Error found: ${error}`)    
            )
    }

    componentDidUpdate(){   
    }

    // Metodo para traer mas tarjetas
    bringMore(){
        let apiUrl = this.state.nextPageUrl
        fetch(apiUrl)
            .then( response => response.json())
            .then( data => this.setState(
                {
                    infoApi: this.state.infoApi.concat(data.results),
                    infoApi2: this.state.infoApi2.concat(data.results),
                    infoApiBKP : this.state.infoApiBKP.concat(data.results),
                    nextPageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=${parseInt(data.page) + 1}`,
                }
            ))
            .catch( error => `El error es ${error}`)
    }

    // Metodo para resetear nuestras tarjetas --> Volvemos a las 20 originales
    resetCards(){
        this.setState({
            infoApi: this.state.first20movies,
            infoApi2: this.state.first20movies,
            nextPageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=2` //Reseteamos para que el bringMore comienza desde la segunda pagina nuevamente
        })
    }

    // Metodo para eliminar tarjeta --> Pasamos como props al componente Card.js
    delete(id){
        let updatedInfo = this.state.infoApi.filter(movie => movie.id !== id);
        this.setState({
            infoApi: updatedInfo,
            infoApi2: updatedInfo
        })
    }   
   
    // Metodo para filtrar peliculas --> Pasamos como props al componente Form.js
    filterMovies(filtro){
        // console.log(filtro)
        let peliculasFiltradas = this.state.infoApi2.filter( oneMovie => oneMovie.title.toLowerCase().includes(filtro.toLowerCase()))

        this.setState ({
            infoApi : peliculasFiltradas,
        },
        ()=> console.log("Cambie"))
    }

    changeDisplay(){
        if (this.state.display === "row") {
            this.setState({
                display: "column",
            },
            ()=> console.log(this.state.display))
        } else {
            this.setState({
                display: "row",
            },
            ()=> console.log(this.state.display))
        }
    }

    render(){
        // console.log(this.state.infoApiBKP)
        return(
            <React.Fragment>
                <section className="interactions">
                <Form filterMovies ={(filtrado)=> this.filterMovies(filtrado)}/>
                <button type="button" className="button" onClick={() =>this.bringMore()}>Cargar más tarjetas</button>
                <button type="button" className="button" onClick={() => this.resetCards()}>Tarjetas Iniciales</button>
                <button type="button" className="button" id="button-display" onClick={() =>this.changeDisplay()}>
                    {
                        this.state.display === "row" ?
                        <FontAwesome name="bars"/> :
                        <FontAwesome name="table"/>
                    }
                    
                </button>
                </section>
                {/* <section className={this.state.display === "row" ? "card-container-row" : "card-container-column"}>  Teniamos un React.Fragment, pero este no permite recibir el atributo className="" por lo que lo cambiamos */}

                    {
                        this.state.infoApiBKP.length === 0 ?
                        <p>Cargando ... </p> : 
                        this.state.infoApi.length === 0 ?
                        <p>No hay resultados</p> :
                        <section className={this.state.display === "row" ? "card-container-row" : "card-container-column"} >
                        {
                        this.state.infoApi.map( (oneMovie, idx) => 
                        <Card key={oneMovie.title + idx} movieInfo={oneMovie} delete={(id) => this.delete(id)} display={this.state.display}/> )
                        }
                        </section>
                    }
                {/* </section> */}
            </React.Fragment>
        )
    }
}

export default CardContainer;