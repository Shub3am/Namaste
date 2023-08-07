import io from "socket.io-client";
async function getChat() {
  let socket = await io(":5000");
}

export default function Chat() {
  getChat();
  return <h1>Chat</h1>;
}
