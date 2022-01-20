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
                $("#estado").text("Enviando");
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
                sessionStorage.setItem("newUser", JSON.stringify(usuario));
                let registro = document.querySelector("#registro__container");
                registro.innerHTML =
                    `
                        <div class="row text-center">
                            <h2 class="colorPrincipal">¡Te registraste correctamente ${usuario.nombre}!</h2>
                        </div>
                        <div class="row text-center mt-4">
                            <h3 class="colorPrincipal">Ya podés iniciar sesión con tu usuario y contraseña</h3>
                        </div>
                    `;                  
            },
            error: function(jqXHR, status, resp) {
                let myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                myModal.show()
            }
        });     
    });
});



