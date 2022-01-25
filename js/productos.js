// FUNCIONES //

// Función para crear carousel de productos del home
$(() => {
    let listaProductos;
    const urlProductos = "../json/listaProductos.json";
    let categorias;
    const urlCategorias = "../json/categorias.json";

    // Llamada al JSON de productos para traer el array
    $.getJSON(urlProductos, (data, status) => {
        if (status == "success") {
            listaProductos = data;

            // Función para crear las cards del carousel de productos del home y las cards de la sección productos
            const crearCards = (lista) => {
                lista.forEach((p) => {
                    // Si encuentra el selector #listaProductos entonces significa que el usuario se encuentra en la home, y por ende crea el carousel de productos
                    if (document.querySelector("#listaProductos")) {
                        let li = document.createElement("li");   
                        li.setAttribute("class", "d-inline-block home__productos-item-carousel me-3");
            
                        li.innerHTML = `
                            <div class="card pt-3 home__productos-card">
                                <img class="card-img-top productos__img" src="./images/${p.imagen}" alt="Card image">
                                <div class="card-body text-center">
                                    <h4 class="card-title fw-bold fs-4 gris productos__precio">$${p.precio}</h4>
                                    <p class="card-text productos__nombre">${p.nombre}</p>
                                    <button class="btn w-100 home__productos-boton" id="producto-${p.id}">Agregar al carrito</button>
                                </div>
                            </div>          
                        `;
            
                        let ul = document.querySelector("#listaProductos");
                        ul.appendChild(li);
                        
                    // Si en cambio, encuentra el selector #cardsProductos entonces significa que el usuario se encuentra en la página de productos, y por ende crea las cards de todos los productos
                    } else if (document.querySelector("#cardsProductos")) {
                        let col = document.createElement("div");
                        col.setAttribute("class", "col mb-4");  
                        col.setAttribute("id", `col${p.id}`)
            
                        col.innerHTML = `
                            <div class="card pt-3">
                                <img class="card-img-top productos__img" src="../images/${p.imagen}" alt="Card image">
                                <div class="card-body text-center">
                                    <h4 class="card-title fw-bold fs-4 gris productos__precio">$${p.precio}</h4>
                                    <p class="card-text productos__nombre">${p.nombre}</p>
                                    <button class="btn w-100 home__productos-boton" id="producto-${p.id}">Agregar al carrito</button>
                                </div>
                            </div>          
                        `;
            
                        let row = document.querySelector("#cardsProductos");
                        row.appendChild(col);
                    }
                    
                });
            };

            // Funciones para mover el carousel de productos del home
            $("#botonAtras").click (function (e) {
                if ($("#botonAtras")) {
                    e.preventDefault();
                    $(".home__productos-lista-carousel").animate(
                        {left: "0"},
                        "slow"
                    )
                }
            });

            $("#botonAdelante").click (function (e) {
                if ($("#botonAdelante")) {
                    e.preventDefault();
                    $(".home__productos-lista-carousel").animate(
                        {left: "-596px"},
                        "slow"
                    )
                }
            })


            // Llamada al JSON de categorías     
            $.getJSON(urlCategorias, (data, status) => {
                categorias = data;

                if (status == "success") {
                    // Función para crear y aplicar los filtros de visualización de productos que seleccione el usuario en la sección productos
                    const crearFiltros = (categorias, lista) => {
                    let listaNueva = [];
                    $("#filtroProductos").append(
                        `
                        <option selected disabled value="default" class="gris">Filtrar por categoría</option>
                        <option value="todos" class="colorPrincipal">Todos</option>
                        `);
                        
                    categorias.forEach((c) => {
                        $("#filtroProductos").append(
                            `
                            <option value="${c.nombre}" class="colorPrincipal" id="productos__filtro-categorias">${c.nombre}</option>
                            `);       
                    });

                    $("#filtroProductos").change(function(e) {
                        $("#cardsProductos").empty();
                        if ((this.value == "todos") || (this.value == null)) {
                            crearCards(lista);
                            $("#ordenProductos").val("default");
                            listaNueva = [];
                            lista.forEach ((p) => {
                                listaNueva.push(p)
                            });
                        } else {
                            listaNueva = [];
                            lista.forEach((p) => {
                                if (p.categoria == this.value) {
                                    listaNueva.push(p);
                                }  
                            });
                            crearCards(listaNueva);
                            $("#ordenProductos").val("default");
                        };        
                    });
                        ordenarProductos(listaProductos);
                    };

                    // Función para establecer el orden de los productos que seleccione el usuario en la sección productos
                    const ordenarProductos = (lista) => {
                        $("#ordenProductos").change(function (e) {
                            let valorFiltro = $("#filtroProductos").val();
                            let listaNueva = [];

                            // Si la categoría (variable valorFiltro) es null o "todos", se crea la variable listaNueva con los items exactamente en el mismo orden en el que se encontraban
                            if ((valorFiltro == null) || (valorFiltro == "todos")) {
                                listaNueva = [];
                                lista.forEach ((p) => {
                                    listaNueva.push(p)
                                });
                            // Sino se crea la variable listaNueva con los items que posean la misma categoría que la variable valorFiltro
                            } else {
                                listaNueva = [];
                                lista.forEach((p) => {
                                    if (p.categoria == valorFiltro) {
                                        listaNueva.push(p);
                                    }  
                                });
                            };

                            // Luego se ordenan los elementos del array según el orden que establezca el usuario
                            switch (this.value) {
                                case "default":
                                        let listaDefault = listaNueva.sort((a, b) => {
                                            return a.id - b.id 
                                        });

                                        $("#cardsProductos").empty()
                                        crearCards(listaDefault);
                                        break;

                                case "nombre":
                                        let listaPorNombre = listaNueva.sort((a, b) => {
                                            if (a.nombre < b.nombre) {
                                                return -1
                                            }
                                            if (a.nombre > b.nombre) {
                                                return 1
                                            }
                                            return 0 
                                            });
                                        $("#cardsProductos").empty()
                                        crearCards(listaPorNombre);
                                        break;

                                case "menorPrecio":
                                        let listaPorMenorPrecio = listaNueva.sort((a, b) => {
                                            return a.precio - b.precio
                                            });
                                        $("#cardsProductos").empty()
                                        crearCards(listaPorMenorPrecio);
                                        break;

                                case "mayorPrecio":
                                        let listaPorMayorPrecio = listaNueva.sort((a, b) => {
                                            return b.precio - a.precio
                                            });
                                        $("#cardsProductos").empty()
                                        crearCards(listaPorMayorPrecio);
                                        break;
                        
                                default:
                                        break;
                            };
                        });
                    };


                    // LLAMADA A LAS FUNCIONES // 
                    crearCards(listaProductos);
                    crearFiltros(categorias, listaProductos);
                };
            });
        };
    });
});