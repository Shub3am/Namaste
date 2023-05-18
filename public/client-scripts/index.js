const messages = document.querySelector("#Messages");
// const names = document.querySelector("#name");
const message = document.querySelector("#message-text");
const send_message = document.querySelector("#message-btn");
const message_box = document.querySelector(".Message-Box");
send_message.addEventListener("click", () => {
  socket.emit("message", message.value);
});

socket.on("connection", (connection) => {
  console.log("We are Connected", connection);
});

socket.on("connect", (connection) => {
  socket.emit("New_User");
});
socket.on("all_messages", (data) => {
  data.forEach((single) => {
    const New_Message = document.createElement("li");
    New_Message.textContent = single;
    message_box.appendChild(New_Message);
  });
});
