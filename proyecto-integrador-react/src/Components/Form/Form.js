import React, {Component} from "react";

class Form extends Component{ 
    constructor(props){
        super(props)
        this.state = {
            value : ''
        }

    }
    preventSubmit(event){
        event.preventDefault();
    }
    controlChanges (event){
        this.setState({
            value: event.target.value 
        },()=>console.log(this.state.value)
        )
    }

    render(){
        return(
            <form onSubmit={(event)=> this.preventSubmit(event)} action="">
                <input onChange={(event)=> this.controlChanges(event)} type="text" name="search" id="" placeholder="Search"/>
                <button type="submit"><i className="fas fa-search"></i></button>
            </form>
        )
    }


}
export default Form;