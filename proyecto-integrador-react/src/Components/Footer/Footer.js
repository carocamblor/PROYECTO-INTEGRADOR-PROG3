import React, {Component} from "react";
import './Footer.css'

class Footer extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <footer>
                <img src="/images/movieDBLogo.svg"/>
                <ul className="footer-team">
                    <li>Pedro Busato</li> {/*Podria cada integrante ser un componente a parte?*/}
                    <li>Carolina Camblor</li>
                    <li>Alejo Cássera</li>
                </ul>
            </footer>
        )
    }
}

export default Footer;