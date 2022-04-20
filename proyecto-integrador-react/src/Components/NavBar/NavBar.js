import React, {Component} from "react";

import "./NavBar.css";

class NavBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            icon:"angle-down",
            seeOrder: false
        }
    }

    seeSearchTools(){
        console.log("Funciona el evento")
        if(this.state.seeOrder === false){
            this.setState({
                icon: "angle-up",
                seeOrder: true  
            })
        }else{
            this.setState({
                icon: "angle-down",
                seeOrder: false
            })
        }
    }

    render(){
        return(
            <nav>
                <img className="wolf-logo" src="/images/logo-wolf-react.png" alt="wolf react logo"/>
             
                
            </nav>
        )
    }

}

export default NavBar;