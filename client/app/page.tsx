"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export default function Home() {
  const [id, setId] = useState("")
  const [users, setUsers] = useState([])
  useEffect(()=> {
    const socket = io(":8000", {autoConnect: false})
    socket.connect()
    socket.on("connect", ()=> {
      console.log("We Are Connected")
    })
    socket.on("firstConnect", (data: string)=>{
      setId(data)
    })
    socket.on("joined", (user: string)=> {
      let filterdMine = user.filter(item=> item!=id)
      setUsers(filterdMine)
    })
    socket.on("userLeft", (user)=>{
      let filterdMine = user.filter(item=> item!==id)
      setUsers(filterdMine)
    })

    return ()=> {
      socket.close()
    }
  },[])
  const others = users.map(user=> <li key={user}>{user}</li>)
  return <div><h1>{id}</h1>
  <h2>Other Users</h2>
  <ul>{others}</ul></div>


}
  