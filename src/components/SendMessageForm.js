import React from 'react';

class SendMessageForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        console.log(this.props.onSubmit(this.state.text));
        
    }
    onChange(e){
        this.setState({text:e.target.value});
        this.props.onChange()
    }
    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" 
                        placeholder="Send Message" 
                        onChange={this.onChange}/>
                    <input type="submit"/>
                </form>
             </div>
        )
    }
}

export default SendMessageForm;