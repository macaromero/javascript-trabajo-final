/* Creación de la clase */
class ContactoForm {
    constructor(nombre, mail, mensaje) {
        this.nombre = nombre;
        this.mail = mail;
        this.mensaje = mensaje
    };

    /* Métodos para el envío del formulario */
    preEnvio() {
        $("#botonContacto").attr("disabled", "true");
        $("#textoBotonContacto").addClass("d-none");
        $("#spinner-contacto").removeClass("d-none");
        this.nombre = $("#nombre").val();
        this.mail = $("#correo").val();
        this.mensaje = $("#consulta").val();
    };

    envioExitoso() {     
        $(".contacto__container").html(
            `
                <div class="row text-center">
                    <h2 class="colorPrincipal">¡Tu consulta fue enviada correctamente ${this.nombre}!</h2>
                </div>
                <div class="row justify-content-center mt-4">
                    <div class="col-6 text-center colorPrincipal">
                        <p class="fs-4">En breve te estaremos respondiendo</p>
                    </div>
                </div>
            `
        );
    };

    envioFallido() {
        let myModal = new bootstrap.Modal($('#errorContacto'));
        myModal.show();
        $("#botonContacto").removeAttr("disabled");
        $("#textoBotonContacto").removeClass("d-none");
        $("#spinner-contacto").addClass("d-none");
    };
};

$(() => {

    /* Función para enviar el formulario de contacto */
    $("#contacto").on("submit", function (e) {
        e.preventDefault();
        let msj = new ContactoForm;
        const url = "https://jsonplaceholder.typicode.com/comments";
        const method = $("#contacto").attr("method");

        $.ajax({

            // Antes de mandarlo, llamo al método "preEnvio()", que setea los valores de la variable msj, deshabilita el botón de enviar y visualiza el spinner
            beforeSend: function(){
                msj.preEnvio()
            },
            url: url,
            type: method,
            data: 
                {
                    "nombre": msj.nombre, 
                    "correo": msj.mail,
                    "consulta": msj.mensaje,
                },
            success: function(jqXHR, resp, data){

                // Si la llamada es exitosa, chequeo que el usuario haya completado todos los campos que son obligatorios
                if ((msj.nombre != "") && (msj.mail != "") && (msj.mensaje != "")) {

                    // En el caso de que lo haya hecho, llamo al método "envioExitoso()", que modifica el html para avisarle que el envío fue exitoso
                    msj.envioExitoso();
                } else {

                    // Si no completó todos los campos, llamo al método "envioFallido()", que le avisa que todos son obligatorios y le vuelve a habilitar el botón de enviar
                    msj.envioFallido();
                };     
            },
            error: function(jqXHR, status, resp) {

                // Si la llamada falló, le aviso y le vuelvo a habilitar el botón
                alert("Ocurrió un error, volvé a intentarlo");
                $("#botonContacto").removeAttr("disabled");
                $("#textoBotonContacto").removeClass("d-none");
                $("#spinner-contacto").addClass("d-none");
            }
        });     
    });
});