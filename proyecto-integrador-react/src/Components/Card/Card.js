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
            // seeDescription: false,
            // shortDescription: '',
            // audience: ''
        }
    }

    componentDidMount(){
        // this.descriptionLength();
        this.audience();

    }

    shortDescription(overview){ //Lo lleve a un if ternario
        let shortDescription = (overview.length >= 50) ?
            overview.substring(0,99) + '...' :
            overview
        return shortDescription
    }

    // audience(){
    //     if(this.props.movieInfo.adult === true) {
    //         this.setState({
    //             audience: '+18'
    //         })
    //     } else {
    //         this.setState({
    //             audience: 'Everyone'
    //         })
    //     }
    // }

    audience(forAdult){
        let viewersAge = (forAdult === false) ?
             "Everyone" :
             "+18"
        return viewersAge
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
        // console.log(this.shortDescription(this.props.movieInfo.overview))
        return(
            <article className={this.props.display === 'row' ? "card-movie-grid" : "card-movie-row"}> {/* Si es row, significa que el CardContainer tiene a las peliculas una al lado de la otra, pero la informacion debajo de cada una debera ir en columna. Si en cambio CardContainer tiene column, las peliculas van una debajo de la otra, pero con la informacion a un lado*/}
                <main className={this.props.display === 'row' ? "" : "main-column"}>
                    <img src={`${imagePrefix}${this.props.movieInfo.poster_path}`} alt=""/>
                    <div className={this.props.display === 'row' ? "" : "div-column"}>
                        <h3>{this.props.movieInfo.title}</h3>
                        <p> 
                            {
                            this.state.classSee === false ?
                            this.shortDescription(this.props.movieInfo.overview) :
                            ""
                            }
                        </p>
                        <section className={this.state.classSee === false ? 'hide' : 'show'}>
                            <p>{this.props.movieInfo.overview}</p>
                            <p>Audience: {this.audience(this.props.movieInfo.adult)}</p> 
                            <p>Release Date: {this.props.movieInfo.release_date} <FontAwesome name="calendar"/> </p> 
                            <p>Rating: {this.props.movieInfo.vote_average} </p> 
                        </section>
                        
                        <FontAwesome name={this.state.see} className='see' onClick={() => this.see()}/>
                        <FontAwesome name="trash" className="delete" onClick={() => this.props.delete(this.props.movieInfo.id)}/>
                    </div>
                </main>
            </article>
        )
    }
}

export default Card;


