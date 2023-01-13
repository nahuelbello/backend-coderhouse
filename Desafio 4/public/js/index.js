const socket = io();

socket.emit("message", "mensaje del cliente");