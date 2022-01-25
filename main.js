// VARIABLES
let usuarios = [];
let usuario;
let password;

$(() => {
    /* Llamada al json de usuarios */
    const url = "../json/usuarios.json";
    $.getJSON(url, (data, status) => {

        // Si la llamada es exitosa, se pushea el usuario al array de usuarios
        if (status == "success") {
            for (const dato of data) {
                usuarios.push(dato)
            };
        };
    });
});

$(() => {
    /* Función de la creación del carrito */
    const actualizarBadge = () => {
        let badge = $("#iconoCarrito");

        // Chequeo si existe el carrito en el sessionStorage, si el usuario tiene la sesión iniciada y si el badge no existe
        if ((sessionStorage.getItem("carrito")) && (sessionStorage.getItem("usuario")) && ($("#badgeCarrito").length == 0)) {

            // Creo la variable del carrito y establezco el nuevo valor del badge
            let carrito = JSON.parse(sessionStorage.getItem("carrito"));
            badge.html(
                `
                    <span class="position-absolute translate-middle badge rounded-pill bg-danger navbar__carrito-badge" id="badgeCarrito">
                        ${carrito.length}
                    </span>
                `
            );
        }; 
    };
    
    // Llamo a la función
    actualizarBadge();
});


// FUNCIONES

/* Funciones para iniciar y cerrar sesión */
function iniciarSesion (e) {
    e.preventDefault();
    const url = "https://jsonplaceholder.typicode.com/posts";
    const method = $("#formulario").attr("method");
    let user;
    let pass;
    let usuarioNuevo_objeto = JSON.parse(sessionStorage.getItem("newUser")) || {};
    let usuarioNuevo = usuarioNuevo_objeto.user || null;
    let passwordNuevo = usuarioNuevo_objeto.password || null;

    $.ajax({
        beforeSend: function(){
            $("#userBoton").attr("disabled", "true");
            $("#textoBoton").addClass("d-none");
            $("#spinner-sesion").removeClass("d-none");
            user = $("#nombreUser").val();
            pass = $("#passUser").val();
        },
        url: url,
        type: method,
        data: {"nombreUser": user, "passUser": pass},
        success: function(jqXHR, resp, data){
            if ((user != "") && (pass != "")) {
                let marcador = false
                for (const u of usuarios) {
                    if (((u.nombreUser == user) && (u.passUser == pass)) || ((user == usuarioNuevo) && (pass == passwordNuevo))) {
                            marcador = true;
                            break
                    }
                };
                if (marcador == true) {
                    sessionStorage.setItem("usuario", user);
                    sesionIniciada();
                } else {
                    let myModal = new bootstrap.Modal(document.getElementById('errorSesion'));
                    myModal.show();
                    $("#userBoton").removeAttr("disabled");
                    $("#textoBoton").removeClass("d-none");
                    $("#spinner-sesion").addClass("d-none");
                };
            } else {
                let myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                myModal.show();
                $("#userBoton").removeAttr("disabled");
                $("#textoBoton").removeClass("d-none");
                $("#spinner-sesion").addClass("d-none");
            };
        },
        error: function(jqXHR, status, resp) {
            alert("Ocurrió un error, volvé a intentarlo");
        }
    });
};       

function cerrarSesion (e) {
    e.preventDefault();
    let userBoton = document.querySelector("#userDropdown");
    let sesion = document.querySelector("#sesion__container");
    sessionStorage.removeItem("usuario");
    $("#iconoCarrito").empty();
    sessionStorage.removeItem("carrito");

    if ($("#listaProductos").length == 1) {      
        userBoton.innerHTML = 
            `
                <a class="btn dropdown-toggle p-0" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user usuario__boton"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-end p-3" id="navbar__dropdown-menu">
                    <a class="dropdown-item" href="./pages/inicioSesion.html">Iniciar sesión</a>
                    <a class="dropdown-item" href="./pages/registro.html">Registrarme</a>
                </div>
            `;
    } else {
        userBoton.innerHTML = 
            `
                <a class="btn dropdown-toggle p-0" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user usuario__boton"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-end p-3" id="navbar__dropdown-menu">
                    <a class="dropdown-item" href="./inicioSesion.html">Iniciar sesión</a>
                    <a class="dropdown-item" href="./registro.html">Registrarme</a>
                </div>
            `;
    }

    if (sesion) {
        sesion.innerHTML =
            `
                <div class="row text-center">
                    <h2 class="colorPrincipal">Iniciá sesión</h2>
                </div>
                <div class="row colorPrincipal justify-content-center">
                    <div class="col-6">
                        <form id="formulario" method="post" onsubmit="iniciarSesion(event)" class="p-4">
                            <div class="mb-3">
                                <label for="nombreUser" class="form-label">Nombre de usuario</label>
                                <input class="form-control" id="nombreUser" placeholder="email@ejemplo.com">
                            </div>
                            <div class="mb-3">
                                <label for="passUser" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="passUser" placeholder="*********">
                            </div>
                            <button class="btn w-100 home__productos-boton mt-4" type="submit" id="userBoton">
                                <span id="textoBoton">Enviar</span>
                                <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" id="spinner-sesion"></span>
                            </button>
                        </form>
                    </div>
                </div>
            `;
    }
    
};

// Función para que la sesión quede iniciada
const sesionIniciada = () => {  
    let userDropdown = document.getElementById("userDropdown");
    
    if (sessionStorage.getItem("usuario")) { 
        let user = sessionStorage.getItem("usuario");    
        userDropdown.innerHTML = 
            `
                <a class="btn dropdown-toggle p-0" data-bs-toggle="dropdown" aria-expanded="false">
                    ${user}
                </a>
        
                <ul class="dropdown-menu dropdown-menu-end" id="navbar__dropdown-menu">
                    <li><a class="dropdown-item" href="#">Modificar datos</a></li>
                    <li><a class="dropdown-item" id="cerrarSesion" href="" onclick="cerrarSesion(event)">Cerrar sesión</a></li>
                </ul>
            `;

        if (document.querySelector("#sesion__container")) {
            let sesion = document.querySelector("#sesion__container");
            sesion.innerHTML =
                `
                    <div class="row text-center">
                        <h2 class="colorPrincipal">¡Bienvenido a Como Perro & Gato ${user}!</h2>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="col-6">
                            <a class="btn w-100 home__productos-boton mt-4" href="./productos.html">Mirá todos los productos que tenemos para vos</a>
                        </div>
                    </div>
                `;   
        }
    };   
};

//Llamada a funciones
sesionIniciada();









