import React from "react";
import Form from "./components/Form";
import Products from "./components/Products";
import Header from "./components/Header";
import ProductChosen from "./components/ProductChosen";
import Cart from "./components/Cart";
import FullProduct from "./components/FullProduct";
import "./style.css";
class App extends React.Component
{
    constructor()
    {
        super();
        this.state={
            phones:[{
                ProductName:"Xperia 1",
                image:"https://cdn.vox-cdn.com/thumbor/sjx1FrxHC4WRIti3OUa0eVOaO80=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19997020/Untitled.png",
                price:800,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada elementum pulvinar. Nullam sed ultricies justo, ac laoreet eros. Aliquam erat volutpat. Integer cursus tempus orci, ac egestas ex commodo a. Morbi quis tellus eu dui congue lobortis. Vivamus in semper enim. Pellentesque pulvinar nec diam in malesuada. Aliquam justo lectus, ornare et arcu et, convallis tincidunt orci. Donec gravida ornare tempus. Etiam interdum tortor et erat hendrerit luctus non vestibulum elit. Pellentesque mauris magna, bibendum sed fringilla malesuada, feugiat id est. Nunc et porttitor lorem. Quisque in pretium ex, eget pharetra magna. Nam bibendum, tellus id ultrices cursus, mauris tellus volutpat odio, eget aliquam nunc velit et est. Cras rutrum mi magna, sed finibus augue molestie fringilla. Integer nisl risus, imperdiet sit amet mauris ut, mattis laoreet turpis.",
                id:0
            },
            {
                ProductName:"Galaxy S10",
                image:"https://images.samsung.com/is/image/samsung/in-galaxy-s10-sm-g973-sm-g973fzbdins-frontprismblue-thumb-146960148?$ORIGIN_JPG$",
                price:1100,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada elementum pulvinar. Nullam sed ultricies justo, ac laoreet eros. Aliquam erat volutpat. Integer cursus tempus orci, ac egestas ex commodo a. Morbi quis tellus eu dui congue lobortis. Vivamus in semper enim. Pellentesque pulvinar nec diam in malesuada. Aliquam justo lectus, ornare et arcu et, convallis tincidunt orci. Donec gravida ornare tempus. Etiam interdum tortor et erat hendrerit luctus non vestibulum elit. Pellentesque mauris magna, bibendum sed fringilla malesuada, feugiat id est. Nunc et porttitor lorem. Quisque in pretium ex, eget pharetra magna. Nam bibendum, tellus id ultrices cursus, mauris tellus volutpat odio, eget aliquam nunc velit et est. Cras rutrum mi magna, sed finibus augue molestie fringilla. Integer nisl risus, imperdiet sit amet mauris ut, mattis laoreet turpis.",
                id:1
            },
            {
                ProductName:"Motorola Edge",
                image:"https://i.gadgets360cdn.com/large/motorola_edge_plus_body_1587551574402.jpg",
                price:1200,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada elementum pulvinar. Nullam sed ultricies justo, ac laoreet eros. Aliquam erat volutpat. Integer cursus tempus orci, ac egestas ex commodo a. Morbi quis tellus eu dui congue lobortis. Vivamus in semper enim. Pellentesque pulvinar nec diam in malesuada. Aliquam justo lectus, ornare et arcu et, convallis tincidunt orci. Donec gravida ornare tempus. Etiam interdum tortor et erat hendrerit luctus non vestibulum elit. Pellentesque mauris magna, bibendum sed fringilla malesuada, feugiat id est. Nunc et porttitor lorem. Quisque in pretium ex, eget pharetra magna. Nam bibendum, tellus id ultrices cursus, mauris tellus volutpat odio, eget aliquam nunc velit et est. Cras rutrum mi magna, sed finibus augue molestie fringilla. Integer nisl risus, imperdiet sit amet mauris ut, mattis laoreet turpis.",
                id:2
            },
            {
                ProductName:"Iphone SE",
                image:"https://c.ndtvimg.com/2020-04/3d2u374s_image_640x480_16_April_20.jpg?downsize=600:450",
                price:400,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada elementum pulvinar. Nullam sed ultricies justo, ac laoreet eros. Aliquam erat volutpat. Integer cursus tempus orci, ac egestas ex commodo a. Morbi quis tellus eu dui congue lobortis. Vivamus in semper enim. Pellentesque pulvinar nec diam in malesuada. Aliquam justo lectus, ornare et arcu et, convallis tincidunt orci. Donec gravida ornare tempus. Etiam interdum tortor et erat hendrerit luctus non vestibulum elit. Pellentesque mauris magna, bibendum sed fringilla malesuada, feugiat id est. Nunc et porttitor lorem. Quisque in pretium ex, eget pharetra magna. Nam bibendum, tellus id ultrices cursus, mauris tellus volutpat odio, eget aliquam nunc velit et est. Cras rutrum mi magna, sed finibus augue molestie fringilla. Integer nisl risus, imperdiet sit amet mauris ut, mattis laoreet turpis.",
                id:3
            },
            {
                ProductName:"One Plus 8",
                image:"https://images.news18.com/ibnlive/uploads/2020/06/1591344615_oneplus-8-4.png",
                price:700,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada elementum pulvinar. Nullam sed ultricies justo, ac laoreet eros. Aliquam erat volutpat. Integer cursus tempus orci, ac egestas ex commodo a. Morbi quis tellus eu dui congue lobortis. Vivamus in semper enim. Pellentesque pulvinar nec diam in malesuada. Aliquam justo lectus, ornare et arcu et, convallis tincidunt orci. Donec gravida ornare tempus. Etiam interdum tortor et erat hendrerit luctus non vestibulum elit. Pellentesque mauris magna, bibendum sed fringilla malesuada, feugiat id est. Nunc et porttitor lorem. Quisque in pretium ex, eget pharetra magna. Nam bibendum, tellus id ultrices cursus, mauris tellus volutpat odio, eget aliquam nunc velit et est. Cras rutrum mi magna, sed finibus augue molestie fringilla. Integer nisl risus, imperdiet sit amet mauris ut, mattis laoreet turpis.",
                id:4
            },
            {
                ProductName:"Nokia PureView",
                image:"https://fdn.gsmarena.com/imgroot/news/20/04/nokia-9-h2-delay/-727/gsmarena_001.jpg",
                price:400,
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada elementum pulvinar. Nullam sed ultricies justo, ac laoreet eros. Aliquam erat volutpat. Integer cursus tempus orci, ac egestas ex commodo a. Morbi quis tellus eu dui congue lobortis. Vivamus in semper enim. Pellentesque pulvinar nec diam in malesuada. Aliquam justo lectus, ornare et arcu et, convallis tincidunt orci. Donec gravida ornare tempus. Etiam interdum tortor et erat hendrerit luctus non vestibulum elit. Pellentesque mauris magna, bibendum sed fringilla malesuada, feugiat id est. Nunc et porttitor lorem. Quisque in pretium ex, eget pharetra magna. Nam bibendum, tellus id ultrices cursus, mauris tellus volutpat odio, eget aliquam nunc velit et est. Cras rutrum mi magna, sed finibus augue molestie fringilla. Integer nisl risus, imperdiet sit amet mauris ut, mattis laoreet turpis.",
                id:5
            },
        ],
            id:6,
            dForm:false,
            dItem:false,
            item:{},
            dProducts:true,
            cartItems:[],
            dCart:false,
            dFull:false,
            itemFull:{},
            total:0
        }
        this.updateData=this.updateData.bind(this);
        this.display=this.display.bind(this);
        this.Display=this.Display.bind(this);
        this.change=this.change.bind(this);
    }
    updateData(val)
    {
        this.setState(function(prevState){
            let phones=prevState.phones;
            phones.push(val);
            return {
                phones:phones,
                id:prevState.id+1
            }
        });
        // console.log(this.state);
    }
    display(val,item)
    {
        if(val===1)
        this.setState({
            dForm:true,
            dProducts:false,
            dItem:false,
            dCart:false,
            dFull:false
        });
        else if(val===2)
        {
            this.setState({
                dForm:false,
                dProducts:true,
                dItem:false,
                dCart:false,
                dFull:false
            })
        }
        else if(val===3)
        {
            // console.log(item);
            
            this.setState({
                dItem:true,
                item:item,
            })
        }
        else if(val===4)
        {
            this.setState({
                dItem:false
            })
        }
        else if(val===5)
        {
            this.setState({
                dItem:false,
                dProducts:false,
                dForm:false,
                dCart:true,
                dFull:false
            })
        }
        else if(val===6)
        {
            this.setState({
                dItem:false,
                dProducts:false,
                dForm:false,
                dCart:false,
                dFull:true,
                itemFull:item
            })
        }
    }
    Display(item)
    {
        let items=this.state.cartItems;
        let flag=1;
        for(var i=0;i<items.length;i++)
            if(item.id===items[i].item.id)
            {
                items[i].quantity+=1;
                flag=0;
                break;
            }
            if(flag)
                items.push({
                    item:item,
                    quantity:1
                });
        this.setState({
            cartItems:items
        })
    }
    change(item)
    {
        let total=0;
        if(item.length>0)
        {
            for(let i=0;i<item.length;i++)
            {
                total+=item[i].quantity *item[i].item.price;
            }
        }
            
        this.setState({
            cartItems:item,
            total:total
        })
    }
    render()
    {
        return (
            <div className="App_div">
                <Header d={this.display}/>
                {/* <h1>This is the app</h1> */}
                {this.state.dForm ? <Form UD={this.updateData} id={this.state.id} d={this.display}/> :null }
                {this.state.dItem ? <ProductChosen item={this.state.item} d={this.display} /> : null}
                {this.state.dProducts ? <Products products={this.state.phones} d={this.display} D={this.Display} dItem={this.state.dItem}/> : null}
                {this.state.dCart ? <Cart items={this.state.cartItems} d={this.Display} c={this.change} D={this.display} total={this.state.total}/> :null}
                {this.state.dFull ? <FullProduct item={this.state.itemFull} d={this.display} D={this.Display}/> : null}
                {console.log(this.state.cartItems)}
            </div>
        )
    }
}
export default App;