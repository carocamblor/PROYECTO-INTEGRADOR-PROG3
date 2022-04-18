import React, {Component} from "react";
import FontAwesome from "react-fontawesome";
import "./Card.css"

let imagePrefix = "https://image.tmdb.org/t/p/original" // Necesario para poder traer las imagenes de la API

class Card extends Component {

    constructor(props){
        super(props)
        this.state = {
            see: 'plus',
            classSee: false,
        }
    }

    // Para acortar las descripciones largas
    shortDescription(overview){
        let shortDescription = (overview.length >= 50) ?
            overview.substring(0,99) + '...' :
            overview
        return shortDescription
    }

    // Para determinar si la audiencia es +18 o ATP
    audience(forAdult){
        let viewersAge = (forAdult === false) ?
             "Everyone" :
             "+18"
        return viewersAge
    }

    // Para cambiar el estado de ver más
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

            <article className={this.props.display === 'row' ? "card-movie-row" : "card-movie-column"}>
                                    
                    <img src={`${imagePrefix}${this.props.movieInfo.poster_path}`} alt={this.props.movieInfo.title}/>
                    
                    <div className={this.props.display === 'row' ? "" : "div-column"}>

                        <h3>{this.props.movieInfo.title}</h3>

                        <p> 
                        {this.state.classSee === false ?
                        this.shortDescription(this.props.movieInfo.overview) :
                        ""}
                        </p>

                        <section className={this.state.classSee === false ? 'hide' : 'show'}>
                            <p>{this.props.movieInfo.overview}</p>
                            <p>Audience: {this.audience(this.props.movieInfo.adult)}</p> 
                            <p>Release Date: {this.props.movieInfo.release_date} <FontAwesome name="calendar"/></p> 
                            <p>Rating: {this.props.movieInfo.vote_average}</p> 
                        </section>
                        
                        <FontAwesome name={this.state.see} className='see' onClick={() => this.see()}/>
                        
                        <FontAwesome name="trash" className="delete" onClick={() => this.props.delete(this.props.movieInfo.id)}/>
                    
                    </div>

            </article>
        )
    }
}

export default Card;


