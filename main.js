// Variable de usuario
let user = new Usuario;
user = JSON.parse(sessionStorage.getItem("usuario"));


// FUNCIONES

/* Función para que el badge muestre la cantidad de productos que hay en el carrito */
const actualizarBadge = () => {

    // Chequeo si existe el carrito en el sessionStorage, si el usuario tiene la sesión iniciada y si el badge no existe
    if ((sessionStorage.getItem("carrito")) && (sessionStorage.getItem("usuario")) && ($("#badgeCarrito").length == 0)) {

        // Creo la variable del carrito y establezco el nuevo valor del badge
        let carrito = JSON.parse(sessionStorage.getItem("carrito"));
        $("#iconoCarrito").html(
            `
                <span class="position-absolute translate-middle badge rounded-pill bg-danger navbar__carrito-badge" id="badgeCarrito">
                    ${carrito.length}
                </span>
            `
        );
    }; 
};

/* Función para que la sesión quede iniciada */
const sesionIniciada = (user) => {  
    
    // Chequeo si existe un usuario con sesión iniciada
    if (user) {     

        // Si es así, modifico el html para que la navbar quede con su nombre y el menú se modifique
        $("#userDropdown").html( 
            `
                <a class="btn dropdown-toggle p-0" data-bs-toggle="dropdown" aria-expanded="false" id="nombreUsuario">
                    ${user.user}
                </a>
        
                <ul class="dropdown-menu dropdown-menu-end" id="navbar__dropdown-menu">
                    <li><a class="dropdown-item" href="" id="modificarUsuario">Modificar datos</a></li>
                    <li><a class="dropdown-item" id="cerrarSesion" href="">Cerrar sesión</a></li>
                </ul>
            `
        );
        
        // Si el usuario está en la página de inicio de sesión con la sesión iniciada, le modifico el html
        if ($("#sesion__container")) {
            $("#sesion__container").html(
                `
                    <div class="row text-center">
                        <h2 class="colorPrincipal">¡Bienvenido a Como Perro & Gato ${user.nombre}!</h2>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="col-6">
                            <a class="btn w-100 home__productos-boton mt-4" href="./productos.html">Mirá todos los productos que tenemos para vos</a>
                        </div>
                    </div>
                `
            );   
        };

        // Si el usuario está en la página de registro con la sesión iniciada, le modifico el html
        if ($("#registro__container")) {
            $("#registro__container").html(
                `
                    <div class="row text-center">
                        <h2 class="colorPrincipal">¡Ya tenés un usuario ${user.nombre}!</h2>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="col-6">
                            <a class="btn w-100 home__productos-boton mt-4" href="./productos.html">Mirá todos los productos que tenemos para vos</a>
                        </div>
                    </div>
                `
            );
        };
    };   
};

/* Función que se dispara al clickear en el botón de "Modificar datos" del usuario */
$("#userDropdown").on("click", "#modificarUsuario", function(e) {

    // Prevengo la acción por default del click y redirecciono al usuario a la página de modificar usuario
    e.preventDefault();
    location.replace("/pages/modificarUsuario.html");  
});

/* Función que se dispara al clickear en el botón de "Cerrar sesión" del usuario */       
$("#userDropdown").on("click", "#cerrarSesion", function(e) {

    // Prevengo la acción por default del click, elimino al usuario del sessionStorage, vacío el carrito (tanto del html como del sessionStorage) y mando al usuario al home
    e.preventDefault();
    sessionStorage.removeItem("usuario");
    $("#iconoCarrito").empty();
    sessionStorage.removeItem("carrito");
    location.replace("/index.html");   
});


// Llamada a las funciones
actualizarBadge();
sesionIniciada(user);








