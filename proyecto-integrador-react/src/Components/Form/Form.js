import React, {Component} from "react";
import './Form.css'
import FontAwesome from "react-fontawesome";

class Form extends Component{ 
    constructor(props){
        super(props)
        this.state = {
            value : ''
        }

    }     
     
    //Va a evitar que el formulario se mande 
 
    preventSubmit(event){
        event.preventDefault();
    }

    controlChanges (event){
     
        this.setState({
            value: event.target.value 
            
        }, ()=>this.props.filterMovies(this.state.value)
        )
    }
  
    render(){  
        return(
            <div className="prueba">

            <button type="button" className="buttonsearch"> 
            <FontAwesome name="search"/>
            </button>
        
            <form onSubmit={(event)=> this.preventSubmit(event)} action="">
                <input placeholder="Buscar..." onChange={(event)=> this.controlChanges(event)} type="text" value={this.state.value}/>
            
       
            </form>
            </div>

        )
    } 


}
export default Form;