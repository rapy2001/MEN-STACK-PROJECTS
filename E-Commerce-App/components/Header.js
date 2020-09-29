import React from "react";
class  Header extends React.Component
{
    constructor()
    {
        super();
        this.state={};
        this.display=this.display.bind(this);
    }
    display()
    {
        this.props.d(1);
    }
    render()
    {
        return (
            <div className="header">
                <h2>Smart Point</h2>
                <button type="submit" onClick={this.display}>Add a Phone</button>
            </div>
        )
    }
   
}
export default Header;