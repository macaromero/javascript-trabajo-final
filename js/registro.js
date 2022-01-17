// CREACIÓN DE LA CLASE USUARIO //
class Usuario {
    constructor(nombre, apellido, dni, user, pass) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.user = user;
        this.password = pass
    }
};


// FUNCIÓN DE REGISTRO //
let registro = document.querySelector("#registro");
if (registro != null) {
    registro.addEventListener("submit", (e) => {
        e.preventDefault();
        let form = e.target;
        let usuario = new Usuario;
    
        usuario.nombre = form.children[0].children[1].value;
        usuario.apellido = form.children[1].children[1].value;
        usuario.dni = form.children[2].children[1].value;
        usuario.user = form.children[3].children[1].value;
        usuario.password = form.children[4].children[1].value;
    
        if ((usuario.nombre != "") && (usuario.apellido != "") && (usuario.dni != "") && (usuario.user != "") && (usuario.password != "")) {
            sessionStorage.setItem("newUser", JSON.stringify(usuario));
            let registro = document.querySelector("#registro__container");
            registro.innerHTML = `
                <div class="row text-center">
                    <h2 class="colorPrincipal">¡Te registraste correctamente!</h2>
                </div>
                <div class="row text-center mt-4">
                    <h3 class="colorPrincipal">Ya podés iniciar sesión</h3>
                </div>
            `;
        } else {
            let myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            myModal.show()
        };
    });
};


