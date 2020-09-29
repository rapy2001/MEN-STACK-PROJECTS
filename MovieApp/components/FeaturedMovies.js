import React from "react";
import Movie from "./Movie";
function FeaturedMovies(props)
{
    const [state]=React.useState({
        movies:props.movies
    });
    let featuredMovies=[];
    let indices=[];
    while(indices.length<3)
    {
        let flag=0;
        let ind=String(Math.floor(Math.random()*state.movies.length));
        for(let i=0;i<indices.length;i++)
        {
            if(indices[i]===ind)
                flag=1;
        }
        if(flag===0)
            indices.push(ind);
    }
    console.log(indices);
    for(let i=0;i<indices.length;i++)
    {
        let ind=indices[i];
        featuredMovies.push(<Movie movie={state.movies[ind]} key={i} cM={props.cM} val={1} />);
    }
    return (
        <div className="featured_movies">
            <h1>Featured Movies</h1>
            <div className="featured_movies_box">
                {featuredMovies.length > 0 ? featuredMovies :null}
            </div>
            
        </div>
    )
}
export default FeaturedMovies;