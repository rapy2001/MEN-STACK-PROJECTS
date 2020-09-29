import React from "react";
class UserRegisterForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            id:this.props.id,
            username:"",
            password:"",
            userImageUrl:"",
            error:0,
            success:0
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.display=this.display.bind(this);
    }
    handleChange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    display()
    {
        let d=this.props.d;
        setTimeout(function(){
            d(2);
        },3000)
    }
    handleSubmit(event)
    {
        event.preventDefault();
        let newUser={
            id:this.state.id,
            username:this.state.username,
            password:this.state.password,
            userImageUrl:this.state.userImageUrl,
            collections:[]
        }
        let flag=this.props.uRH(newUser);
        if(flag===1)
        {
            this.setState({
                error:1,
                success:0
            });
        }
        else
        {
            this.setState({
                success:1,
                error:0
            },this.display)
        }
    }
    
    render()
    {
        return (
            <div className="register_div log_in_div">
                {this.state.error ? 
                <div className="msg_div_err">
                    <div><i className="fa fa-times-circle"></i></div>
                    <h1>The username already exists, Please change the username</h1>
                </div>: 
                null}
                {this.state.success ? <div className="msg_div_scs"><i className="fa fa-check-circle"></i>< h1>You have Registered Successfully, And will be redirected shortly</h1></div>: null}
                <form onSubmit={this.handleSubmit}>
                    <h3>Register</h3>
                    <input 
                        type="text" 
                        name="username" 
                        value={this.state.username} 
                        onChange={this.handleChange} 
                        placeholder="User Name"
                        autoComplete="off"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        placeholder="Password"
                        autoComplete="off"
                    />
                    <input 
                        type="text" 
                        name="userImageUrl" 
                        value={this.state.userImageUrl} 
                        onChange={this.handleChange} 
                        placeholder="Image Url"
                        autoComplete="off"
                    />
                    <button type="submit">Register</button>
                </form>
                {/* {this.state.error ? <h1>The username already exists,Please change the username</h1>: null}
                {this.state.success ? <div><h1>You have Registered Successfully</h1><h2>And will be redirected shortly</h2></div>: null}
                {this.state.username + this.state.password +this.state.userImageUrl} */}
        </div>
        )
    }
}
export default UserRegisterForm;