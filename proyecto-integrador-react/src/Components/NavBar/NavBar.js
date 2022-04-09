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
                {/* <form action="">
                    <input type="text" name="search" id="" placeholder="Search"/>
                    <button type="submit"><i className="fas fa-search"></i></button>
                </form> */}
            </nav>
        )
    }

}

export default NavBar;