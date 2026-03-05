import {useState, useEffect} from 'react'
import './App.css'

function App() {
  const[user,setUser]=useState([])

  const[newName,setName]=useState("")
  const[newGmail,setGmail]=useState("")
  const[newWeb,setWeb]=useState("")


  useEffect(()=>{
      fetch("https://jsonplaceholder.typicode.com/users")
      .then((response)=> response.json())
      .then((json)=> setUser(json))

  },[])

  const addUser=()=>{

    const name =newName.trim();
    const gmail=newGmail.trim();
    const web=newWeb.trim();

    if(name && gmail && web ){
      
      fetch("https://jsonplaceholder.typicode.com/users",
       {
          method:"POST",
          body: JSON.stringify({
              name,
              email:gmail,
              website: web,
            
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
       }) 
       .then(response=>response.json())
       .then(data=>{
         setUser([...user,data])

         setName("")
         setGmail("")
         setWeb("")
       })

      
    }


  }




  return (
    <>
    <div>
      <h1>Curd Operation</h1>
    </div>
    <div>
    <table>
      <thead>
        <tr>
        <td>id</td>
        <td>Name</td>
        <td>Gmail</td>
        <td>website</td>
        </tr>
      </thead>
      <tbody>
        {user.map(user => 
        <tr key={user.id}>
        <td >{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>

        <td>
      <button id="update">Update</button>
      </td>
      <td>
      <button id="delete" >Delete</button>
      </td>
           </tr>
       
     )}
   
      <tr>
        <td>
        </td>
        <td>
          <input type="text" id="name" className="name" placeholder="Enter Your name" value={newName} onChange={(e)=>setName(e.target.value)} />
        </td>
        <td>
          <input type="text" id="gmail" className="gmail" placeholder="Enter Your gmail" value={newGmail} onChange={(e)=> setGmail(e.target.value)} />
        </td>
        <td>
          <input type="text" id=" web" className="web" placeholder="Enter Your website" value={newWeb} onChange={(e) => setWeb(e.target.value)} />
        </td>
        <td>
          <button id="add" onClick={addUser}>Add</button>
        </td>
      </tr>
     
      
      </tbody>
    </table>
</div>
      
    </>
  )
}

export default App
