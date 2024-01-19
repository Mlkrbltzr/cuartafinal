const socket = io()

document.getElementById('formAddProductInCart').addEventListener('submit', (e) => {
    e.preventDefault();

    const prodId = document.getElementById('id_prod').innerText;
    const quantityValue = document.getElementById('quantityValue').innerText;
    const email = document.getElementById('email').innerText;

    socket.emit("newProdInCart",{idProd: prodId,quantity:quantityValue, email});
   }
)

socket.on("success", (data) => {
    Swal.fire({
        icon: 'success',
        title: data,
        text: `Correo enviado`,
        confirmButtonText: 'Aceptar', // Cambia el texto del botón Aceptar
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/current'; // Recarga la página cuando se hace clic en Aceptar
        }
    });
});

// socket.on("test", data => {
//     console.log(data)
// })
//const socket = io()

//----------------------Enviar------------//
//socket.emit("message", "!Hola, me estoy comunicando desde un websocket!")
//----------------------------------------//
//--------------------Recibir en Consola de Navegador----------//
// socket.on("test", data => {
//     console.log(data)
// })
//---------------------------------------------------------------//
