// VARIABLES
let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
let item = {
    id: 0,
    nombre: "",
    categoria: "",
    imagen: "",
    precioUnitario: 0,
    cantidad: 1
};

// FUNCIONES
$(() => {
    let carritoVista = $("#container-carrito");

    /* Función para esconder al carrito */
    const esconderCarrito = () => {
        carritoVista.hide();
    }
    

    /* Llamada al JSON de productos para traer el array */
    const urlProductos = "../json/listaProductos.json";
    $.getJSON(urlProductos, (data, status) => {
        if (status == "success") {
            let listaProductos = data;
            
            /* Función para añadir productos al carrito al clickear en el botón de "añadir al carrito" */
            $(".row-cards-productos").on("click", ".home__productos-boton", function() {
                let id;
                let cantidad = 1;
                let marcador = false;
                let totalProductos = 1;
                let badgeCarrito = $("#badgeCarrito");
                
                // Chequeo si hay un usuario con una sesión iniciada
                if (sessionStorage.getItem("usuario")) {
                    // Obtengo el id del producto a agregar
                    const prodId = $(this)[0].id.split("-");
                    id = prodId[prodId.length-1];
                    
                    // Busco el producto en la lista de productos y le otorgo el valor correspondiente a la variable item
                    listaProductos.forEach((p) => {

                        // Si el carrito ya tiene elementos adentro avanzo a otorgarle el valor a la variable item
                        if (carrito.length != 0) {
                            if (id == p.id) {
                                item = {
                                    id: p.id,
                                    nombre: p.nombre,
                                    categoria: p.categoria,
                                    imagen: p.imagen,
                                    precioUnitario: p.precio,
                                    cantidad: cantidad
                                };

                                // Recorro el array de carrito para revisar si el producto ya existe
                                for (let i = 0; i < carrito.length; i++) {
                                    
                                    // Si el producto existe, cambio el valor de la variable marcador y le agrego 1 a la cantidad del item
                                    if (id == carrito[i].id) {
                                        marcador = false;
                                        carrito[i].cantidad += 1;
                                        item.cantidad = carrito[i].cantidad;
                                        break
                                    } else {
                                        marcador = true;
                                    }
                                };

                                // Chequeo si el marcador está en true, y si es así pusheo el item al carrito porque significa que aun no existe ningún producto igual
                                if (marcador == true) {
                                    carrito.push(item);
                                    totalProductos = carrito.length;
                                    badgeCarrito.show();
                                    badgeCarrito.html(totalProductos);
                                };
                            };

                          // Si el carrito no tiene elementos dentro, le otorgo el valor que corresponde al item de acuerdo a su id, lo pusheo al carrito y creo el badge del carrito poniéndole la cantidad de items que tiene el array
                        } else {
                            if (id == p.id) {
                                item = {
                                    id: p.id,
                                    nombre: p.nombre,
                                    categoria: p.categoria,
                                    imagen: p.imagen,
                                    precioUnitario: p.precio,
                                    cantidad: cantidad
                                };
                                carrito.push(item);
                                let badge = $("#iconoCarrito");
                                badge.html(
                                    `
                                        <span class="position-absolute translate-middle badge rounded-pill bg-danger navbar__carrito-badge" id="badgeCarrito">
                                            ${totalProductos}
                                        </span>
                                    `);
                            };
                        };
                    });
                    // Muestro la base del carrito (que contiene el valor total del mismo) 
                    $(".carrito__base").show();

                    // Animo al carrito para que baje y muestre lo que se agregó y vuelva a subir
                    carritoVista.show().slideDown("slow").delay("slow").slideUp("slow");

                    // Seteo el carrito en el sessionStorage
                    let carritoJson = JSON.stringify(carrito);
                    sessionStorage.setItem("carrito", carritoJson);

                    // Llamo a la función que me muestra el precio final del carrito y a la función que me crea el contenedor de la vista del carrito.
                    precioFinal()
                    vistaCarrito();

                  // Si no hay un usuario con sesión iniciada, le muestro un modal avisándole que tiene que iniciar sesión sí o sí
                } else {
                    let myModal = new bootstrap.Modal(document.getElementById('sesionModal'));
                    myModal.show();
                };
            });

            
        };
    });
    

    /* Función para la creación del contenedor de la vista del carrito */
    const vistaCarrito = () => {
        let precioTotal = item.precioUnitario*item.cantidad;

        // Chequeo si el carrito tiene elementos adentro y si existe el div que contiene la clase card__carrito (que contiene la card correspondiente a cada producto)
        if ((carrito.length != 0) && ($(".card__carrito").length == 0)) {

            // Itero sobre el array de carrito para obtener los valores de cada item que contenga y creo las cards
            carrito.forEach((p) => {
                precioTotal = p.precioUnitario*p.cantidad;
                $("#carrito").prepend(
                    `
                        <div class="card mb-3 mt-1 card__carrito" id="card-${p.id}">
                            <div class="row g-0">
                                <div class="col-md-3">
                                    <img src="../images/${p.imagen}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-6">
                                    <div class="card-body ps-0 carrito__body">
                                        <h4 class="card-title fw-bold">${p.nombre}</h4>
                                        <p class="card-text" id="precio-${p.id}">Total: $${precioTotal}</p>
                                    </div>
                                </div>
                                <div class="col-md-3 align-self-center">
                                    <div class="card-body p-1 ps-0">
                                        <i class="fas fa-plus suma" id="carritoSuma-${p.id}"></i>
                                        <p class="d-inline px-1" id="cantidadProducto-${p.id}">${p.cantidad}</p>
                                        <i class="fas fa-minus resta" id="carritoResta-${p.id}"></i>
                                    </div>
                                </div>
                                <div class="carrito__eliminar-item d-inline">
                                    <i class="fas fa-trash eliminar" id="eliminarItem-${p.id}"></i>
                                </div>
                            </div>
                        </div>
                    `
                    );
            });
            // Llamo a la función que me muestra el precio final del carrito
            precioFinal()

          // Chequeo si el carrito tiene elementos y ya existe alguna card de productos
        } else if ((carrito.length != 0) && ($(".card__carrito").length != 0)) {

            // Chequeo si existe una card del producto
            if ($(`#card-${item.id}`).length != 0) {

                // Si existe, le paso el valor del precio total y de la cantidad al html
                precioTotal = item.precioUnitario*item.cantidad;
                $(`#precio-${item.id}`).text(`Total: $${precioTotal}`);
                $(`#cantidadProducto-${item.id}`).text(item.cantidad);
                precioFinal();
              
              // Si no existe card, la creo
            } else {
                precioTotal = item.precioUnitario*item.cantidad;
                $("#carrito").prepend(
                    `
                        <div class="card mb-3 mt-1 card__carrito" id="card-${item.id}">
                            <div class="row g-0">
                                <div class="col-md-3">
                                    <img src="../images/${item.imagen}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-6">
                                    <div class="card-body ps-0 carrito__body">
                                        <h4 class="card-title fw-bold">${item.nombre}</h4>
                                        <p class="card-text" id="precio-${item.id}">Total: $${precioTotal}</p>
                                    </div>
                                </div>
                                <div class="col-md-3 align-self-center">
                                    <div class="card-body p-1 ps-0">
                                        <i class="fas fa-plus suma" id="carritoSuma-${item.id}"></i>
                                        <p class="d-inline px-1" id="cantidadProducto-${item.id}">${item.cantidad}</p>
                                        <i class="fas fa-minus resta" id="carritoResta-${item.id}"></i>
                                    </div>
                                </div>
                                <div class="carrito__eliminar-item d-inline">
                                    <i class="fas fa-trash eliminar" id="eliminarItem-${item.id}"></i>
                                </div>
                            </div>
                        </div>
                    `
                );

                // Llamo a la función que me muestra el precio final del carrito
                precioFinal();
            }; 
        };   
    };


    /* Función para ver el carrito al clickear en el ícono de carrito */
    $("#cartBoton").click(function(e) {
        e.preventDefault()
        carritoVista.show().slideToggle("slow");
    });


    /* Función para sumar items al carrito a través del ícono "+" ubicado dentro del carrito */
    $("#carrito").on("click", ".suma", function() {
        let idSuma = $(this).attr("id");
        let idItem = idSuma.split("-");
        let precioTotal;
        
        // Itero sobre el array de carrito para establecer el valor del item en el que clickeó el usuario
        carrito.forEach((p) => {
            if (p.id == idItem[idItem.length-1]) {
                item = {
                    id: p.id,
                    nombre: p.nombre,
                    categoria: p.categoria,
                    imagen: p.imagen,
                    precioUnitario: p.precioUnitario,
                    cantidad: p.cantidad
                };
            };
        });

        // Le sumo 1 a la cantidad del item y luego le pongo esa cantidad al producto en el array de carrito
        item.cantidad += 1;
        for (let i = 0; i < carrito.length; i++) {
            if (item.id == carrito[i].id) {
                carrito[i].cantidad = item.cantidad;
            };
        };

        // Establezco el valor del precio total del producto y se lo paso al html de dicho producto
        precioTotal = item.cantidad*item.precioUnitario;
        $(`#precio-${item.id}`).text(`Total: $${precioTotal}`);

        // Seteo el carrito en el sessionStorage
        let carritoSession = JSON.stringify(carrito);
        sessionStorage.setItem("carrito", carritoSession);

        // Seteo la nueva cantidad del producto en el html
        $(`#cantidadProducto-${item.id}`).text(item.cantidad);
        
        // Llamo a la función que me muestra el precio final del carrito
        precioFinal();
    });
     

    /* Función para restar items del carrito a través del ícono "-" ubicado dentro del carrito */
    $("#carrito").on("click", ".resta", function() {
        let idResta = $(this).attr("id");
        let idItem = idResta.split("-");
        let precioTotal;
        
        // Itero sobre el array de carrito para establecer el valor del item en el que clickeó el usuario
        carrito.forEach((p) => {
            if (p.id == idItem[idItem.length-1]) {
                item = {
                    id: p.id,
                    nombre: p.nombre,
                    categoria: p.categoria,
                    imagen: p.imagen,
                    precioUnitario: p.precioUnitario,
                    cantidad: p.cantidad
                };
            };
        });

        // Chequeo a ver si la cantidad de items es mayor a 1
        if (item.cantidad > 1) {

            // Si es mayor a uno, le resto uno y modifico el valor de cantidad en el item y en el array de carrito
            item.cantidad -= 1;
            for (let i = 0; i < carrito.length; i++) {
                if (item.id == carrito[i].id) {
                    carrito[i].cantidad = item.cantidad;
                };
            };

            // Establezco el valor del precio total del producto y se lo paso al html de dicho producto
            precioTotal = item.cantidad*item.precioUnitario;
            $(`#precio-${item.id}`).text(`Total: $${precioTotal}`);

            // Seteo el carrito en el sessionStorage
            let carritoSession = JSON.stringify(carrito);
            sessionStorage.setItem("carrito", carritoSession);

            // Seteo la nueva cantidad del producto en el html
            $(`#cantidadProducto-${item.id}`).text(item.cantidad);
            
            // Llamo a la función que me muestra el precio final del carrito
            precioFinal();    
        } else if (item.cantidad == 1) {

            // Si la cantidad es igual a 1, elimino el item del carrito y del html
            for (let i = 0; i < carrito.length; i++) {
                if (item.id == carrito[i].id) {
                    carrito.splice(i, 1);
                };
            };
            $(`#card-${item.id}`).remove();

            // Chequeo si el carrito tiene items en su interior
            if (carrito.length >= 1) {

                // Si hay items, modifico el valor del badge, seteo el carrito en el sessionStorage y llamo a la función que me muestra el precio final del carrito
                $("#badgeCarrito").html(carrito.length);
                let carritoSession = JSON.stringify(carrito);
                sessionStorage.setItem("carrito", carritoSession);
                precioFinal();
            } else {
                
                // Si no hay items en el carrito, seteo su valor como array vacío, remuevo el carrito del sessionStorage, escondo el badge y subo la vista del carrito
                carrito = [];
                sessionStorage.removeItem("carrito");
                $("#badgeCarrito").hide();
                carritoVista.slideUp();
            };
        };
    });

    /* Función para eliminar un item del carrito a través del ícono de cesto de basura */
    $("#carrito").on("click", ".eliminar", function() {
        let idEliminar = $(this).attr("id");
        let idItem = idEliminar.split("-");
        
        // Itero sobre el array de carrito para establecer el valor del item en el que clickeó el usuario y lo elimino del carrito
        carrito.forEach((p, index) => {
            if (p.id == idItem[idItem.length-1]) {
                item = {
                    id: p.id,
                    nombre: p.nombre,
                    categoria: p.categoria,
                    imagen: p.imagen,
                    precioUnitario: p.precioUnitario,
                    cantidad: p.cantidad
                };
                carrito.splice(index, 1);
            };
        });
        
        // Chequeo si el carrito tiene items en su interior
        if (carrito.length >= 1) {

            // Si hay items, elimino la card del html, modifico el valor del badge, seteo el carrito en el sessionStorage y llamo a la función que me muestra el precio final del carrito
            $(`#card-${item.id}`).remove();
            $("#badgeCarrito").html(carrito.length);
            let carritoSession = JSON.stringify(carrito);
            sessionStorage.setItem("carrito", carritoSession);
            precioFinal();
        } else {

            // Si no hay items en el carrito, elimino la card del html, seteo su valor como array vacío, remuevo el carrito del sessionStorage, escondo el badge y subo la vista del carrito
            $(`#card-${item.id}`).remove();
            carrito = [];
            sessionStorage.removeItem("carrito");
            $("#badgeCarrito").hide();
            carritoVista.slideUp();
        };
    }); 

    /* Función para establecer el precio total de la compra */
    function precioFinal() {
        let precioTotal= 0;

        // Itero sobre el carrito, multiplico la cantidad de cada item por el precio unitario y sumo cada uno de esos valores en la variable precioTotal, luego le paso este valor al html
        carrito.forEach((p) => {
            let precioFinalProducto = p.cantidad * p.precioUnitario;
            precioTotal += precioFinalProducto;
        });
        $(".carrito__total").text(`TOTAL: $${precioTotal}`)
    };

    /* Función para vaciar el carrito de compra */
    $(".carrito__vaciar").click(function() {

        // Elimino el contenido de la vista del carrito, establezco el array carrito como array vacío, remuevo el valor del sessionStorage, escondo la base del carrito, escondo el badge y subo el contenedor de la vista
        $(`#carrito`).empty();
        carrito = [];
        sessionStorage.removeItem("carrito");
        $(".carrito__base").hide();
        $("#badgeCarrito").hide();
        carritoVista.slideUp();
    });

    // Llamada a las funciones para esconder y ver el carrito
    esconderCarrito()
    vistaCarrito()
});









