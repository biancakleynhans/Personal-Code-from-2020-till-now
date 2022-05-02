import React from 'react'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// export function getUserDash(){
//   var user = localStorage.getItem("currentUser")
//   var username = ''


//   if(user !== null)
//   {
//     var x = JSON.parse(user)
//     console.log(x.data.username)
//     username = x.data.username
   
//     return <div>
//          <h1>Welcome to your Dashboard: {username}</h1>
//          <br/>
//          <button className="btn" onClick={logout}>
//           <span className="ico"><FontAwesomeIcon  icon="sign-out-alt"/> Logout</span>
//         </button> 
          
//          <br/>
//     </div>
//   }

//   if(user === null)
//   { 
//       return <div>
//         <h1>Please Log In</h1> 
//         <button className="btn" onClick={()=> {window.location.replace("/login")}}>
//         <span className="ico"><FontAwesomeIcon  icon="sign-in-alt"/> Go to Login</span>  
//         </button> 
//     </div>
//   }
  
// }

// function logout() {
//   // remove user from local storage to log user out
//   //console.log('want to log out ')
//   localStorage.removeItem('currentUser');
//   window.location.replace("/")
// }

export default class DashboardPage extends React.Component {
  
//   render() {
//     return (
//       <div>
//         {getUserDash()}
//       </div>
//     )
//   }
}
