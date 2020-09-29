import React from"react";
import CartItem from "./CartItem"
class Cart extends React.Component
{
    constructor(props)
    {
        super();
        this.state={
            cartItems:[],
            total:0
        };
        this.update=this.update.bind(this);
        this.display=this.display.bind(this);
        this.clear=this.clear.bind(this);
    }
    componentDidMount()
    {
        let total=this.calculateTotal();
        this.setState({
            cartItems:this.props.items,
            total:total
        })
    }
    calculateTotal()
    {
        let total=0;
        let item=this.props.items;
        if(item.length>0)
        {
            for(let i=0;i<item.length;i++)
            {
                total+=item[i].quantity *item[i].item.price;
            }
        }
        return total;
    }
    update(val)
    {
        // console.log("inside the cart.js",val);
        let items=this.state.cartItems;
        if(val.quantity <= 0)
        {
            for(let i=0;i<items.length;i++)
                if(val.item.id===items[i].item.id)
                {
                    items.splice(i,1);
                    console.log("inside 0 case",items);
                    break;
                }    
        }
        else
        {
            for(let i=0;i<items.length;i++)
                if(val.item.id===items[i].item.id)
                {
                    items[i]=val;
                    break;
                }
                
        }
        let total=this.calculateTotal();
        this.setState({
            cartItems:items,
            total:total
        },function(){
            this.props.c(this.state.cartItems);
        })
        // console.log("still in cart",items);
        
        // console.log(val);
    }
    clear()
    {
        this.setState({
            cartItems:[],
            total:0
        },function(){
            this.props.c(this.state.cartItems);
        })
    }
    display()
    {
        this.props.D(2);
    }
    render()
    {
        let cItems=[];
        if(this.state.cartItems!==undefined)
        for(var i=0;i<this.state.cartItems.length;i++)
            cItems.push(<CartItem item={this.state.cartItems[i]} u={this.update} key={this.state.cartItems[i].item.id}/>)
        // console.log("inside cart js",cItems)
        return (
            <div id="cart_div">
                <div className="cart_amount_button">
                    <button type="submit" onClick={this.display} className="cart_p">View all items</button>
                    <button type="submit" onClick={this.clear} className="cart_r">Clear Cart</button>
                </div>
                { !(cItems.length>0) ? <h1 className="empty_msg">Cart is Empty</h1> :  cItems }
                {
                    !(cItems.length>0) ? null :
                    <div className="cart_amount">
                        <h3>Sub Total: $ {this.state.total}</h3>
                        <h3>Tax: $ {this.state.total * 0.1}</h3>
                        <h3>Total: $ {this.state.total + this.state.total * 0.1}</h3>
                    </div>
                    
                }
                {/* {console.log(this.props)} */}
            </div>
        )
    }

}
export default Cart;