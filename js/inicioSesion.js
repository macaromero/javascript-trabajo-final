// VARIABLES
let usuarios = [];


$(() => {

    /* Llamada al JSON de usuarios */
    const url = "../json/usuarios.json";
    $.getJSON(url, (data, status) => {

        // Si la llamada es exitosa, se pushea el usuario al array de "usuarios"
        if (status == "success") {
            for (const dato of data) {
                usuarios.push(dato)
            };
        };
    });
});

$(() => {

    /* Función que se dispara al clickear en el ícono del ojo para visibilizar la contraseña */
    $("#botonPassword").click((e) => {
        e.preventDefault();

        // Chequeo la clase del ícono
        if ($("#iconoPassword").attr("class") == "fas fa-eye-slash") {

            // Si el ícono es el del ojo cerrado, la modifico y pongo el del ojo abierto y cambio el tipo de input para que se pueda ver la contraseña
            $("#iconoPassword").removeClass("fas fa-eye-slash");
            $("#iconoPassword").addClass("fas fa-eye");
            $("#passUser").attr("type", "text");
        } else {

            // Si el ícono es el del ojo abierto, la modifico y pongo el del ojo cerrado y cambio el tipo de input para que no se pueda ver la contraseña
            $("#iconoPassword").removeClass("fas fa-eye");
            $("#iconoPassword").addClass("fas fa-eye-slash");
            $("#passUser").attr("type", "password");
        };
    });

    /* Función que se dispara al enviar el formulario para iniciar sesión */
    $("#formulario").on("submit", function(e) {
        e.preventDefault();
        const url = "https://jsonplaceholder.typicode.com/posts";
        const method = $("#formulario").attr("method");
        let user;
        let pass;
        let usuario = new Usuario;
        usuario = JSON.parse(sessionStorage.getItem("newUser")) || {};

        // Llamada ajax para enviar el formulario
        $.ajax({
            beforeSend: function(){

                // Antes de enviar desabilito el botón para enviar, oculto el texto del botón y permito la visualización del spinner. Además, creo las variables de user y pass con los valores ingresados
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

                // Chequeo si el usuario ingresó texto en los input
                if ((user != "") && (pass != "")) {
                    let marcador = false;

                    // Itero sobre el array de usuarios para ver que el mismo exista o que exista en el sessionStorage como un usuario recién registrado
                    for (const u of usuarios) {

                        // Una vez que encuentro el usuario modifico el valor del marcador y freno la iteración
                        if (((u.nombreUser == user) && (u.passUser == pass)) || ((user == usuario.user) && (pass == usuario.password))) {
                                marcador = true;

                                // Si el usuario que ingresa no es un usuario que se acaba de registrar, seteo los valores correctos en la variable usuario
                                if ((u.nombreUser == user) && (u.passUser == pass)) {
                                    usuario.nombre = u.nombre;
                                    usuario.apellido = u.apellido;
                                    usuario.dni = u.dni;
                                    usuario.user = user;
                                    usuario.password = pass;
                                };
                                break;
                        };
                    };

                    // Reviso si el marcador tiene el valor true
                    if (marcador == true) {

                        // Si es true, seteo el usuario en el sessionStorage y lanzo la función de sesionIniciada
                        sessionStorage.setItem("usuario", JSON.stringify(usuario));
                        sesionIniciada(usuario);
                    } else {

                        // Si es false, le aviso al usuario que algún dato es incorrecto o que su usuario no existe, además oculto el spinner y vuelvo a habilitar el botón de enviar
                        let myModal = new bootstrap.Modal($('#errorSesion'));
                        myModal.show();
                        $("#userBoton").removeAttr("disabled");
                        $("#textoBoton").removeClass("d-none");
                        $("#spinner-sesion").addClass("d-none");
                    };

                    // En el caso que el usuario no haya ingresado valores en todos los input le aviso que todos son obligatorios, y le oculto el spinner y vuelvo a habilitar el botón de enviar
                } else {
                    let myModal = new bootstrap.Modal($('#exampleModal'));
                    myModal.show();
                    $("#userBoton").removeAttr("disabled");
                    $("#textoBoton").removeClass("d-none");
                    $("#spinner-sesion").addClass("d-none");
                };
            },
            error: function(jqXHR, status, resp) {
                
                // Si la llamada falla, le aviso y le oculto el spinner y vuelvo a habilitar el botón de enviar
                alert("Ocurrió un error, volvé a intentarlo");
                $("#userBoton").removeAttr("disabled");
                $("#textoBoton").removeClass("d-none");
                $("#spinner-sesion").addClass("d-none");
            }
        });
    });
});


