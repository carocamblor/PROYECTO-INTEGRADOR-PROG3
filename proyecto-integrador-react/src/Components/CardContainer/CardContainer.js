import React, {Component} from "react";
import Card from "../Card/Card";
import "./CardContainer.css"

class CardContainer extends Component{
    
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        console.log(this.props)
        return(
            <section className={this.props.display === "row" ? "card-container-row" : "card-container-column"}>
                {this.props.infoApiRender.map( (oneMovie, idx) => 
                <Card key={oneMovie.title + idx} movieInfo={oneMovie} delete={(id) => this.props.delete(id)} display={this.props.display}/>)}
            </section>
        )
    }
}

export default CardContainer