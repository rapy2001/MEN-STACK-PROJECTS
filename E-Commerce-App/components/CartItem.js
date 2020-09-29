import React from "react";
class CartItem extends React.Component
{
    constructor()
    {
        super();
        this.state={
            
        }
        this.handleQuantity=this.handleQuantity.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }
    componentDidMount()
    {
        this.setState({
            item:this.props.item.item,
            quantity:this.props.item.quantity
        })
    }
    handleQuantity(event)
    {
        let val=this.state.quantity+1;
        if(event.target.innerHTML==="+")
            val=this.state.quantity+1;
        else
            val=this.state.quantity-1;
        // console.log("inside cart item",val,this.state);
        this.setState({
            quantity:val
        },function(){
            this.props.u(this.state);
        });
    }
    handleDelete()
    {
        this.setState({
            quantity:0
        },function(){
            this.props.u(this.state);
        });
    }
    render()
    {
        return (
            <div>
                {/* {console.log(this.state.item)} */}
                {this.state.item ===undefined ? null :<div className="cart_item">
                    <img src={this.state.item.image} alt="error" />
                    <h3>{this.state.item.ProductName}</h3>
                    <h3>Price: $ {this.state.item.price}</h3>
                    <div className="cart_item_button_div">
                        <button type="click" name="add" onClick={this.handleQuantity}>+</button>
                        <button id="quantity">{this.state.quantity}</button>
                        <button type="click" name="substract" onClick={this.handleQuantity}>-</button>
                    </div>
                    <button type="submit" onClick={this.handleDelete} className="cart_item_delete">Delete Item</button>
                </div>}
                
            </div>
        )
    }
}
export default CartItem;