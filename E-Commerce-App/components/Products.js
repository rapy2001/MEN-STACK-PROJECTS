import React from "react";
import Product from "./Product";
class Products extends React.Component
{
    constructor()
    {
        super();
        this.state={};
        this.display=this.display.bind(this);
        this.Display=this.Display.bind(this);
        this.showCart=this.showCart.bind(this); 
    }
    display(val,item)
    {
        this.props.d(val,item);
    }
    Display(val)
    {
        this.props.D(val);
    }
    showCart()
    {
        this.props.d(5);
    }
    render()
    {
        // let products=this.props.products.map(function(product){
        //     return <Product product={product} key={product.id} d={this.display}/>
        // });
        let PRODUCTS=[];
        for(var i=0;i<this.props.products.length;i++)
            PRODUCTS.push(<Product product={this.props.products[i]} key={this.props.products[i].id} d={this.display} D={this.Display}/>);
            let css_class="products_div";
            if(this.props.dItem)
                css_class="products_div products_div_effect";
        return(
            <div className={css_class}>
                <h1>Our Products</h1>
                {/* {products} */}
                <div className="products_box">{PRODUCTS}</div>
                
                <button type="submit" onClick={this.showCart} className="cart_button"><i className="fa fa-shopping-cart"></i></button>
            </div>
        )
    }
}
export default Products;