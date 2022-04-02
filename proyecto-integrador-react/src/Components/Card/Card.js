import React, {Component} from "react";
// let FontAwesome = require("react-fontawesome") //Otra forma de realizar lo de la linea de debajo pero con require()
import FontAwesome from "react-fontawesome";
import "./Card.css"

let imagePrefix = "https://image.tmdb.org/t/p/original" //Necesario para poder traer las imagenes de la API

class Card extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <article className="Card-movie">
                <main>
                    <img src={`${imagePrefix}${this.props.movieInfo.poster_path}`} alt=""/>
                    <h3>{this.props.movieInfo.original_title}</h3>
                    <p className="description">{this.props.movieInfo.overview}</p>
                    <section className="aditional-info">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse qui atque.</p> {/* Aca podemos poner si es para adultos o no nuevamente con iconos*/}
                        <p>Release Date: {this.props.movieInfo.release_date} <FontAwesome name="calendar"/> </p> {/* En este tercer espacio, colocamos la fecha de lanzamiento junto al emote del calendario*/} 
                        <p> Rating: {this.props.movieInfo.vote_average} </p> {/* Podemos poner el puntaje con iconos*/} 
                    </section>
                    {/* <a href="#">Ver más</a> */}
                </main>
            </article>
        )
    }
}

export default Card;


