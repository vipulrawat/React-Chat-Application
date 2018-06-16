import React from 'react';
import '..//styles/main.css'
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
            <div className="mainPage">
              <div className="usernameForm">
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                        placeholder="Choose your username"
                        onChange={this.onChange} className="textInput"/>
                      <input type="submit" value="Enter" className="submitInput" />
                </form>
                </div>
             </div>
        )
    }
}

export default UsernameForm;
