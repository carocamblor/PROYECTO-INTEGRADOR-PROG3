import React, {Component} from "react";
import Card from "../Card/Card";
import "./CardContainer.css"
import Form from "../Form/Form";
import FontAwesome from "react-fontawesome";

class CardContainer extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            infoApi: [],
            infoApiBKP: [],
            nextPageNumber: 1,  //Inicialmente, estamos en la pagina 1 de peliculas
            pageUrl: "",
            display: "grid",
            display2: "row"
          
        }
    }

    componentDidMount(){
        let apiKey = "10f78e3fda22c77ede57586773891285"
        let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${this.state.pageNumber}`
        fetch(apiUrl)
            .then( response => response.json())
            .then( data => 
                this.setState({
                    infoApi: data.results,
                    infoApiBKP: data.results,
                    pageUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=`,
                    nextPageNumber: parseInt(data.page) + 1  
                })
            )
            .catch( error =>
                console.log(`Error found: ${error}`)    
            )
    }

    componentDidUpdate(){
        
    }

    changeDisplay(){
        if (this.state.display === 'grid') {
            this.setState({
                display: 'full',
            })
        } else {
            this.setState({
                display: 'grid',
            })
        }
    }

    changeDisplay2(){
        if (this.state.display2 === "row") {
            this.setState({
                display2: "column",
            },
            ()=> console.log(this.state.display2))
        } else {
            this.setState({
                display2: "row",
            },
            ()=> console.log(this.state.display2))
        }
    }

    bringMore(){
        let apiUrl = this.state.pageUrl + (this.state.nextPageNumber).toString()
        console.log(apiUrl)
        fetch(apiUrl)
            .then( response => response.json())
            .then( data => this.setState(
                {
                    infoApi: this.state.infoApi.concat(data.results),
                    infoApiBKP : this.state.infoApiBKP.concat(data.result),
                    nextPageNumber: parseInt(data.page) + 1 
                }
            ))
            .catch( error => `El error es ${error}`)
    }

    delete(id){
        let updatedInfo = this.state.infoApi.filter(movie => movie.id !== id);
        this.setState({
            infoApi: updatedInfo
        })
    }   
   
    filterMovies(filtro){
        //se va a encar gar de filtrar lo que escribamos en el buscador para que termine mostrandote unicamente lo que matchea con los personajes
        let peliculasFiltradas = this.state.infoApiBKP.filter( oneMovie => oneMovie.title.toLowerCase().includes(filtro.toLowerCase()))

        this.setState ({
            infoApi : peliculasFiltradas,
        },
        ()=> console.log("Cambie"))
    }

    render(){
        console.log(this.state.infoApi)
        // console.log(this.state.nextPage)
        // console.log(this.state.nextPageNumber)
        return(
            <React.Fragment>
                <Form filterMovies ={(filtrado)=> this.filterMovies(filtrado)}/>
                <button type="button" className="button" onClick={() =>this.bringMore()}>Cargar más tarjetas</button>
                <button type="button" className="button" onClick={() =>this.changeDisplay2()}>
                    <FontAwesome name="bars"/>
                </button>
                {/* <section className={this.state.display2 === "row" ? "card-container-row" : "card-container-column"}>  Teniamos un React.Fragment, pero este no permite recibir el atributo className="" por lo que lo cambiamos */}

                    {
                        this.state.infoApiBKP.length === 0 ?
                        <p>Cargando ... </p> : 
                        this.state.infoApi.length === 0 ?
                        <p>No hay resultados</p> :
                        <section className={this.state.display2 === "row" ? "card-container-row" : "card-container-column"} >
                        {
                        this.state.infoApi.map( (oneMovie, idx) => 
                        <Card key={oneMovie + idx} movieInfo={oneMovie} delete={(id) => this.delete(id)} display={this.state.display2}/> )
                        }
                        </section>
                    }
                {/* </section> */}
            </React.Fragment>
        )
    }
}

export default CardContainer;