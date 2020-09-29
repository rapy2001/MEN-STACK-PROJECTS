import React from "react";
class Form extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            id:0,
            name:"",
            release:"",
            runTime:"",
            description:"",
            genre:[],
            ratings:0,
            director:"",
            poster:"",
            reviews:[],
            imdb:0
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.display=this.display.bind(this);
    }
    handleChange(event)
    {
        if(event.target.type==="checkbox")
        {
            if(event.target.checked)
            {
                let genre=this.state.genre;
                genre.push(event.target.name);
                this.setState(function(prevState){
                    return {
                        genre:genre
                    }
                });
            }
            else
            {
                let genre=this.state.genre;
                let ind=genre.indexOf(event.target.name);
                genre.splice(ind,1);
                this.setState({
                    genre:genre
                })
            } 
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
        this.setState({
            id:this.props.id
        },()=>{
            this.props.upd(this.state);
            this.props.d(2);
        });
        // console.log(this.state);
    }
    display()
    {
        this.props.d(2);
    }
    render()
    {
        return (
            <div className="addMovie_div log_in_div">
                <form onSubmit={this.handleSubmit}>
                    <h3>Add a Movie</h3>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Movie Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input 
                        type="text"
                        placeholder="Release Date"
                        value={this.state.release}
                        name="release"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input 
                        type="text"
                        placeholder="Run Time"
                        value={this.state.runTime}
                        name="runTime"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input 
                        type="text"
                        placeholder="Director's Name"
                        value={this.state.director}
                        name="director"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input 
                        type="text"
                        placeholder="Poster Url"
                        value={this.state.poster}
                        name="poster"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <input 
                        type="text"
                        placeholder="Imdb Rating"
                        value={this.state.imdb}
                        name="poster"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    
                    <h3>Genre</h3>
                    <h4>Please Select a Genre</h4>
                    <div>
                        <label htmlFor="action">Action</label>
                        <input type="checkbox" name="Action" id="action" onChange={this.handleChange}/>
                        <label htmlFor="adventure">Adventure</label>
                        <input type="checkbox" name="Adventure" id="adventure" onChange={this.handleChange}/>
                        <label htmlFor="mystery">Mystery</label>
                        <input type="checkbox" name="Mystery" id="mystery" onChange={this.handleChange}/>
                        <label htmlFor="drama">Drama</label>
                        <input type="checkbox" name="Drama" id="drama" onChange={this.handleChange}/>
                        <label htmlFor="thriller">Thriller</label>
                        <input type="checkbox" name="Thriller" id="thriller" onChange={this.handleChange}/>
                    </div>
                    <textarea  
                        value={this.state.description}
                        name="description"
                        placeholder="Description of Movie"
                        onChange={this.handleChange}
                        autoComplete="off"
                    >
                    </textarea>
                    <button type="submit" onClick={this.handleSubmit}>
                        Submit
                    </button>
                    <button type="submit" onClick={this.display}>View All Movies</button>
                </form>
                
            </div>
        )
    }
}
export default Form;