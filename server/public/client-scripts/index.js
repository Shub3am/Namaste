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
  const Loader = document.querySelector(".loaderContainer");
  document.querySelector("body").removeChild(Loader);

  socket.once("First_Time", ({ data }) => {
    data.length
      ? data.forEach((single) => {
          console.log(single);
          const New_Message = document.createElement("li");
          New_Message.textContent = single;
          message_box.appendChild(New_Message);
        })
      : null;
  });
});
socket.on("connect_error", () => {
  console.log("Connection Lost");
});
socket.on("disconnect", () => {
  console.log("error");
  const Loader_Container = document.createElement("div");
  const Loader = document.createElement("div");
  Loader.classList.add("loader");
  Loader_Container.classList.add("loaderContainer");
  Loader_Container.appendChild(Loader);
  document.querySelector("body").appendChild(Loader_Container);
});
socket.on("all_messages", (data) => {
  data.forEach((single) => {
    const New_Message = document.createElement("li");
    New_Message.textContent = single;
    message_box.appendChild(New_Message);
  });
});
