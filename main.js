// VARIABLES A UTILIZAR //
const usuario_objeto = JSON.parse(sessionStorage.getItem("newUser")) || {};
const usuario = usuario_objeto.user || null;
const password = usuario_objeto.password || null;


// FUNCIONES //

// Funciones para iniciar y cerrar sesión
const iniciarSesion = (e) => {
    e.preventDefault();
    let form = e.target;
    let user;
    let pass;

    if (user == undefined) {
        user = formulario.children[0].children[1].value;
        pass = formulario.children[1].children[1].value;

        if ((user == usuario) && (pass == password)) {
                sessionStorage.setItem("usuario", user);
                sesionIniciada();
        } else {
            alert("Ingresaste un usuario o contraseña errónea, volvé a intentarlo");
        };
    };
}

const sesionIniciada = () => {
    let userDropdown = document.getElementById("userDropdown");
    
    if (sessionStorage.getItem("usuario")) {
        let user = sessionStorage.getItem("usuario");
        
        userDropdown.innerHTML = `
            <a class="btn dropdown-toggle p-0" data-bs-toggle="dropdown" aria-expanded="false">
                ${user}
            </a>
    
            <ul class="dropdown-menu dropdown-menu-end" id="navbar__dropdown-menu">
                <li><a class="dropdown-item" href="#">Modificar datos</a></li>
                <li><a class="dropdown-item" href="#" id="cerrarSesion" onclick="cerrarSesion()">Cerrar sesión</a></li>
            </ul>
        `;

        sessionStorage.setItem("usuarioIniciado", user);
        sessionStorage.removeItem("usuario");
    }
    
};

const usuarioNavbar = () => {
    let userDropdown = document.getElementById("userDropdown");
    
    if (sessionStorage.getItem("usuarioIniciado")) {
        let user = sessionStorage.getItem("usuarioIniciado");
        
        userDropdown.innerHTML = `
            <a class="btn dropdown-toggle p-0" data-bs-toggle="dropdown" aria-expanded="false">
                ${user}
            </a>
    
            <ul class="dropdown-menu dropdown-menu-end" id="navbar__dropdown-menu">
                <li><a class="dropdown-item" href="#">Modificar datos</a></li>
                <li><a class="dropdown-item" href="#" id="cerrarSesion" onclick="cerrarSesion()">Cerrar sesión</a></li>
            </ul>
        `;
    }
}

const cerrarSesion = () => {
    let userBoton = document.querySelector("#userDropdown");
    sessionStorage.removeItem("usuarioIniciado");
    userBoton.innerHTML = `
        <a class="btn dropdown-toggle p-0" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-user usuario__boton"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-end p-3" id="navbar__dropdown-menu">
            <form action="" id="formulario" onsubmit="iniciarSesion(event)">
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
    `
};

usuarioNavbar();






