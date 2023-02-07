const socket = io();
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
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
        socket.emit("client:newUser", { user: user, id: socket.id });
    }
});


messageInput.addEventListener("keyup", (event) => {
    if ((event.key === "Enter") && (messageInput.value.trim().length > 0)) {
        socket.emit("client:newMessage", {
            user: user,
            message: messageInput.value,
        });
        messageInput.value = "";
    }
});


socket.on("server:newUser", (data) => {
    if (data.id !== socket.id) {
        Swal.fire({
            text: `${data.user} se ha conectado`,
            toast: true,
            position: "top-end",    
        });
    }
});


socket.on("server:newMessage", (data) => {
    let messages = "";
    data.forEach((e) => {
        messages += `
            <div class="message-card">
                <p class="message-sender">${e.user}</p>
                <p class="message-content">${e.message}</p>
            </div>
        `;
    });
    chatBox.innerHTML = messages;
});