import React from "react";
import Review from "./Review";
class MovieChosen extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            movie:this.props.movie,
            error:false,
            favourite:false
        }
        this.display=this.display.bind(this);
        this.handleReview=this.handleReview.bind(this);
        this.favourites=this.favourites.bind(this);
        this.time=this.time.bind(this);
    }
    display()
    {
        this.props.d(2);
    }
    handleReview()
    {
        let flag=this.props.hR(this.state.movie.id);
        if(flag===1)
            this.props.d(3);
        else
            this.setState({
                error:true
            });
    }
    favourites()
    {
        let flag=this.props.aF(this.state.movie.id);
        if(flag===1)
        {
            this.setState({
                favourite:true
            },()=>{
                setTimeout(this.time,3000);
            });
        }
    }
    time()
    {
        this.setState({
            favourite:false
        });
    }
    render()
    {
        let genre="";
        for(var i=0;i<this.state.movie.genre.length;i++)
        {
            if(i+1 === this.state.movie.genre.length)
                genre+=this.state.movie.genre[i];
            else
                genre+=this.state.movie.genre[i] +"/";
        }
        let reviews=this.state.movie.reviews;
        let comp=[];
        for(let i=0;i<reviews.length;i++)
            comp.push(<Review review={reviews[i]} key={reviews[i].id}/>)
        return(
            <div>
                <div>
                    <img src={this.state.movie.poster} alt="error"/>
                </div>
                <div>
                    <button onClick={this.display}>View All Movies</button>
                    <h1>
                        {this.state.movie.name}
                    </h1>
                    <h3>
                        {this.state.movie.release}
                    </h3>
                    <h3>
                        {genre}
                    </h3>
                    <h3>
                        {this.state.movie.runTime}
                    </h3>
                    <h3>
                        Director:{this.state.movie.director}
                    </h3>
                     <h3>Imdb:{this.state.movie.imdb}</h3>
                    <h2>
                        Popcorn in the box users Rating: {this.state.movie.ratings}
                    </h2>
                    <p>
                        {this.state.movie.description}
                    </p>
                    {/* {console.log(this.state.movie.reviews)} */}
                    {this.props.lIn ? <button type="button" onClick={this.favourites}>Add to favourites</button>:null}
                    {this.state.favourite ? <h1>Added to collections</h1> : null}
                    <button onClick={this.handleReview}>Add a review</button>
                   <div>
                        <h3>Reviews</h3>
                        {this.state.error ? <h1>You need to be logged in to add a review</h1>:null}
                        {comp}
                   </div>
                </div>
            </div>
        )
    }
}
export default MovieChosen;