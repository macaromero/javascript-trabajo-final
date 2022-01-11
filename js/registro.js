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
const registro = (e) => {
    e.preventDefault();
    let form = e.target;
    let usuario = new Usuario;

    usuario.nombre = form.children[0].children[1].value;
    usuario.apellido = form.children[1].children[1].value;
    usuario.dni = form.children[2].children[1].value;
    usuario.user = form.children[3].children[1].value;
    usuario.password = form.children[4].children[1].value;

    if ((usuario.nombre != "") && (usuario.apellido != "") && (usuario.dni != "") && (usuario.user != "") && (usuario.password != "")) {
        localStorage.setItem("newUser", JSON.stringify(usuario));
        let registro = document.querySelector("#registro__container");
        registro.innerHTML = `
            <div class="row text-center">
                <h2 class="colorPrincipal">¡Te registraste correctamente!</h2>
            </div>
            <div class="row justify-content-center mt-4">
                <div class="col-6">
                    <a href="../index.html" class="btn w-100 productos__boton mt-4">Volvé al inicio para iniciar sesión</a>
                </div>
            </div>
        `
    } else {
        let myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        myModal.show()
    };
};