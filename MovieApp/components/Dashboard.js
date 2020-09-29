import React from "react";
import Movie from "./Movie";
function Dashboard(props)
{
    const [state]=React.useState({
        user:props.info,
        movies:props.movies
    });
    let info=state.user;
    // for(let i=0;i<state.users.length;i++)
    // {
    //     if(state.users[i].id===state.id)
    //     {
    //         info=state.users[i];
    //         break;
    //     }
    // }
    let movies=[];
    // console.log(state.movies[0].id);
    for(let i=0;i<info.collections.length;i++)
    {
        for(let j=0;j<state.movies.length;j++)
        {
            if(state.movies[j].id===info.collections[i])
            {
                movies.push(<Movie cM={props.cM} key={state.movies[j].id} movie={state.movies[j]}/>);
                break;
            }
        }
        
    }
    return (
        <div className="dashboard_div">
            <div className="dashboard_div_info">
                <h1>User Dashboard</h1>
                <div>
                    <img src={info.userImageUrl} alt="error"/>
                </div>
                <h2>{info.username}</h2>
                <h2>Movies in Collections: {movies.length}</h2>
            </div>
            <div className="dsh_div">
                <h2>Your Collection</h2>
                <div className="dsh_div_box">
                    {movies.length >0 ? movies :<h1>Collection is Empty</h1>}
                </div>
            </div>
        </div>
    )
}
export default Dashboard;