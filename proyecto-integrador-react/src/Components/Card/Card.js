import React, {Component} from "react";
// let FontAwesome = require("react-fontawesome") //Otra forma de realizar lo de la linea de debajo pero con require()
import FontAwesome from "react-fontawesome";
import "./Card.css"

let imagePrefix = "https://image.tmdb.org/t/p/original" //Necesario para poder traer las imagenes de la API

class Card extends Component{
    constructor(props){
        super(props)
        this.state = {
            see: 'plus',
            classSee: false,
            movieDescription: "",
            movieDescriptionBackUp: "",
            seeDescription: false
        }
    }

    componentDidMount(){
        this.descriptionLength()
    }

    descriptionLength(){
        let movie = this.props.movieInfo.overview.length <= 200 ? this.props.movieInfo.overview :
        this.props.movieInfo.overview.substring(0,201) 
        this.setState({
            movieDescription: movie,
            movieDescriptionBackUp: movie //MovieDescriptionBackUp conserva una copia de la descripcion acortada de la pelicula, la cual no se modifica en ningun momento
        })
    }

    seeWholeDescription(){
        if (this.state.seeDescription === false){
            this.setState({
                movieDescription: this.props.movieInfo.overview,
                seeDescription: true
            })
        }else{
            this.setState({
                movieDescription: this.state.movieDescriptionBackUp,
                seeDescription:false
            })
        }
    }

    see() {
        if (this.state.see === 'plus') {
            this.setState({
                see: 'minus',
                classSee: true
            })
        } else {
            this.setState({
                see: 'plus',
                classSee: false
            })
        }
    }

    render(){
        return(
            <article className={this.props.display === 'row' ? "Card-movie-column" : "Card-movie-row"}> {/* Si es row, significa que el CardContainer tiene a las peliculas una al lado de la otra, pero la informacion debajo de cada una debera ir en columna. Si en cambio CardContainer tiene column, las peliculas van una debajo de la otra, pero con la informacion a un lado*/}
                <main>
                    <img src={`${imagePrefix}${this.props.movieInfo.poster_path}`} alt=""/>
                    <h3>{this.props.movieInfo.original_title}</h3>
                   
                    <p className={this.state.classSee === false ? "show" : "hide"}>{this.state.movieDescription} 
                    {this.state.movieDescription.length > 200 ? 
                    <FontAwesome className="readMore" onClick={ () => this.seeWholeDescription() } name="plus"/>                          //If ternario para que el simbolo de leer mas aparezca unicamente en aquellos casos donde es necesario
                    : 
                    ""}
                    </p> 
                    <section className={this.state.classSee === false ? 'hide' : 'show'}>
                        <p>{this.state.movieDescription}</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse qui atque.</p> {/* Aca podemos poner si es para adultos o no nuevamente con iconos*/}
                        <p>Release Date: {this.props.movieInfo.release_date} <FontAwesome name="calendar"/> </p> {/* En este tercer espacio, colocamos lafecha de lanzamiento junto al emote del calendario*/} 
                        <p>Rating: {this.props.movieInfo.vote_aseeage} </p> {/* Podemos poner el puntaje con iconos*/} 
                    </section>
                    
                    <FontAwesome name={this.state.see} className='see' onClick={() => this.see()}/>
                    <FontAwesome name="trash" className="delete" onClick={() => this.props.delete(this.props.movieInfo.id)}/>
                </main>
            </article>
        )
    }
}

export default Card;


