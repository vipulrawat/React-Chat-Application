import React from 'react';

class UsernameForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        console.log(this.props.onSubmit(this.state.username));
        
    }
    onChange(e){
        this.setState({username:e.target.value});
    }
    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" 
                        placeholder="Username" 
                        onChange={this.onChange}/>
                    <input type="submit"/>
                </form>
             </div>
        )
    }
}

export default UsernameForm;