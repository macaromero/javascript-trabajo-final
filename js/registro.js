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
$(() => {
    $("#registro").on("submit", function (e) {
        e.preventDefault();
        let usuario = new Usuario;
        const url = "https://jsonplaceholder.typicode.com/posts";
        const method = $("#registro").attr("method");

        $.ajax({
            beforeSend: function(){
                $("#botonRegistro").attr("disabled", "true");
                $("#textoBotonRegistro").addClass("d-none");
                $("#spinner-registro").removeClass("d-none");
                usuario.nombre = $("#nombre").val();
                usuario.apellido = $("#apellido").val();
                usuario.dni = $("#dni").val();
                usuario.user = $("#user").val();
                usuario.password = $("#pass").val();
            },
            url: url,
            type: method,
            data: 
                {
                    "nombre": usuario.nombre, 
                    "apellido": usuario.apellido,
                    "dni": usuario.dni,
                    "user": usuario.user,
                    "password": usuario.password
                },
            success: function(jqXHR, resp, data){
                if ((usuario.nombre != "") && (usuario.apellido != "") && (usuario.dni != "") && (usuario.user != "") && (usuario.password != "")) {
                    sessionStorage.setItem("newUser", JSON.stringify(usuario));
                    let registro = document.querySelector("#registro__container");
                    registro.innerHTML =
                        `
                            <div class="row text-center">
                                <h2 class="colorPrincipal">¡Te registraste correctamente ${usuario.nombre}!</h2>
                            </div>
                            <div class="row justify-content-center mt-4">
                                <div class="col-6">
                                    <a class="btn w-100 home__productos-boton mt-4" href="./inicioSesion.html">Ya podés iniciar sesión con tu usuario y contraseña</a>
                                </div>
                            </div>
                        `;  
                } else {
                    let myModal = new bootstrap.Modal(document.getElementById('errorRegistro'));
                    myModal.show();
                    $("#botonRegistro").removeAttr("disabled");
                    $("#textoBotonRegistro").removeClass("d-none");
                    $("#spinner-registro").addClass("d-none");
                }
                                
            },
            error: function(jqXHR, status, resp) {
                alert("Ocurrió un error, volvé a intentarlo");
            }
        });     
    });
});



