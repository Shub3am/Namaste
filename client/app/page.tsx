"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

function filterSelf(users: any, id:string) {
  // return users.
  return users.filter(item=> item!=id)
}

export default function Home() {
  const socket = io(":8000", {autoConnect: false})
  const [users, setUsers] = useState([])
  const [id, setId] = useState("")
  

  useEffect(()=> {
    
    socket.connect()

    socket.on("connect", ()=> {
      console.log("Connected!")
    })

    socket.on("firstConnect", (id)=> {
      setId(id)
    })

    socket.on("joined", (newId)=> {
      console.log([...users,newId], "id", newId)
      setUsers([...users,newId]);
      console.log(users)
    })

    socket.on("left", (userId)=> {
      let oldUsers = users
      delete oldUsers[userId]
      setUsers(oldUsers)
    })
    return () => {
      socket.off("connect")
      socket.off("joined")
      socket.off("firstConnect")
      socket.off("left")
      socket.disconnect()
    }
  }, [])
  const others = users.map(user=> <li key={user}>{user}</li>)
  return <div className="p-20 border-white border-solid"><h1>{id}</h1>
  <h2>Others</h2><ul>{others}</ul>
</div>


}
  