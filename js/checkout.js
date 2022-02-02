$(() => {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    let usuario = JSON.parse(sessionStorage.getItem("usuario")) || [];
    let retiro;
    let compra = {};

    /* Función para crear el carrito */
    const creacionCarrito = () => {

        // Chequeo si el carrito existe
        if (carrito.length != 0) {

            // Si es así, itero sobre el array, establezco el precio total y creo la tabla con todos los productos del carrito
            carrito.forEach((p) => {
                let precioTotal = p.precioUnitario * p.cantidad;
                $("#checkout-tbody").append(
                    `
                        <tr id="fila-${p.id}">
                            <th scope="row">${p.nombre}</th>
                            <td>$${p.precioUnitario}</td>
                            <td>
                                <div class="col align-self-center">
                                    <div class="">
                                        <i class="fas fa-plus suma" id="carritoSuma-${p.id}"></i>
                                        <p class="d-inline px-1" id="cantidad-${p.id}">${p.cantidad}</p>
                                        <i class="fas fa-minus resta" id="carritoResta-${p.id}"></i>
                                    </div>
                                </div>
                            </td>
                            <td id="precioTotal-${p.id}">$${precioTotal}</td>
                            <td>
                                <i class="fas fa-trash eliminar checkout__eliminar-item" id="eliminarItem-${p.id}"></i>
                            </td>
                        </tr>
                    `
                );
            });

        // Si no existe carrito, modifico el html para hacérselo saber al usuario
        } else {
            $(".checkout__container").html(
                `
                    <div class="row text-center">
                        <h2 class="colorPrincipal">¡Tu carrito está vacío!</h2>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="col-6">
                            <a class="btn w-100 home__productos-boton mt-4" href="./productos.html">Mirá todos los productos que tenemos para vos</a>
                        </div>
                    </div>
                `
            );
        };
    };
    
    /* Función para disparar cuando el usuario hace click en el botón Comprar */
    $("#boton-comprar").click(function(e) {
        e.preventDefault();
        let precioFinal = $("#checkout-total").html();

        // Modifico el html para mostrar un acordión de dos pestañas, en la primera elige la forma en la que va a retirar el pedido, y una vez que lo hace se le abre la segunda donde se le permite pagar
        $(".checkout__container").html(
            `   
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="boton-acordion1">
                                Elegí la forma en que retirás
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body row justify-content-center">
                                <div class="col-6">
                                    <form action="" class="p-4" id="retiro" method="post">
                                        <div class="form-group mb-4">
                                            <label for="retiro" class="form-label fs-6">¿Cómo vas a retirar el producto?</label>
                                            <select class="form-select" aria-label="Default select example" name="retiro" id="retiro-select">
                                                <option selected disabled class="gris">(Elegí la opción correcta)</option>
                                                <option value="1">Retiro en persona</option>
                                                <option value="2">Envío una app a retirarlo</option>
                                            </select>
                                        </div>
                                        <button class="btn w-100 home__productos-boton mt-4" type="submit"" id="botonRetiro">
                                            <span id:"textoBotonRetiro">Continuar</span>
                                            <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" id="spinner-retiro"></span>
                                        </button>
                                    </form>
                                </div> 
                            </div>

                        <!-- Modal error de falta seleccionar la opción -->
                            <div class="modal fade" id="errorRetiro" tabindex="-1" aria-labelledby="errorRetiroLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header registro__modal-header">
                                        <h5 class="modal-title text-center" id="errorRetiroLabel">Tenés que seleccionar una opción.</h5>
                                    </div>
                                    <div class="modal-footer justify-content-center registro__modal-footer">
                                        <button type="button" class="btn btn-secondary w-75" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" id="boton-acordion2" disabled>
                                Pagá
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body row justify-content-center">
                                <div class="col-3">
                                    <div class="card">
                                        <img class="card-img-top w-100" src="../images/tarjetas_mercadopago_06.png" alt="Logo MercadoPago">
                                        <div class="card-body text-center">
                                            <h4 class="card-title fw-bold fs-4 gris mb-5">TOTAL: ${precioFinal}</h4>
                                            <button class="btn w-100 home__productos-boton" id="botonPagar">PAGAR</button>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
    });

    /* Función de envío del formulario de retiro */
    $(".checkout__container").on("submit", "#retiro", function(e) {
        e.preventDefault();
        const url = "https://jsonplaceholder.typicode.com/todos";
        const method = $("#retiro").attr("method");

        $.ajax({

            // Antes de enviar, seteo los valores de retiro y bloqueo el botón de continuar, además de visibilizar el spinner
            beforeSend: function(){
                $("#botonRetiro").attr("disabled", "true");
                $("#textoBotonRetiro").addClass("d-none");
                $("#spinner-retiro").removeClass("d-none");
                retiro = $("#retiro-select").val();
                if (retiro == "1") {
                    retiro = "Retira en persona";
                } else if (retiro == "2") {
                    retiro = "Retira una app";
                };
            },
            url: url,
            type: method,
            data: 
                {
                    "retiro": retiro
                },
            success: function(jqXHR, resp, data){

                // Chequeo que el usuario haya seleccionado una opción
                if (retiro != null) {

                    // Si lo hizo, se le despliega la pestaña para realizar el pago
                    $("#boton-acordion1").attr("disabled", "true").attr("aria-expanded", "false").html(`${retiro}`);
                    $("#collapseOne").addClass("d-none");
                    $("#boton-acordion2").removeAttr("disabled").attr("aria-expanded", "true").removeClass("collapsed");
                    $("#collapseTwo").addClass("show");

                } else {

                    // Si no lo hizo, le aparece un modal avisándole que tiene que elegir una opción
                    let myModal = new bootstrap.Modal($('#errorRetiro'));
                    myModal.show();
                    $("#botonRetiro").removeAttr("disabled");
                    $("#textoBotonRetiro").removeClass("d-none");
                    $("#spinner-retiro").addClass("d-none");   
                };                   
            },
            error: function(jqXHR, status, resp) {

                // Si la llamada falla, le aviso y le vuelvo a habilitar el botón
                alert("Ocurrió un error, volvé a intentarlo");
                $("#botonRetiro").removeAttr("disabled");
                $("#textoBotonRetiro").removeClass("d-none");
                $("#spinner-retiro").addClass("d-none"); 
            }
        });     
    });
    
    
    /* Función que se dispara al clickear en el botón "Pagar" */
    $(".checkout__container").on("click", "#botonPagar", function(e) {
        e.preventDefault();

        // Modifico el html para hacerle saber al usuario que su compra fue realizada
        $(".checkout__container").html(
            `
                <div class="row text-center">
                    <h2 class="colorPrincipal">¡Tu compra se realizó correctamente ${usuario.nombre}!</h2>
                </div>
                <div class="row justify-content-center mt-4">
                    <div class="col-6 text-center">
                        <p>Ya estamos preparando tu pedido para que esté listo cuando lo retires.</p>
                        <p>Por cualquier duda o consulta, <a href="./contacto.html" class="checkout__ancla">comunicate con nosotros.</a></p>
                    </div>
                </div>
            `
        );

        // Creo el objeto "compra" y lo seteo en el sessionStorage
        compra = {
            productos: carrito,
            metodoRetiro: retiro
        };
        sessionStorage.setItem("compra", JSON.stringify(compra));

        // Elimino el carrito del sessionStorage, modifico el valor del badge y vacío el carrito
        sessionStorage.removeItem("carrito");
        $("#iconoCarrito").empty();
        $(`#carrito`).empty();
        $(".carrito__base").hide();
        carrito = [];
    });
    
    // Llamo a la función para crear el carrito
    creacionCarrito();
});