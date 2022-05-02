import React from 'react'


export function getUser(){
  var user = localStorage.getItem("currentUser")
  if(user !== null)
  {
    var x = JSON.parse(user)
    console.log(x.data.username)
    var username = x.data.username
    return <div>
         <h1>Welcome to your Dashboard: {username}</h1>
         <br/>
         <button onClick={logout}>Log Out</button> 
         <br/>
    </div>
  }

  if(user === null)
  {return <div><h1>Please Log In</h1> <button onClick={()=> {window.location.replace("/login")}}>Go to Login</button> </div>}
  
}

export function logout() {
  // remove user from local storage to log user out
  console.log('want to log out ')
  localStorage.removeItem('currentUser');
  window.location.replace("/")
}

class DashboardPage extends React.Component {
  // constructor(props: iUser)
  // {super(props)}
  render() {
    return (
      <div>
        {getUser()}
      </div>
    )
  }
}

export default DashboardPage
