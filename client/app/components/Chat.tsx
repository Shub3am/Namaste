"use client"
import { io } from "socket.io-client"
import { useState, useEffect } from "react"

type Socket = {
  id: string, emit: Function, on: Function, connect: Function, off: Function, disconnect: Function
}


function Header({userName}) {
   return         <header className="bg-white"><div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
   <div className="sm:flex sm:items-center sm:justify-between">
     <div className="text-center sm:text-left">
       <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back, {userName}!</h1>

       <p className="mt-1.5 text-sm text-gray-500">Let's talk anonymously and be a privacy advocate! 🎉</p>
     </div>

     <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
       <a href="https://vshubham.xyz" target="_blank"><button
         className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
         type="button"
       >
         <span className="text-sm font-medium"> View Website </span>

         <svg
           xmlns="http://www.w3.org/2000/svg"
           className="h-4 w-4"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
           strokeWidth="2"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
           />
         </svg>
       </button></a>

     </div>
   </div>
 </div></header>
}

function SideBar({setUser, allUsers}) {
   let users = Object.keys(allUsers).map(userId=><div key={userId} onClick={()=>setUser({userName: allUsers[userId].userName, id: userId, messages: allUsers[userId].messages})} className="p-2 border-b-2"><h1>{allUsers[userId].userName}</h1>
   </div>)
   return (      <div className="sidebar col-span-1 text-black sm:border-r-2">
   <div className="sm:hidden"><button>Click Me</button></div>
   <div className="hidden sm:block">         
   {users}
      </div>

</div>)
}

function ChatWindow({chatUser, sendMessage}: {chatUser: {userName: string, id: string, messages: [String]}, sendMessage: Function}) {
  const [message, setMessage] = useState("")
  let prevMessages = chatUser.messages ? chatUser.messages.map(x=> { return (<p className="text-black">{x}</p>)}) : ""
   return (      <div className="chat-window col-span-4 relative">
   <div className={`status-bar p-2 ${chatUser.id ? "border-b-2" : null}`}>
   <h1 className="text-black">{chatUser.id ? `Talking to ${chatUser.userName}`: null}</h1>
   </div>{prevMessages}
   {chatUser ? <div className="absolute bottom-0 border-4 w-full p-2 text-black">
      <form className="grid grid-cols-5" onSubmit={(e)=>e.preventDefault()}>
   <input className="col-span-4 outline-none" type="text" onChange={(event)=> setMessage(event.target.value)} required placeholder="Send a message!"/> <button onClick={()=> {sendMessage(message)}} className="col-span-1 border-l-2" type="submit">Send Message</button></form></div> : null}
   
   
   </div>)
}


export default function Chat({userName}: {userName: string}) {
  const [currentSocket, setSocket] = useState([])
    const [socketId, setId] = useState("")
    const [currentChatUser, setCurrentUser] = useState("")
    const [message, setMessage] = useState("")
    const [chatUsers, setUsers] = useState({})
    useEffect(()=> {
        const socket: Socket = io(":8000", {autoConnect: false})
        socket.connect()
        
        //Sending Username to Server
        socket.on("firstConnect", (id:string)=> {
            setSocket(socket)
            setId(id)
            socket.emit("registerUser", userName)
        })

        //Initial Users that were connected
        socket.on("getUsers", (previousUsers)=>{
         setUsers(previousUsers) 
        })

        //New User Connected
        socket.on("userAdded", (user: {userName: string, messages: Array, id: number})=> {
         
         setUsers((oldUsers)=> { 
          return ({...oldUsers, [user.id]:{userName: user.userName, messages: user.messages}})})
        })

        //User Left
        socket.on("userRemoved", (userId)=>{

         setUsers((previousUsers)=> {     
            let prevUsers = {...previousUsers}; //deep copy
            delete prevUsers[userId];          
          return prevUsers;
         
        }) })

        //Receive Message
        socket.on("receiveMessage", (payload:{message: string, senderId: string})=> {
          setUsers((users)=> {
            let updatedUsers = {...users}

            console.log(updatedUsers[payload.senderId], 'check')
            updatedUsers[payload.senderId].messages.push(payload.message)
            console.log(updatedUsers)
            return updatedUsers
          })
          console.log("Message received:", payload.message,  "by" ,payload.senderId)


        })
        return () => {
            socket.off("firstConnect")
            socket.off("userAdded")
            socket.off("getUsers")
            socket.off("sendMessage")
            socket.off("receiveMessage")
            socket.disconnect()
        }
    }, [])
    useEffect(()=> {
      //message schema: {username, id, messagePayload}

      //Checking whether socket has been initialized on first render
      if (currentSocket.id) {
        
      currentSocket.emit("sendMessage", {receiverId: currentChatUser.id, senderId: socketId,message, time: new Date()})
       
    }
    
    }, [message, currentSocket])
    return <div>
        
    <Header userName={userName}/>

    <div className="w-9/12 h-96 bg-white my-5 grid grid-cols-5 m-auto border rounded-md shadow-md">
    <SideBar setUser={setCurrentUser} allUsers={chatUsers}/>  
         <ChatWindow chatUser={currentChatUser} sendMessage={setMessage}/>
         </div>

  </div>

}
