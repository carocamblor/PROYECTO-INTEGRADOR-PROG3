import React, {Component} from "react";

class Footer extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <footer>
                <ul className="team">
                    <li>Nombre integrante 1</li> {/*Podria cada integrante ser un componente a parte?*/}
                    <li>Nombre integrante 2</li>
                    <li>Nombre integrante 3</li>
                </ul>
            </footer>
        )
    }
}

export default Footer;