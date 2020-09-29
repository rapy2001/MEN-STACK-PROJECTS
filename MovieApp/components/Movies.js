import React from "react";
import Movie from "./Movie";
class Movies extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            movies:this.props.movies,
            filter:"All",
            ratingFilter:"1"
        }
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render()
    {
        // console.log(this.state);
        let movies=[];
        let M=this.state.movies;
        
            if(this.state.filter==="All" && this.state.ratingFilter==="1")
            {
                for(var i=0;i<M.length;i++)
                {   
                    movies.push(<Movie movie={M[i]} key={M[i].id} cM={this.props.cM} val={3}/>);
                }
            }
            else
            {
                // let filtered=[];
                movies=[];
                console.log(M.length)
                for(let j=0;j<M.length;j++)
                {
                    
                    if(this.state.filter!=="All")
                    {
                        if(M[j].ratings>=Number(this.state.ratingFilter))
                        {
                            let k=0;
                            while(k<M[j].genre.length)
                            {
                                if(M[j].genre[k]===this.state.filter)
                                {
                                    movies.push(<Movie movie={M[j]} key={M[j].id} cM={this.props.cM} val={2} />);
                                    // console.log()
                                }
                                k+=1;
                            }
                        }     
                    }
                    else
                    {
                        if(M[j].ratings>=Number(this.state.ratingFilter))
                        {
                            movies.push(<Movie movie={M[j]} key={M[j].id} cM={this.props.cM}/>);
                        }
                    }
                }
        }
        return(
            <div className="all_movies">
                <h1>All Movies</h1>
                <form>
                    <select name="filter" value={this.state.filter} onChange={this.handleChange}>
                        <option value="All">All</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Drama">Drama</option>
                        <option value="Thriller">Thriller</option>
                    </select>
                    <select name="ratingFilter" value={this.state.ratingFilter} onChange={this.handleChange}>
                        <option value="4.5">4.5+</option>
                        <option value="4">4+</option>
                        <option value="3.5">3.5+</option>
                        <option value="3">3+</option>
                        <option value="2.5">2.5+</option>
                        <option value="2">2+</option>
                        <option value="1.5">1.5+</option>
                        <option value="1">1+</option>
                    </select>
                </form>
                {this.state.filter}
                {movies.length>0 ? <div className="Movies">{movies}</div> : <h1>No Movies were found of  "{this.state.filter}"  Genre</h1>}
            </div>
        )
    }
}
export default Movies;