import '../assets/styles/PreviousRank.css';
function PreviousRank({user}){
    return(
        <>
         <div className='lower-rank'>
             <h2 style={user?{}:{margin:'auto'}}>{user ? user.name:"user not found"}</h2>
         </div>
        </>
    )
}
export default PreviousRank