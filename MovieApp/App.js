import React from "react";
import Form from "./components/Form";
import Movies from "./components/Movies";
import Header from "./components/Header";
import MovieChosen from "./components/MovieChosen";
import ReviewForm from "./components/ReviewForm";
import Search from "./components/Search";
import UserRegisterForm from "./components/Register";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import data from "./data";
import "./style.css";
import FeaturedMovies from "./components/FeaturedMovies";
class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            id:7,
            movies:data,
            users:[],
            userId:0,
            currentUserId:-1,
            isLoggedIn:false,
            chosenMovie:{},
            dForm:false,
            dMovies:true,
            dMovie:false,
            dRForm:false,
            searchMovie:false,
            rMId:0,
            reviewId:7,
            userRegisterForm:false,
            userLogForm:false,
            dashboard:false,
            fMovies:true
        }
        this.update=this.update.bind(this);
        this.display=this.display.bind(this);
        this.chosenMovie=this.chosenMovie.bind(this);
        this.handleReview=this.handleReview.bind(this);
        this.updateReview=this.updateReview.bind(this);
        this.handleUserRegistration=this.handleUserRegistration.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
        this.addfavourites=this.addfavourites.bind(this);
        this.toggleSearch=this.toggleSearch.bind(this);
    }
    display(val)
    {
        if(val===1)
        {
            this.setState({
                dForm:true,
                dMovies:false,
                dMovie:false,
                dRForm:false,
                searchMovie:false,
                userRegisterForm:false,
                userLogForm:false,
                dashboard:false,
                fMovies:false
            })
        }
        else if(val===2)
        {
            this.setState({
                dForm:false,
                dMovies:true,
                dMovie:false,
                dRForm:false,
                searchMovie:false,
                userRegisterForm:false,
                userLogForm:false,
                dashboard:false,
                fMovies:true
            })
        }
        else if(val===3)
        {
            this.setState({
                dForm:false,
                dMovies:false,
                dMovie:false,
                dRForm:true,
                searchMovie:false,
                userRegisterForm:false,
                userLogForm:false,
                dashboard:false,
                fMovies:false
            });
        }
        else if(val===4)
        {
            this.setState({
                dForm:false,
                dMovies:false,
                dMovie:false,
                dRForm:false,
                searchMovie:true,
                userRegisterForm:false,
                userLogForm:false,
                dashboard:false,
                fMovies:false
            })
        }
        else if(val===5)
        {
            this.setState({
                dForm:false,
                dMovies:false,
                dMovie:false,
                dRForm:false,
                searchMovie:false,
                userRegisterForm:true,
                userLogForm:false,
                dashboard:false,
                fMovies:false
            })
        }
        else if(val===6)
        {
            this.setState({
                dForm:false,
                dMovies:true,
                dMovie:false,
                dRForm:false,
                searchMovie:false,
                userRegisterForm:false,
                userLogForm:false,
                dashboard:false,
                fMovies:true
            })
        }
        else if(val===7)
        {
            this.setState({
                dForm:false,
                dMovies:false,
                dMovie:false,
                dRForm:false,
                searchMovie:false,
                userRegisterForm:false,
                userLogForm:true,
                dashboard:false,
                fMovies:false
            })
        }
        else if(val===8)
        {
            this.setState({
                dForm:false,
                dMovies:false,
                dMovie:false,
                dRForm:false,
                searchMovie:false,
                userRegisterForm:false,
                userLogForm:false,
                dashboard:true,
                fMovies:false
            })
        }
    }
    update(movie)
    {
        let movies=this.state.movies;
        movies.push(movie);
        this.setState(function(prevState){
                return {
                    id:prevState.id+1,
                    movies:movies
                }
        },()=>{console.log(this.state)});
    }
    chosenMovie(movie)
    {
        this.setState({
            chosenMovie:movie,
            dForm:false,
            dMovies:false,
            dMovie:true,
            dRForm:false,
            searchMovie:false,
            userRegisterForm:false,
            userLogForm:false,
            dashboard:false,
            fMovies:false
        });
    }
    handleReview(id)
    {
        if(this.state.isLoggedIn)
        {
            this.setState({
                rMId:id
            });
            return 1;
        }
        else
            return 0;
        
    }
    updateReview(id,review)
    {
        let movies=this.state.movies;
        let ind=0;
        for(var i=0;i<movies.length;i++)
            if(movies[i].id===id)
            {
                let val=movies[i].ratings*movies[i].reviews.length;
                val+=review.rating;
                movies[i].ratings=val/(movies[i].reviews.length +1);
                movies[i].reviews.push(review);
                ind=i;
                break;
            }
            this.setState((prevState)=>{
                return {
                    movies:movies,
                    reviewId:prevState.reviewId+1
                }
            },()=>{
                this.chosenMovie(movies[ind]);
            });     
    }
    handleUserRegistration(newUser)
    {
        let flag=0;
        console.log("hello");
        if(this.state.users.length>0)
        {
            for(let i=0;i<this.state.users.length;i++)
            {
                if(newUser.username===this.state.users[i].username)
                {
                    flag=1;
                    break;
                }
            }
            if(flag===0)
            {
                let newUsers=this.state.users;
                newUsers.push(newUser);
                this.setState(function(prevState){
                    return {
                        users:newUsers,
                        userId:prevState.userId+1
                    }
                })
            }
        }
        else
        {
            let newUsers=this.state.users;
                newUsers.push(newUser);
                this.setState(function(prevState){
                    return {
                        users:newUsers,
                        userId:prevState.userId+1
                    }
                });
        }
        return flag;
    }
    handleLogin(logDetails)
    {
        let users=this.state.users;
        let flag=0;
        for(let i=0;i<users.length;i++)
        {
            if(logDetails.username===users[i].username)
            {
                if(logDetails.password===users[i].password)
                {
                    this.setState({
                        currentUserId:users[i].id,
                        isLoggedIn:true
                    });
                    flag=1;
                    break;
                }
                else
                {
                    flag=2;
                    break;
                }
            }
        }
        return flag;
    }
    handleLogout()
    {
        this.setState({
            isLoggedIn:false,
            currentUserId:-1,
            ddForm:false,
            dMovies:true,
            dMovie:false,
            dRForm:false,
            searchMovie:false,
            userRegisterForm:false,
            userLogForm:false,
            dashboard:false,
            fMovies:true
        });
    }
    addfavourites(movieId)
    {
        let users=this.state.users;
        let flag=1;
        if(this.state.currentUserId !==-1)
        {
            for(let i=0;i<users.length;i++)
            {
                if(users[i].id===this.state.currentUserId)
                {
                    for(let j=0;j<users[i].collections.length;j++)
                    {
                        if(users[i].collections[j]===movieId)
                        {
                            flag =0;
                            break;
                        }
                    }
                    if(flag===1)
                    {
                        users[i].collections.push(movieId);
                        break;
                    }
                    else
                    {
                        break;
                    }
                    
                }
            }
        }
        return flag;
    }
    componentDidUpdate(props,state)
    {
        console.log("app c u");
    }
    toggleSearch()
        {
            this.setState({
                searchMovie:true
            });
        }
    render()
    {
        let info={};
        if(this.state.currentUserId !==-1)
        {
            let users=this.state.users;
            // let flag=0;
            for(let i=0;i<users.length;i++)
            {
                if(users[i].id===this.state.currentUserId)
                {
                    info=users[i];
                    // flag=1;
                    break;
                }
            }
        }
        return (
            <div>
                <Header d={this.display} logout={this.handleLogout} ili={this.state.isLoggedIn}/>
                {this.state.dForm ? <Form id={this.state.id} upd={this.update} d={this.display}/> :null}
                {this.state.fMovies ? <FeaturedMovies movies={this.state.movies} cM={this.chosenMovie} />:null}
                {this.state.dForm ? null:!(this.state.searchMovie) ? <button onClick={this.toggleSearch} className="sM_btn base_button">Search a Movie</button> :<Search movies={this.state.movies} cM={this.chosenMovie} d={this.display}/>}
                {/* {!(this.state.searchMovie) ? <button onClick={this.toggleSearch} className="sM_btn base_button">Search a Movie</button> :<Search movies={this.state.movies} cM={this.chosenMovie} d={this.display}/>} */}
                {/* {this.state.searchMovie ? <Search movies={this.state.movies} cM={this.chosenMovie} d={this.display}/> : null} */}
                {this.state.dMovies ? <Movies movies={this.state.movies} cM={this.chosenMovie}/> :null}
                {this.state.dMovie ? <MovieChosen
                    movie={this.state.chosenMovie} 
                    d={this.display} 
                    hR={this.handleReview} 
                    lIn={this.state.isLoggedIn} 
                    cUId={this.state.currentUserId} 
                    aF={this.addfavourites}
                /> :null}
                {this.state.dRForm ? <ReviewForm id={this.state.rMId} uR={this.updateReview} ID={this.state.reviewId} users={this.state.users} cuId={this.state.currentUserId}/> :null}
                {this.state.userRegisterForm ? <UserRegisterForm uRH={this.handleUserRegistration} d={this.display} id={this.state.userId}/> : null}
                {this.state.userLogForm ? <LogIn hLI={this.handleLogin} d={this.display}/>:null}
                {this.state.dashboard ? <Dashboard info={info}  movies={this.state.movies} cM={this.chosenMovie}/>:null}
                {/* {console.log(this.state)} */}
            </div>
        )
    }
}
export default App;