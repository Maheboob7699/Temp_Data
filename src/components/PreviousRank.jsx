import '../assets/styles/PreviousRank.css';
function PreviousRank({user}){
    return(
        <>
         <div className='lower-rank' style={{display:'flex',justifyContent:'space-evenly'}}>
             {/* <h2 style={user?{justifyContent:'space-evenly'}:{margin:'auto'}}>{user ? user.name:"user not found"}</h2> */}

             {user ? (
                 <>
                  <h2>{user.name}</h2>
                  <h2>{user.email}</h2>
                  <h2>{user.score}</h2>
                 </>
                 )
                 : (
                    <h2>user not found</h2>
                 )
             }
         </div>
        </>
    )
}
export default PreviousRank