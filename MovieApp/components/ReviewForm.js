import React from "react";
class ReviewForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            userName:"",
            reviewText:"",
            rating:0,
            id:this.props.ID,
            userId:this.props.cuId
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(event)
    {
        if(event.target.name==="rating")
        {
            let rating=Number(event.target.value);
            this.setState({
                [event.target.name]:rating
            });
        }
        else
        {
            this.setState({
                [event.target.name]:event.target.value
            });
        }
    }
    handleSubmit(event)
    {
        event.preventDefault();
        let users=this.props.users;
        for(let i=0;i<users.length;i++)
        {
            if(users[i].id===this.props.cuId)
            {
                this.setState({
                    userName:users[i].username
                },()=>{
                    this.props.uR(this.props.id,this.state);
                });
                break;
            }
        }
    }
    render()
    {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    {/* <input 
                        type="text"
                        name="userName"
                        placeholder="Your Name"
                        value={this.state.userName}
                        onChange={this.handleChange}
                    /> */}
                    <input 
                        type="Number"
                        min="0"
                        step=".5"
                        max="5"
                        name="rating"
                        placeholder="Your Rating"
                        value={this.state.rating}
                        onChange={this.handleChange}
                    />
                    <textarea
                        name="reviewText"
                        placeholder="Your Review"
                        value={this.state.reviewText}
                        onChange={this.handleChange}
                    >
                    </textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default ReviewForm;