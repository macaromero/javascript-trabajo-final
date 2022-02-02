$(() => {

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
});

$(() => {
    /* Función de envío del formulario de registro */
    $("#registro").on("submit", function(e) {
        e.preventDefault();
        let usuario = new Usuario;
        const url = "https://jsonplaceholder.typicode.com/posts";
        const method = $("#registro").attr("method");

        $.ajax({

            // Antes de enviar, seteo los valores del objeto usuario y bloqueo el botón de enviar, además de visibilizar el spinner
            beforeSend: function(){
                usuario.preEnvio();
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

                // Chequeo que el usuario haya completado todos los input
                if ((usuario.nombre != "") && (usuario.apellido != "") && (usuario.dni != "") && (usuario.user != "") && (usuario.password != "")) {

                    // Si lo hizo, llamo al método "registroExitoso()", que modifica el html para avisarle que ya se registró y setea el objeto "newUser" en el sessionStorage
                    usuario.registroExitoso(); 
                } else {

                    // Si no lo hizo, llamo al método "registroFallido()", que hace aparecer un modal avisándole que todos los campos son obligatorios
                    usuario.registroFallido();
                };                   
            },
            error: function(jqXHR, status, resp) {

                // Si la llamada falló, le aviso y le vuelvo a habilitar el botón
                alert("Ocurrió un error, volvé a intentarlo");
                $("#botonRegistro").removeAttr("disabled");
                $("#textoBotonRegistro").removeClass("d-none");
                $("#spinner-registro").addClass("d-none");
            }
        });     
    });
});