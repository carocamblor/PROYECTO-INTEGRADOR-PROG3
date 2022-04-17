import React, {Component} from "react";
import FontAwesome from "react-fontawesome";
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
                <section>
                <FontAwesome onClick={() => this.seeSearchTools()} className="angle-icon" name={this.state.icon}/>
                    <div className={this.state.seeOrder === false ? "hide" : "show"}>
                        <h3>Order by:</h3>
                        <ul>
                            <li>Most Recent</li>
                        </ul>
                    </div>    
                </section>
                
            </nav>
        )
    }

}

export default NavBar;