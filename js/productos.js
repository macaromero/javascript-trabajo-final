// FUNCIONES //

/* Función para crear carousel de productos del home */
$(() => {
    let listaProductos;
    const urlProductos = "../json/listaProductos.json";
    let categorias;
    const urlCategorias = "../json/categorias.json";

    /* Llamada al JSON de productos para traer el array */
    $.getJSON(urlProductos, (data, status) => {
        if (status == "success") {
            listaProductos = data;

            /* Función para crear las cards del carousel de productos del home y las cards de la sección productos */
            const crearCards = (lista) => {
                lista.forEach((p) => {

                    // Si el usuario se encuentra en la home, creo el carousel de productos
                    if (location.pathname == "/index.html") {           
                        $("#listaProductos").append(
                            `
                                <li class="d-inline-block home__productos-item-carousel me-3">
                                    <div class="card pt-3 home__productos-card">
                                        <img class="card-img-top productos__img" src="./images/${p.imagen}" alt="${p.nombre}">
                                        <div class="card-body text-center">
                                            <h4 class="card-title fw-bold fs-4 gris productos__precio">$${p.precio}</h4>
                                            <p class="card-text productos__nombre">${p.nombre}</p>
                                            <button class="btn w-100 home__productos-boton" id="producto-${p.id}">Agregar al carrito</button>
                                        </div>
                                    </div>
                                </li>         
                            `
                        );
                        
                    // Si en cambio el usuario se encuentra en la página de productos, creo las cards de todos los productos
                    } else if (location.pathname == "/pages/productos.html") {
                        $("#cardsProductos").append(
                            `
                                <div class="col mb-4" id="col${p.id}">
                                    <div class="card pt-3">
                                        <img class="card-img-top productos__img" src="../images/${p.imagen}" alt="${p.nombre}">
                                        <div class="card-body text-center">
                                            <h4 class="card-title fw-bold fs-4 gris productos__precio">$${p.precio}</h4>
                                            <p class="card-text productos__nombre">${p.nombre}</p>
                                            <button class="btn w-100 home__productos-boton" id="producto-${p.id}">Agregar al carrito</button>
                                        </div>
                                    </div>   
                                </div>       
                            `
                        );
                    };
                });
            };

            /* Funciones para mover el carousel de productos del home */
            $("#botonAtras").click (function (e) {
                if ($("#botonAtras")) {
                    e.preventDefault();
                    $(".home__productos-lista-carousel").animate(
                        {left: "0"},
                        "slow"
                    );
                };
            });

            $("#botonAdelante").click (function (e) {
                if ($("#botonAdelante")) {
                    e.preventDefault();
                    $(".home__productos-lista-carousel").animate(
                        {left: "-624px"},
                        "slow"
                    );
                };
            });


            /* Llamada al JSON de categorías */
            $.getJSON(urlCategorias, (data, status) => {
                categorias = data;

                if (status == "success") {

                    /* Función para crear y aplicar los filtros de visualización de productos que seleccione el usuario en la sección productos */
                    const crearFiltros = (categorias, lista) => {
                        let listaNueva = [];

                        // Creo las opciones principales para filtrar por categoría
                        $("#filtroProductos").append(
                            `
                                <option selected disabled value="default" class="gris">Filtrar por categoría</option>
                                <option value="todos" class="colorPrincipal">Todos</option>
                            `
                        );
                        
                        // Itero sobre el array de categorías y creo el resto de las opciones
                        categorias.forEach((c) => {
                            $("#filtroProductos").append(
                                `
                                    <option value="${c.nombre}" class="colorPrincipal" id="productos__filtro-categorias">${c.nombre}</option>
                                `
                            );       
                        });

                        /* Función que se dispara cuando cambia el valor del select */
                        $("#filtroProductos").change(function(e) {

                            // Elimino todas las cards de los productos
                            $("#cardsProductos").empty();

                            // Reviso cuál es el valor seleccionado
                            if ((this.value == "todos") || (this.value == null)) {

                                // Si seleccionó "todos" o no seleccionó ninguna categoría, creo las cards con la lista en el orden recibido del JSON, también establezco el valor del select del orden de los productos como default
                                crearCards(lista);
                                $("#ordenProductos").val("default");
                                listaNueva = [];
                                lista.forEach ((p) => {
                                    listaNueva.push(p)
                                });
                            } else {

                                // Si eligió alguna de las categorías disponibles, itero sobre la lista de productos y creo una lista nueva con los productos que pertenezcan a la categoría seleccionada
                                listaNueva = [];
                                lista.forEach((p) => {
                                    if (p.categoria == this.value) {
                                        listaNueva.push(p);
                                    };
                                });

                                // Creo las cards de los productos con la lista nueva y establezco el valor del select del orden de los productos como default
                                crearCards(listaNueva);
                                $("#ordenProductos").val("default");
                            };        
                        });
                            // Una vez que cree las cards de acuerdo a la categoría seleccionada por el usuario, llamo a la funcion "ordenarProductos" y le paso la lista de productos
                            ordenarProductos(listaProductos);
                    };

                    /* Función para establecer el orden de los productos que seleccione el usuario en la sección productos */
                    const ordenarProductos = (lista) => {

                        /* Función que se dispara cuando se modifica el valor del select */
                        $("#ordenProductos").change(function (e) {
                            let valorFiltro = $("#filtroProductos").val();
                            let listaNueva = [];

                            // Si la categoría (variable "valorFiltro") es null o "todos", se crea la variable listaNueva con todos los items de la lista de productos
                            if ((valorFiltro == null) || (valorFiltro == "todos")) {
                                listaNueva = [];
                                lista.forEach ((p) => {
                                    listaNueva.push(p);
                                });

                            // Sino se crea la variable listaNueva con los items que posean la misma categoría que la variable valorFiltro
                            } else {
                                listaNueva = [];
                                lista.forEach((p) => {
                                    if (p.categoria == valorFiltro) {
                                        listaNueva.push(p);
                                    }; 
                                });
                            };

                            // Luego se ordenan los elementos del array según el orden que establezca el usuario
                            switch (this.value) {

                                // Si el valor es el default se ordenan los valores por el número de "id"
                                case "default":
                                        let listaDefault = listaNueva.sort((a, b) => {
                                            return a.id - b.id;
                                        });

                                        // Se crean las cards con la lista nueva
                                        $("#cardsProductos").empty();
                                        crearCards(listaDefault);
                                        break;
                                
                                // Si el valor es el de "nombre", se ordenan los valores por el "nombre"
                                case "nombre":
                                        let listaPorNombre = listaNueva.sort((a, b) => {
                                            if (a.nombre < b.nombre) {
                                                return -1;
                                            };
                                            if (a.nombre > b.nombre) {
                                                return 1;
                                            };
                                            return 0 
                                            });

                                        // Se crean las cards con la lista nueva
                                        $("#cardsProductos").empty();
                                        crearCards(listaPorNombre);
                                        break;

                                // Si el valor es el de "menorPrecio", se ordenan los valores de menor a mayor de acuerdo al "precio"        
                                case "menorPrecio":
                                        let listaPorMenorPrecio = listaNueva.sort((a, b) => {
                                            return a.precio - b.precio;
                                            });

                                        // Se crean las cards con la lista nueva
                                        $("#cardsProductos").empty();
                                        crearCards(listaPorMenorPrecio);
                                        break;

                                // Si el valor es el de "mayorPrecio", se ordenan los valores de mayor a menor de acuerdo al "precio"        
                                case "mayorPrecio":
                                        let listaPorMayorPrecio = listaNueva.sort((a, b) => {
                                            return b.precio - a.precio;
                                            });

                                        // Se crean las cards con la lista nueva
                                        $("#cardsProductos").empty();
                                        crearCards(listaPorMayorPrecio);
                                        break;
                        
                                default:
                                        break;
                            };
                        });
                    };


                    // Se llaman a las funciones para crear las cards por default y para crear los filtros 
                    crearCards(listaProductos);
                    crearFiltros(categorias, listaProductos);
                };
            });
        };
    });
});