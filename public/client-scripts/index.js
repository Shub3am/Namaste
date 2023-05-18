socket.on("connection", (connection) => {
  console.log("We are Connected", connection);
});

socket.emit("Hello", "Response from Client");
socket.on("Hello", (data) => {
  console.log(data);
});

socket.on("disconnect", (connection) => {
  console.log("We are learving", connection);
});

socket.on("connect", (connection) => {
  console.log("We are back", connection);
});
