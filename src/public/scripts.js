// Conectar al servidor de socket.io
const socket = io({
  withCredentials: true, // Habilita el envío de cookies con las solicitudes
});

// Manejar evento de conexión establecida
socket.on('conexion-establecida', (mensaje) => {
  console.log('Mensaje del servidor:', mensaje);
});

// Manejar evento de nuevo producto
socket.on('newProduct', (data) => {
  console.log('Nuevo producto:', data);
  const productsElements = document.getElementById("products");
  console.log('Lista de productos:', productsElements);
  const productElement = document.createElement('li');
  productElement.innerHTML = `${data.title} - ${data.description}`;
  productsElements.appendChild(productElement);
});

// Manejar evento de eliminar producto
socket.on('deleteProduct', (id) => {
  console.log('Eliminar producto:', id);
  const productElement = document.getElementById(id);
  if (productElement) {
    productElement.remove();
    console.log('Producto eliminado de la interfaz');
  } else {
    console.log('Producto no encontrado en la interfaz');
  }
});

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM completamente cargado');

  // Obtener botones de detalle
  const detalleButtons = document.querySelectorAll(".detalle-button");
  detalleButtons.forEach((button) => {
    // Agregar evento click a los botones de detalle
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.dataset.productId;
      console.log('Botón de detalle clicado para el producto ID:', productId);
      window.location.href = `/product/${productId}`;
    });
  });

  // Obtener botón de carrito
  const carritoBtn = document.getElementById("carrito-compra");

  // Función asíncrona para obtener el ID del carrito del usuario
  async function obtenerIdCarrito() {
    try {
      const userResponse = await fetch("/api/carts/getusercart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log('ID del carrito del usuario:', userData.cartId);
        return userData.cartId;
      } else {
        const errorData = await userResponse.json();
        console.error('No se pudo obtener el ID del carrito:', errorData);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el ID del carrito:', error);
      return null;
    }
  }

  // Agregar evento click al botón de carrito
  if (carritoBtn) {
    carritoBtn.addEventListener("click", async () => {
      try {
        const carritoId = await obtenerIdCarrito();
        if (carritoId) {
          console.log('Redirigiendo a la página de detalles del carrito:', carritoId);
          window.location.href = `/cart/detail/${carritoId}`;
        } else {
          console.error("No se pudo obtener el ID del carrito.");
        }
      } catch (error) {
        console.error("Error al obtener el ID del carrito:", error);
      }
    });
  }

  // Obtener formulario de registro
  const formulario = document.getElementById("messageForm");

  // Agregar evento submit al formulario de registro
  if (formulario) {
    formulario.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("message").value;

      // Verificar si el campo de mensaje está vacío
      const datos = { nombre, apellido, email, password, message };

      try {
        const response = await fetch("/Register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos)
        });

        if (!response.ok) {
          const errorData = await response.json();

          if (response.status === 400) {
            showError("El correo ya está registrado");
          } else {
            showError("Error al guardar el usuario y el mensaje");
          }

          console.error('Error durante la solicitud:', errorData);
          return;
        }

        showSuccess("Usuario y mensaje guardados con éxito");
        console.log('Formulario de registro enviado con éxito');
        formulario.reset();
      } catch (error) {
        console.error('Error durante la solicitud:', error);
        showError('Hubo un error durante la solicitud. Por favor, inténtalo de nuevo más tarde.');
      }
    });
  }

  // ... (otros eventos y código)

  // Manejar evento de reset de contraseña
  const resetPasswordForm = document.getElementById("resetPasswordForm");
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Verificar si las contraseñas coinciden
      if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      try {
        const response = await fetch("/actualizar-pass", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, newPassword })
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert("Tiempo de enlace expirado, redirigiendo al inicio.");
            window.location.href = "/login"; // Redirigir a la página de inicio de sesión
            return
          }
          throw new Error('Error al actualizar la contraseña');
        }
        const data = await response.json();
        alert("Contraseña actualizada correctamente");
        console.log('Contraseña actualizada correctamente:', data);
      } catch (error) {
        // Manejar errores
        console.error('Error:', error.message);
      }
    });
  }
});
