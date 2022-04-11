import React, {Component} from "react";
import './Form.css'

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
        }, ()=>this.props.filterCharacters(this.state.value)
        )
    }

    render(){
        return(
            <form onSubmit={(event)=> this.preventSubmit(event)} action="">
                <input onChange={(event)=> this.controlChanges(event)} type="text" value={this.state.value}/>
            </form>
        )
    }


}
export default Form;