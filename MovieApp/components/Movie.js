import React from "react";
class Movie extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            movie:this.props.movie,
            val:this.props.val
        }
        this.display=this.display.bind(this);
    }
    display()
    {
        this.props.cM(this.props.movie);
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
        let classVal="";
        if(this.state.val===1)
            classVal="fm_ele";
        else if(this.state.val===2)
            classVal="sM_movie";
        else if(this.state.val===3)
            classVal="M_container"
        return (
            <div className={classVal}>
                <div>
                    <img src={this.state.movie.poster} alt="error" />
                </div>
                <div>
                    <div>
                        <h3>{this.state.movie.name}</h3>
                        <h3>imdb: <span style={{color:"rgb(255, 204, 0)"}}>{this.state.movie.imdb}</span></h3>
                        <h3>{genre}</h3>
                    </div>
                    <button className="base_button" onClick={this.display}>Learn More</button>
                </div>
            </div>
        )
    }
}
export default Movie;