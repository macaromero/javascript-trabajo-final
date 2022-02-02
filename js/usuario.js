/* Creación de la clase usuario */
class Usuario {
    constructor(nombre, apellido, dni, user, pass) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.user = user;
        this.password = pass
    };

    /* Métodos para la función de registro de usuario nuevo */
    preEnvio() {
        $("#botonRegistro").attr("disabled", "true");
        $("#textoBotonRegistro").addClass("d-none");
        $("#spinner-registro").removeClass("d-none");
        this.nombre = $("#nombre").val();
        this.apellido = $("#apellido").val();
        this.dni = $("#dni").val();
        this.user = $("#user").val();
        this.password = $("#pass").val();
    };

    registroExitoso() {
        sessionStorage.setItem("newUser", JSON.stringify(this));
        $("#registro__container").html(
            `
                <div class="row text-center">
                    <h2 class="colorPrincipal">¡Te registraste correctamente ${this.nombre}!</h2>
                </div>
                <div class="row justify-content-center mt-4">
                    <div class="col-6">
                        <a class="btn w-100 home__productos-boton mt-4" href="./inicioSesion.html">Ya podés iniciar sesión con tu usuario y contraseña</a>
                    </div>
                </div>
            `
        );
    };

    registroFallido() {
        let myModal = new bootstrap.Modal($('#errorRegistro'));
        myModal.show();
        $("#botonRegistro").removeAttr("disabled");
        $("#textoBotonRegistro").removeClass("d-none");
        $("#spinner-registro").addClass("d-none");
    };
};