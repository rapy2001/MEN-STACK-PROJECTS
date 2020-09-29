import React from "react";
class Product extends React.Component
{
    constructor()
    {
        super();
        this.state={}
        this.display=this.display.bind(this);
        this.description=this.description.bind(this);
    }
    display()
    {
        this.props.d(3,this.props.product);
        this.props.D(this.props.product);
    }
    description()
    {
        this.props.d(6,this.props.product)
    }
    render()
    {
        return (
            <div className="product">
                <img src={this.props.product.image} alt="error" />
                <h3> {this.props.product.ProductName}</h3>
                <h3>Price: $ {this.props.product.price}</h3>
                {/* <p>{this.props.product.description}</p> */}
                <div className="product_button_div">
                    <button type="submit" onClick={this.display}> <i className="fa fa-plus"></i> Add to Cart</button>
                    <button type="submit" onClick={this.description}> Learn More </button>
                </div>
            </div>
        )
        
    }
}
export default Product;