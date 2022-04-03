import React, {Component} from "react";
import Card from "../Card/Card";


class CardContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            infoApi: [],
            nextPage: ""
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
                    nextPage: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${data.page + 1}`
                })
            )
            .catch( error =>
                console.log(`Error found: ${error}`)    
            )
    }

    componentDidUpdate(){
 
    }

    seeMore(){
        //Metodo asociado al mouseOver que permitira ver la descripcion de la pelicula al pararnos sobre ella
    }

    delete(id){
        let updatedInfo = this.state.infoApi.filter(movie => movie.id !== id);
        this.setState({
            infoApi: updatedInfo
        })
    }

    render(){
        console.log(this.state.infoApi)
        console.log(this.state.nextPage)
        return(
            <section className="card-container">
                {
                this.state.infoApi.map( (oneMovie, idx) => 
                <Card key={oneMovie + idx} movieInfo={oneMovie} delete={(id) => this.delete(id)}/> )
                }
            </section>
        )
    }
}

export default CardContainer;