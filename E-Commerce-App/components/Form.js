import React from "react";
class Form extends React.Component
{
    constructor()
    {
        super();
        this.state={
            ProductName:"",
            image:"",
            price:0,
            description:"",
            id:0
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
    handleSubmit(event)
    {
        event.preventDefault();
        this.setState({
            id:this.props.id
        },function(){
            this.props.UD(this.state);
            this.props.d(2);
        });
        
    }
    display()
    {
        this.props.d(2);
    }
    render()
    {
        return (
            <div className="form_div">
                <form onSubmit={this.handleSubmit} className="form">
                    <h2>Phone details</h2>
                    <h3>Enter the following details</h3>
                    <input 
                        type="text" 
                        placeholder="Product Name" 
                        value={this.state.ProductName}
                        name="ProductName" 
                        onChange={this.handleChange} 
                        autocomplete="off"
                    />
                    <input 
                        type="text" 
                        placeholder="Image Url" 
                        value={this.state.image} 
                        name="image" 
                        onChange={this.handleChange} 
                        autocomplete="off"
                    />
                    <input 
                        type="number"
                        placeholder=" Price"
                        name="price" 
                        value={this.state.price} 
                        onChange={this.handleChange}
                        min="0"
                        autocomplete="off"
                    />
                    <textarea 
                        value={this.state.description} 
                        placeholder="Descripton of Item" 
                        name="description" 
                        onChange={this.handleChange}
                        autocomplete="off"
                    >
                    </textarea>
                    <button type="submit">Submit</button>
                    <button type="submit" onClick={this.display} id="form_button_2">View All Products</button>
                </form>
                {/* {this.state.ProductName}
                {this.state.image}
                {this.state.price}
                {this.state.description} */}
            </div>
        )
    }
}
export default Form;