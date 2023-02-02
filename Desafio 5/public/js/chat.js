const socket = io();
const messageBox = document.getElementById("message-box");
let user;


Swal.fire({
    title: "Iniciar sesión",
    text: "Ingresá tu nombre de usuario",
    input: "text",
    confirmButtonText: "Hecho",
    allowOutsideClick: false,
    inputValidator: (input) => {
        if (!input) {
            return "Para utilizar el chat es necesario un nombre de usuario";
        }
        user = input;
        socket.emit("client:newuser", { user: user, id: socket.id });
    }
});


messageBox.addEventListener("keyup", (event) => {
    if ((event.key === "Enter") && (messageBox.value.trim().length > 0)) {
        socket.emit("client:newmessage", {
            user: user,
            message: messageBox.value,
        });
        messageBox.value = "";
    }
});


socket.on("server:newmessage", (data) => {
    const messages = document.getElementById("chat-box");
    let message = "";
    data.forEach((e) => {
        message += `
            <div class="message">
                <div class="message-sender">${e.user}</div>
                <p class="message-content">${e.message}</p>
            </div>
        `;
    });
    messages.innerHTML = message;
});


socket.on("server:newuser", (data) => {
    if (data.id !== socket.id) {
        Swal.fire({
            text: `${data.user} se ha conectado`,
            toast: true,
            position: "top-end",    
        });
    }
}); 