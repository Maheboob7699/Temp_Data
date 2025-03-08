import TopRank from "../components/TopRank"
import PreviousRank from "../components/PreviousRank"
import { useState } from "react";
function Leaderboard(){
    const localUser = JSON.parse(localStorage.getItem("userDetails")) || [];
    console.log(localUser);
     const [user, setUser] = useState(localUser);
     let sortRank = localUser.sort((a,b)=>b.score-a.score)
    
    return (
        <>
         <h1>Leader board </h1>
         <h2 className='rank-show'>Wow! Your rank is # {uniqueId + 1}</h2>
                    <div className="top-ranks-container">
                        <TopRank rankClassName="rank-2" user={sortRank[1]} image="src/assets/images/person2.jpg" />
                        <TopRank rankClassName="rank-1" user={sortRank[0]} image="src/assets/images/person.jpg" />
                        <TopRank rankClassName="rank-3" user={sortRank[2]} image="src/assets/images/person3.jpg" />
                    </div>
                    <div className='previous-ranks'>
                        <PreviousRank  user={sortRank[user.length-1]} />
                        <PreviousRank user={sortRank[5]}  />
                        <PreviousRank user={sortRank[4]}  />
                    </div>
        </>
    )
}
export default Leaderboard