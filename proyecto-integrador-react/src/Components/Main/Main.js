import React, {Component} from "react";
import "./Main.css"
import Header from "../Header/Header"
import CardContainer from "../CardContainer/CardContainer";
import FontAwesome from "react-fontawesome";

class Main extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            apiKey: "10f78e3fda22c77ede57586773891285",
            nextPageUrl: "",
            infoApiBKP: [], // Tiene toda la info, pero se actualiza cuando borramos tarjetas
            infoApiRender: [], // Lo que renderizamos
            infoApiFullBKP: [], // Tiene toda la info que le pedimos a la API, nunca se borra nada
            first10movies: [], // Almacena las primeras 20 peliculas --> Util para la ejecucion del metodo resetCards
            display: "row",
            apiCallCount: 0
        }
    }

    componentDidMount(){
        let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=1`
        fetch(apiUrl)
            .then( response => response.json())
            .then( data => {
                let infoApi = data.results.slice(0,10);
                this.setState({
                    infoApiRender: infoApi,
                    infoApiBKP: infoApi,
                    infoApiFullBKP: infoApi,
                    first10movies: infoApi,
                    apiCallCount: 1,
                    nextPageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=${data.page}`,
                })}
            )
            .catch( error => console.log(`Error found: ${error}`))
    }

    // Método para traer ***DIEZ*** (10) PELICULAS MÁS (dependiendo de si apiCallCount es par o impar)
    bringMore(){
        let num = this.state.apiCallCount + 1;
        this.setState({
            apiCallCount: num
        }, () => {
                fetch(this.state.nextPageUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (this.state.apiCallCount % 2 === 0) {
                            let info = data.results.slice(10,21);
                            this.setState({
                                infoApiRender: this.state.infoApiRender.concat(info),
                                infoApiBKP: this.state.infoApiBKP.concat(info),
                                infoApiFullBKP : this.state.infoApiFullBKP.concat(info),
                                nextPageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=${parseInt(data.page) + 1}`,
                            })
                        } else {
                            let info = data.results.slice(0,10);
                            this.setState({
                                infoApiRender: this.state.infoApiRender.concat(info),
                                infoApiBKP: this.state.infoApiBKP.concat(info),
                                infoApiFullBKP : this.state.infoApiFullBKP.concat(info),
                                nextPageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=${data.page}`,
                            })
                        }
                    })
                    .catch(e => console.log(e))     
        })
    }

    // Método para resetear nuestras tarjetas --> Volvemos a las 10 originales
    resetCards(){
        this.setState({
            infoApiRender: this.state.first10movies,
            infoApiBKP: this.state.first10movies,
            nextPageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.apiKey}&language=en-US&page=1`, //Reseteamos para que el bringMore comienza desde la primera pagina nuevamente
            apiCallCount: 1
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

                {/* HEADER CON LOGO + BUSCADOR */}

                <Header filterMovies={(filtrado) => this.filterMovies(filtrado)}/>
                
                {/* INTERACCIONES MÁS TARJETAS, RESET Y CAMBIAR ORIENTACIÓN TARJETAS */}

                <section className="interactions">

                <button type="button" className="button" onClick={() =>this.bringMore()}>Cargar más tarjetas</button>
                <button type="button" className="button" onClick={() => this.resetCards()}>Tarjetas Iniciales</button>

                <button type="button" className="button" id="button-display" onClick={() =>this.changeDisplay()}>
                {this.state.display === "row" ?
                <FontAwesome name="bars"/> :
                <FontAwesome name="table"/>}
                </button>

                </section>

                {/* TARJETAS */}

                {this.state.infoApiFullBKP.length === 0 ?
                <img className= "gif" src="/images/cargando1.gif" alt="tmbd logo"/> :

                this.state.infoApiRender.length === 0 ?
                <img className="gif" src="/images/insomnia.gif" alt="tmbd logo"/> :

                <CardContainer display={this.state.display} infoApiRender={this.state.infoApiRender} delete={(id) => this.delete(id)}/>
                }

            </React.Fragment>
        )
    }
}

export default Main;