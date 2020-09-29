import React from "react";
import Movie from "./Movie";
class Search extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            movies:this.props.movies,
            name:"",
            result:false,
            search:[],
            message:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.display=this.display.bind(this);
    }
    handleChange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    handleSubmit(event)
    {
        event.preventDefault();
        let search=[];
        for(let i=0;i<this.state.movies.length;i++)
        {
            let flag=0;
            if(this.state.name.length<=this.state.movies[i].name.length && this.state.name.length>0)
            {
                let term=this.state.name.toLowerCase();
                let val=this.state.movies[i].name.toLowerCase();
                let ind1=0;
                let ind2=term.length;
                // console.log("working",term,val);
                while(!flag && ind2<=val.length)
                {
                    if(term === val.substring(ind1,ind2))
                    {
                        search.push(this.state.movies[i]);
                        flag=1;
                        break;
                    }
                    else
                    {
                        ind1+=1;
                        ind2+=1;
                    }
                }
            }
            else if(this.state.name.length>this.state.movies[i].name.length)
            {
                let term=this.state.name.toLowerCase();
                let val=this.state.movies[i].name.toLowerCase();
                let ind1=0;
                let ind2=val.length;
                // console.log("working",term,val);
                while(!flag && ind2<=term.length)
                {
                    if(val === term.substring(ind1,ind2))
                    {
                        search.push(this.state.movies[i]);
                        flag=1;
                        break;
                    }
                    else
                    {
                        ind1+=1;
                        ind2+=1;
                    }
                }
            }
            if(flag)
                break;
        }
        this.setState({
            search:search,
            result:true,
            message:true
        },()=>{
            this.props.d(4);
        });
    }
    display()
    {
        this.setState({
            result:false
        },()=>{
            this.props.d(2);
        });
        
    }
    
    render()
    {
        let foundMovies=[];
        let M=this.state.search;
        for(var i=0;i<M.length;i++)
        {
            foundMovies.push(<Movie movie={M[i]} key={M[i].id} cM={this.props.cM} val={2}/>)
        }
        return (
            <div className="movie_search">
                <h2>Search a Movie</h2>
                <div className="sM_form_div">
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Search for a Movie Name" 
                            value={this.state.name} 
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        <button type="submit" className="base_button">Search</button>
                    </form>
                </div>
                <button onClick={this.display} className="base_button mS_btn_all">View All Movies</button>
                {console.log("message is",this.state.message)}
                {this.state.message ? 
                    <div>
                        {this.state.result ? (this.state.search.length>0 ? <div className="sM_fnd_div"><h1 className="sM_msg sM_scs_msg">These movies were found ... </h1><div className="sM_movies_box">{foundMovies}</div></div> :<h1 className="sM_msg sM_err_msg">No Movies were found</h1>) :null}
                    </div> 
                : null}
                
            </div>
        )
    }
}
export default Search;