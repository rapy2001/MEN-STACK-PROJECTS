import React from "react";
class LogIn extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            username:"",
            password:"",
            passwordError:false,
            notRegistered:false,
            success:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.redirect=this.redirect.bind(this);
    }
    redirect()
    {
        let d=this.props.d;
        setTimeout(function(){
            d(2);
        },2000)
    }
    handleChange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    handleSubmit(event)
    {
        event.preventDefault();
        let user={
            username:this.state.username,
            password:this.state.password
        }
        let flag=this.props.hLI(user);
        if(flag===1)
        {
            this.setState({
                notRegistered:false,
                passwordError:false,
                success:true
            },this.redirect);
        }
        else if(flag===2)
        {
            this.setState({
                notRegistered:false,
                passwordError:true,
                success:false
            });
        }
        else{
            this.setState({
                notRegistered:true,
                passwordError:false,
                success:false
            });
        }
    }
    render()
    {
        return (
            <div className="log_in_div">
                {this.state.notRegistered ? 
                <div className="msg_div_err">
                    <div><i className="fa fa-times-circle"></i></div>
                    <h1>User is not registered ! Please Register as a new user</h1>
                </div>: 
                null}
                {this.state.passwordError ? 
                <div className="msg_div_err">
                    <div><i className="fa fa-times-circle"></i></div>
                    <h1>UWrong Password ! Please enter password again</h1>
                </div>: 
                null}
                {this.state.success ? <div className="msg_div_scs"><i className="fa fa-check-circle"></i>< h1>You have Logged in Successfully ! And will be redirected to All Movies Page Shortly</h1></div>: null}
                <form onSubmit={this.handleSubmit}>
                    <h3>Log In</h3>
                    <input 
                        type="text" 
                        name="username" 
                        value={this.state.username} 
                        placeholder="Your Username"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        placeholder="Your password"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <button type="submit" className="base_button">Log In</button>
                </form>
                {/* {this.state.notRegistered ? <h1>User is not registered ! Please Register as a new user</h1> : null}
                {this.state.passwordError ? <h1>Wrong Password ! Please enter password again</h1> : null}
                {this.state.success ? <h1>You have Logged in Successfully ! And will be redirected to All Movies Page Shortly</h1> : null} */}
            </div>
        )
    }
}
export default LogIn;