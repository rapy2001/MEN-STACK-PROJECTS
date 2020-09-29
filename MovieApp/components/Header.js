import React from "react";
class Header extends React.Component
{
    constructor(props)
    {
        super(props);
        this.display=this.display.bind(this);
        this.Display=this.Display.bind(this);
        this.displayAll=this.displayAll.bind(this);
        this.displayLog=this.displayLog.bind(this);
        this.logout=this.logout.bind(this);
        this.dashboard=this.dashboard.bind(this);
    }
    display()
    {
        this.props.d(1);
    }
    Display()
    {
        this.props.d(5);
    }
    displayAll()
    {
        this.props.d(6);
    }
    displayLog()
    {
        this.props.d(7);
    }
    logout()
    {
        this.props.logout();
    }
    dashboard()
    {
        this.props.d(8);
    }
    render()
    {
        return(
            <div className="nav">
                {/* {console.log(this.props.ili)} */}
                <div className="nav_box_1">
                    <img src="https://cdn.dribbble.com/users/1592748/screenshots/3811794/drive_in_popcorn.jpg" alt="error"/>
                    <button onClick={this.displayAll} className="base_button title">Popcorn in the Box</button>
                </div>
                <div className="nav_box_2">
                    <button type="submit" onClick={this.Display} className="base_button">Register</button>
                    {this.props.ili ? null :<button type="submit" onClick={this.displayLog} className="base_button">LogIn</button>}
                    {this.props.ili ? <button type="submit" onClick={this.logout} className="base_button">Log Out</button>:null}
                    {this.props.ili ? <button type="submit" onClick={this.dashboard} className="base_button">Dashboard</button>:null}
                    <button onClick={this.display} className="base_button">Add a Movie</button>
                </div>
            </div>
        )
    }
}
export default Header;