import React, {Component} from "react";
import Form from '../Form/Form'
import "./Header.css";

class NavBar extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <header>
                <img className="wolf-logo" src="/images/logo-wolf-react.png" alt="wolf react logo"/>
                <Form filterMovies={(filtrado) => this.props.filterMovies(filtrado)}/>
            </header>
        )
    }

}

export default NavBar;