/* Creación de la clase "Item" para cada producto */
class Item {
    constructor(id, nombre, categoria, imagen, precioUnitario, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.imagen = imagen;
        this.precioUnitario = precioUnitario;
        this.cantidad = cantidad;
    };
};


$(() => {
    // VARIABLES
    let listaProductos;
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    let item = new Item();
    let carritoVista = $("#container-carrito");
     
    
    /* Llamada al JSON de productos para traer el array */
    const urlProductos = "../json/listaProductos.json";
    $.getJSON(urlProductos, (data, status) => {
        if (status == "success") {
            listaProductos = data;
            
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
                    
                    // Busco el producto en la lista de productos
                    listaProductos.forEach((p) => {

                        // Si el carrito ya tiene elementos adentro avanzo a otorgarle el valor a la variable "item"
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

                                // Recorro el array de "carrito" para revisar si el producto ya existe
                                for (let i = 0; i < carrito.length; i++) {
                                    
                                    // Si el producto existe, cambio el valor de la variable "marcador" y le agrego 1 a la cantidad del "item"
                                    if (id == carrito[i].id) {
                                        marcador = false;
                                        carrito[i].cantidad += 1;
                                        item.cantidad = carrito[i].cantidad;
                                        break;
                                    } else {
                                        marcador = true;
                                    };
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
                                $("#iconoCarrito").html(
                                    `
                                        <span class="position-absolute translate-middle badge rounded-pill bg-danger navbar__carrito-badge" id="badgeCarrito">
                                            ${totalProductos}
                                        </span>
                                    `
                                );
                            };
                        };
                    });

                    // Animo al carrito para que baje y muestre lo que se agregó y vuelva a subir
                    carritoVista.show().slideDown("slow").delay("slow").slideUp("slow");

                    // Seteo el carrito en el sessionStorage
                    seteoSessionStorage(carrito, "setear");

                    // Llamo a la función que me muestra el precio final del carrito y a la función que me crea el contenedor de la vista del carrito.
                    precioFinal();
                    vistaCarrito();

                  // Si no hay un usuario con sesión iniciada, le muestro un modal avisándole que tiene que iniciar sesión sí o sí
                } else {
                    let myModal = new bootstrap.Modal($('#sesionModal'));
                    myModal.show();

                    // Función que se dispara cuando el usuario clickea en el botón dentro del modal
                    $("#botonIniciarSesion").click(function() {
                        location.replace("/pages/inicioSesion.html");
                    });
                };
            });
        };
    });

    /* Función para esconder al carrito */
    const esconderCarrito = () => {
        carritoVista.hide(1);
    };
    
    /* Función para la creación de la card de cada producto en el carrito */
    const crearCard = (producto, precio) => {
        $("#carrito").prepend(
            `
                <div class="card mb-3 mt-1 card__carrito" id="card-${producto.id}">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="../images/${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body ps-0 carrito__body">
                                <h4 class="card-title fw-bold">${producto.nombre}</h4>
                                <p class="card-text" id="precio-${producto.id}">Total: $${precio}</p>
                            </div>
                        </div>
                        <div class="col-md-3 align-self-center">
                            <div class="card-body p-1 ps-0">
                                <i class="fas fa-plus suma" id="carritoSuma-${producto.id}"></i>
                                <p class="d-inline px-1" id="cantidadProducto-${producto.id}">${producto.cantidad}</p>
                                <i class="fas fa-minus resta" id="carritoResta-${producto.id}"></i>
                            </div>
                        </div>
                        <div class="carrito__eliminar-item d-inline">
                            <i class="fas fa-trash eliminar" id="eliminarItem-${producto.id}"></i>
                        </div>
                    </div>
                </div>
            `
        );
    }; 

    /* Función para establecer el precio total del producto y su cantidad para pasarlo al html del carrito y del checkout */
    const modificarCantidadPrecio = (producto, idPrecioTotal, idCantidad) => {
        precioTotal = producto.cantidad*producto.precioUnitario;

        // Chequeo si el id corresponde al carrito o al checkout para modificar el html
        if (idPrecioTotal == `#precio-${item.id}`) {
            $(idPrecioTotal).text(`Total: $${precioTotal}`);
        } else if (idPrecioTotal == `#precioTotal-${item.id}`) {
            $(idPrecioTotal).text(`$${precioTotal}`);
        }
        $(idCantidad).text(producto.cantidad);
    };

    /* Función para setear el carrito en el sessionStorage o borrarlo */
    const seteoSessionStorage = (carrito, valorSeteo) => {
        if (valorSeteo == "setear") {
            let carritoSession = JSON.stringify(carrito);
            sessionStorage.setItem("carrito", carritoSession);
        } else if (valorSeteo == "eliminar") {
            carrito = [];
            sessionStorage.removeItem("carrito");
            $("#badgeCarrito").hide();
            carritoVista.slideUp();            
        };
    };

    /* Función para la creación del contenedor de la vista del carrito */
    const vistaCarrito = () => {
        let precioTotal = item.precioUnitario*item.cantidad;

        // Chequeo si el carrito tiene elementos adentro y si existe el div que contiene la clase card__carrito (que contiene la card correspondiente a cada producto)
        if ((carrito.length != 0) && ($(".card__carrito").length == 0)) {

            // Itero sobre el array de carrito para obtener los valores de cada item que contenga, creo las cards a través de la función crearCard y si la base del carrito no existe, la creo para que el usuario vea el total y pueda ir al checkout
            carrito.forEach((p) => {
                precioTotal = p.precioUnitario*p.cantidad;
                crearCard(p, precioTotal);
                if ($(".carrito__base").length == 0) {
                    $("#carrito-base").append(
                        `
                            <div class="carrito__base text-center">
                                <p class="carrito__total my-2"></p>
                                <a class="btn home__productos-boton w-75 mb-2 carrito-comprar" href="">Comprar</a>
                                <button class="btn carrito__vaciar w-50 mb-2">Vaciar carrito</button>
                            </div>
                        `
                    );
                };
            });

          // Chequeo si el carrito tiene elementos y ya existe alguna card de productos
        } else if ((carrito.length != 0) && ($(".card__carrito").length != 0)) {

            // Chequeo si existe una card del producto
            if ($(`#card-${item.id}`).length != 0) {

                // Si existe, llamo a la función "modificarCantidadPrecio()"
                modificarCantidadPrecio(item, `#precio-${item.id}`, `#cantidadProducto-${item.id}`);
                modificarCantidadPrecio(item, `#precioTotal-${item.id}`, `#cantidad-${item.id}`);
              
              // Si no existe card, la creo
            } else {
                precioTotal = item.precioUnitario*item.cantidad;
                crearCard(item, precioTotal);
            }; 
        };

        // Llamo a la función que me muestra el precio final del carrito
        precioFinal();   
    };


    /* Función para ver el carrito al clickear en el ícono de carrito */
    $("#cartBoton").click(function(e) {
        e.preventDefault();
        if ($(".card__carrito").length != 0) {
            carritoVista.slideToggle("slow");
        } else {
            esconderCarrito();
        };    
    });


    /* Función para sumar items al carrito a través del ícono "+" ubicado dentro del carrito y checkout*/
    function sumar(idContainer) {
        $(idContainer).on("click", ".suma", function() {
            let idSuma = $(this).attr("id");
            let idItem = idSuma.split("-");
            
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
    
            // Llamo a la función modificarCantidadPrecio()
            modificarCantidadPrecio(item, `#precio-${item.id}`, `#cantidadProducto-${item.id}`);
            modificarCantidadPrecio(item, `#precioTotal-${item.id}`, `#cantidad-${item.id}`);
    
            // Seteo el carrito en el sessionStorage
            seteoSessionStorage(carrito, "setear");       
            
            // Llamo a la función que me muestra el precio final del carrito
            precioFinal();
        });
    };
    

    /* Función para restar items del carrito a través del ícono "-" ubicado dentro del carrito y checkout */
    function restar (idContainer) {
        $(idContainer).on("click", ".resta", function() {
            let idResta = $(this).attr("id");
            let idItem = idResta.split("-");
            
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
    
                // Llamo a la función modificarCantidadPrecio()
                modificarCantidadPrecio(item, `#precio-${item.id}`, `#cantidadProducto-${item.id}`);
                modificarCantidadPrecio(item, `#precioTotal-${item.id}`, `#cantidad-${item.id}`);
    
                // Seteo el carrito en el sessionStorage
                seteoSessionStorage(carrito, "setear");
                
                // Llamo a la función que me muestra el precio final del carrito
                precioFinal();    
            } else if (item.cantidad == 1) {
    
                // Si la cantidad es igual a 1, elimino el item del carrito y del html
                for (let i = 0; i < carrito.length; i++) {
                    if (item.id == carrito[i].id) {
                        carrito.splice(i, 1);
                    };
                };
                $(`#fila-${item.id}`).remove();
                $(`#card-${item.id}`).remove();
    
                // Chequeo si el carrito tiene items en su interior
                if (carrito.length >= 1) {
    
                    // Si hay items, modifico el valor del badge, llamo a la función para setearlo en el sessionStorage y a la función que me muestra el precio final del carrito
                    $("#badgeCarrito").html(carrito.length);
                    seteoSessionStorage(carrito, "setear");
                    precioFinal();
                } else {
                    
                    // Si no hay items en el carrito, modifico el html del checkout, llamo a la función para eliminarlo y escondo la base
                    seteoSessionStorage(carrito, "eliminar");
                    
                    if ($(".checkout__container")) {
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
            };
        });    
    };
    

    /* Función para eliminar un item del carrito a través del ícono de cesto de basura */
    function eliminarItem(idContainer) {
        $(idContainer).on("click", ".eliminar", function() {
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
    
                // Si hay items, elimino la card del html y la fila del checkout, modifico el valor del badge, seteo el carrito en el sessionStorage y llamo a la función que me muestra el precio final del carrito
                $(`#card-${item.id}`).remove();
                $(`#fila-${item.id}`).remove();
                $("#badgeCarrito").html(carrito.length);
                seteoSessionStorage(carrito, "setear");
                precioFinal();
            } else {
    
                // Si no hay items en el carrito, elimino la card del html, modifico el html del checkout y llamo a la función para eliminarlo
                $(`#card-${item.id}`).remove();
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
                seteoSessionStorage(carrito, "eliminar");
            };
        }); 
    };
    

    /* Función para establecer el precio total de la compra */
    const precioFinal = () => {
        let precioTotal= 0;

        // Itero sobre el carrito, multiplico la cantidad de cada item por el precio unitario y sumo cada uno de esos valores en la variable precioTotal, luego le paso este valor al html
        carrito.forEach((p) => {
            let precioFinalProducto = p.cantidad * p.precioUnitario;
            precioTotal += precioFinalProducto;
        });
        $(".carrito__total").text(`TOTAL: $${precioTotal}`);

        // Chequeo si el usuario se encuentra en la página de checkout, y si es así modifico el valor total
        if ($("#checkout-total")) {
            $("#checkout-total").text(`$${precioTotal}`);
        };
    };

    /* Función para vaciar el carrito de compra */
    $(".carritoBase").on("click", ".carrito__vaciar", function() {

        // Elimino el contenido de la vista del carrito, escondo la base y llamo a la función que lo elimina
        seteoSessionStorage(carrito, "eliminar");
        carrito = [];
        $(`#carrito`).empty();

        // Si el usuario se encuentra en la página de checkout modifico el html
        if ($(".checkout__container")) {
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
    });

    /* Función para ir al checkout al clickear en el botón Comprar del carrito */
    $("#carrito-base").on("click", ".carrito-comprar", function(e) {
        e.preventDefault();
        location.replace("/pages/checkout.html");
    });

    
    // Llamada a las funciones para sumar, restar y eliminar items tanto en el carrito como en el checkout, también a las funciones para esconder y ver el carrito
    sumar("#carrito");
    sumar("#checkout-tbody");
    restar("#carrito");
    restar("#checkout-tbody");
    eliminarItem("#carrito");
    eliminarItem("#checkout-tbody");
    esconderCarrito();
    vistaCarrito();
});












