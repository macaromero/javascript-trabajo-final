// Variable de usuario
let usuario = new Usuario;
usuario = JSON.parse(sessionStorage.getItem("usuario"));

$(() => {
 
    /* Función para activar los campos a modificar al clickear en el botón de editar */
    $("#modificarDatos").click((e) => {
        e.preventDefault();
        $("#nombre").removeAttr("disabled");
        $("#apellido").removeAttr("disabled");
        $("#dni").removeAttr("disabled");
        $("#user").removeAttr("disabled");
        $("#pass").removeAttr("disabled");
        $("#enviarModificacion").removeClass("d-none");
        $("#botonPassword").removeAttr("disabled");
    });

    /* Función para visibilizar la contraseña */
    $("#botonPassword").click((e) => {
        e.preventDefault();

        // Chequeo la clase del ícono
        if ($("#iconoPassword").attr("class") == "fas fa-eye-slash") {

            // Si el ícono es el del ojo cerrado, la modifico y pongo el del ojo abierto y cambio el tipo de input para que se pueda ver la contraseña
            $("#iconoPassword").removeClass("fas fa-eye-slash");
            $("#iconoPassword").addClass("fas fa-eye");
            $("#pass").attr("type", "text");
        } else {

            // Si el ícono es el del ojo abierto, la modifico y pongo el del ojo cerrado y cambio el tipo de input para que no se pueda ver la contraseña
            $("#iconoPassword").removeClass("fas fa-eye");
            $("#iconoPassword").addClass("fas fa-eye-slash");
            $("#pass").attr("type", "password");
        };
    });

    /* Función para establecer los valores a modificar en el formulario */
    const establecerValores = () => {
        $("#nombre").attr("value", usuario.nombre).attr("disabled", "true");
        $("#apellido").attr("value", usuario.apellido).attr("disabled", "true");
        $("#dni").attr("value", usuario.dni).attr("disabled", "true");
        $("#user").attr("value", usuario.user).attr("disabled", "true");
        $("#pass").attr("value", usuario.password).attr("disabled", "true");
    };

    // Llamada a la función
    establecerValores();
});

$(() => {

    /* Función para enviar el formulario */
    $("#modificar-usuario").on("submit", function(e) {
        e.preventDefault();
        const url = "https://jsonplaceholder.typicode.com/posts";
        const method = $("#modificar-usuario").attr("method");

        $.ajax({

            // Antes de enviar, seteo los valores del objeto usuario y bloqueo el botón de enviar, además de visibilizar el spinner
            beforeSend: function() {
                $("#enviarModificacion").attr("disabled", "true");
                $("#textoEnviarModificacion").addClass("d-none");
                $("#spinner-modificacion").removeClass("d-none");
                $("#botonPassword").attr("disabled", "true");
                usuario.nombre = $("#nombre").val();
                usuario.apellido = $("#apellido").val();
                usuario.dni = $("#dni").val();
                usuario.user = $("#user").val();
                usuario.password = $("#pass").val();
            },
            url: url,
            type: method,
            data: {
                "nombre": usuario.nombre, 
                "apellido": usuario.apellido,
                "dni": usuario.dni,
                "user": usuario.user,
                "password": usuario.password
            },
            success: function(jqXHR, resp, data){

                // Chequeo que todos los input contengan datos
                if ((usuario.nombre != "") && (usuario.apellido != "") && (usuario.dni != "") && (usuario.user != "") && (usuario.password != "")) {

                    // Si es así, modifico el html para avisarle que ya se realizó la modificación y actualizo el objeto usuario en el sessionStorage
                    sessionStorage.setItem("usuario", JSON.stringify(usuario));
                    $("#nombreUsuario").html(usuario.user);
                    $("#modificarUsuarioContainer").html(
                        `
                            <div class="row text-center">
                                <h2 class="colorPrincipal">¡Tus datos fueron actualizados correctamente ${usuario.nombre}!</h2>
                            </div>
                        `
                    ); 
                } else {

                    // Si hay campos vacíos, le aparece un modal avisándole que todos los campos son obligatorios
                    let myModal = new bootstrap.Modal($('#errorRegistro'));
                    myModal.show();
                    $("#enviarModificacion").removeAttr("disabled");
                    $("#textoEnviarModificacion").removeClass("d-none");
                    $("#spinner-modificacion").addClass("d-none");
                    $("#botonPassword").removeAttr("disabled");
                };
            },
            error: function(jqXHR, status, resp) {
                
                // Si la llamada falló, le vuelvo a deshabilitar el botón
                alert("Ocurrió un error, volvé a intentarlo");
                $("#enviarModificacion").removeAttr("disabled");
                $("#textoEnviarModificacion").removeClass("d-none");
                $("#spinner-modificacion").addClass("d-none");
                $("#botonPassword").removeAttr("disabled");
            }
        });
    });
});
