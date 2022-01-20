// Array de usuarios //
let usuarios = [];
let usuario;
let password;

$(() => {
    //Llamada al json de usuarios
    const url = "../json/usuarios.json";
    $.getJSON(url, (data, status) => {
        if (status == "success") {
            for (const dato of data) {
                usuarios.push(dato)
            };
        };
    });
});


// FUNCIONES //

// Funciones para iniciar y cerrar sesión
function iniciarSesion (e) {
    e.preventDefault();
    const url = "https://jsonplaceholder.typicode.com/posts";
    const method = $("#formulario").attr("method");
    let user;
    let pass;
    let usuarioNuevo_objeto = JSON.parse(sessionStorage.getItem("newUser"));
    let usuarioNuevo = usuarioNuevo_objeto.user;
    let passwordNuevo = usuarioNuevo_objeto.password;


    $.ajax({
        beforeSend: function(){
            user = $("#nombreUser").val();
            pass = $("#passUser").val();
        },
        url: url,
        type: method,
        data: {"nombreUser": user, "passUser": pass},
        success: function(jqXHR, resp, data){
            let marcador = false
            for (const u of usuarios) {
                if (((u.nombreUser == user) && (u.passUser == pass)) || ((user == usuarioNuevo) && (pass == passwordNuevo))) {
                        marcador = true;
                        break
                    }
            }
            if (marcador == true) {
                sessionStorage.setItem("usuario", user);
                sesionIniciada();
            } else {
                alert("Ingresaste un usuario o contraseña errónea, volvé a intentarlo");
            }
            
            
        },
        error: function(jqXHR, status, resp) {
            alert("Ocurrió un error, volvé a intentarlo");
        }
    });
};       

function cerrarSesion (e) {
    e.preventDefault();
    let userBoton = document.querySelector("#userDropdown");
    sessionStorage.removeItem("usuario");
    userBoton.innerHTML = 
    `
        <a class="btn dropdown-toggle p-0" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-user usuario__boton"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-end p-3" id="navbar__dropdown-menu">
            <form action="" id="formulario" onsubmit="iniciarSesion(event)" method="post">
                <div class="mb-3">
                    <label for="nombreUser" class="form-label">Nombre de usuario</label>
                    <input class="form-control" id="nombreUser" placeholder="email@ejemplo.com">
                </div>
                <div class="mb-3">
                    <label for="passUser" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="passUser" placeholder="*********">
                </div>
                <input type="submit" class="btn btn-primary w-100 mt-2" id="userBoton" value="Enviar"/>
            </form>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="./pages/registro.html">Registrarme</a>
            <a class="dropdown-item" href="#">Olvidé mi contraseña</a>
        </div>
    `;
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
    };   
};

//Llamada a funciones
sesionIniciada();









