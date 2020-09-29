import React from "react";
class ProductChosen extends React.Component
{
    constructor()
    {
        super();
        this.state={
        }
        this.display=this.display.bind(this);
        this.Display=this.Display.bind(this);
    }
    display()
    {
        this.props.d(4);
    }
    Display()
    {
        this.props.d(5);
    }
    render()
    {
        return (
            <div className="product_chosen_div">
                <h4>Item added to Cart</h4>
                <div className="product_chosen_box">
                    <img src={this.props.item.image} alt="error"/>
                    <h3>{this.props.item.ProductName}</h3>
                    <h3>Price: $ {this.props.item.price}</h3>
                    <div>
                        <button type="submit" onClick={ this.display}>
                            Continue Shopping
                        </button>
                        <button type="submit" onClick={this.Display}>
                            Go to Cart
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductChosen;