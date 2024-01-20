"use client"

import { useState } from "react"
import Chat from "./components/Chat"
export default function Home() {
 const [userName, setUsername] = useState("")
 const [isConnected, setConnect] = useState(false)

  if (!isConnected) {
return (<div className="w-full max-w-md mx-auto p-6"><div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
<div className="p-4 sm:p-7">
  <div className="text-center">
    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Enter a Username</h1>

  </div>

  <div className="mt-5">
    <form onSubmit={(e)=> e.preventDefault()}>
      <div className="grid gap-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold ml-1 mb-2 dark:text-white">So What should we call you?</label>
          <div className="relative">
            <input type="text" id="name" onChange={(e)=>setUsername(e.target.value)} name="name" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm text-black"/>
          </div>
        </div>
        <button type="submit"  onClick={()=> {
          (userName) ? setConnect(true) : setConnect(false)
        }} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Connect!</button>
      </div>
    </form>
  </div>
</div>
</div></div>)
  } else {
 return <div><Chat userName={userName}/></div>
}}
  