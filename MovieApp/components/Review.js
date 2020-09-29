import React from "react";
class Review extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            review:this.props.review
        }
    }
    render()
    {
        return (
            <div>
                <h3>{this.state.review.userName}</h3>
                <h4>{this.state.review.rating}</h4>
                <p>
                    {this.state.review.reviewText}
                </p>
            </div>
        )
    }
}
export default Review;