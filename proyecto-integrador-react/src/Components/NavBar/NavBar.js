import React, {Component} from "react";

class NavBar extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <nav>
                <i className="fas fa-th"></i>
                <i className="fas fa-align-justify"></i>
             
            </nav>
        )
    }

}

export default NavBar;