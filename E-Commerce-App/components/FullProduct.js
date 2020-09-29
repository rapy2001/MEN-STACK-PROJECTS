import React from "react";
class FullProduct extends React.Component
{
    constructor(props)
    {
        super(props);
        this.display=this.display.bind(this);
        this.Display=this.Display.bind(this);
    }
    display()
    {
        this.props.d(2);
    }
    Display()
    {
        this.props.d(3,this.props.item);
        this.props.D(this.props.item);
    }
    render()
    {
        return (
            <div className="full_product_div">
                <div className="full_product_div_1">
                    <img src={this.props.item.image} alt="error" />
                </div>
                <div className="full_product_div_2">
                    <h1>{this.props.item.ProductName}</h1>
                    <h2> $ {this.props.item.price}</h2>
                    <p>
                        {this.props.item.description}
                    </p>
                    <button type="submit" onClick={this.Display}> <i className="fa fa-plus"></i> Add to Cart</button>
                    <button onClick={this.display}>View All Products</button>
                </div>
            </div>
        )
    }
}
export default FullProduct;