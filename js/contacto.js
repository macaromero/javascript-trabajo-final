// FUNCIÓN DE CONTACTO //
$(() => {
    $("#contacto").on("submit", function (e) {
        e.preventDefault();
        let msj = {
            nombre:"",
            mail: "",
            mensaje: ""
        };
        const url = "https://jsonplaceholder.typicode.com/comments";
        const method = $("#contacto").attr("method");

        $.ajax({
            beforeSend: function(){
                $("#botonContacto").attr("disabled", "true");
                $("#textoBotonContacto").addClass("d-none");
                $("#spinner-contacto").removeClass("d-none");
                msj.nombre = $("#nombre").val();
                msj.mail = $("#correo").val();
                msj.mensaje = $("#consulta").val();
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
                if ((msj.nombre != "") && (msj.mail != "") && (msj.mensaje != "")) {
                    let contacto = document.querySelector(".contacto__container");
                    contacto.innerHTML =
                        `
                            <div class="row text-center">
                                <h2 class="colorPrincipal">¡Tu consulta fue enviada correctamente ${msj.nombre}!</h2>
                            </div>
                            <div class="row justify-content-center mt-4">
                                <div class="col-6 text-center colorPrincipal">
                                    <p class="fs-4">En breve te estaremos respondiendo</p>
                                </div>
                            </div>
                        `;  
                } else {
                    let myModal = new bootstrap.Modal(document.getElementById('errorContacto'));
                    myModal.show();
                    $("#botonContacto").removeAttr("disabled");
                    $("#textoBotonContacto").removeClass("d-none");
                    $("#spinner-contacto").addClass("d-none");
                }
                                
            },
            error: function(jqXHR, status, resp) {
                alert("Ocurrió un error, volvé a intentarlo");
            }
        });     
    });
});

// $(() => {
//     $("#contacto").on("submit", function (e) {
//         e.preventDefault();
//         let msj = {
//             nombre: "",
//             mail: "",
//             mensaje: ""
//         };
//         const url = "https://jsonplaceholder.typicode.com/comments",
//         const method = $("#contacto").attr("method");
//         console.log(method);
//     })
// })