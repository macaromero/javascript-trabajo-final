// VARIABLES //

// Lista de productos
let listaProductos = [
    {
        id: 1,
        nombre: "Cat Chow Gatitos",
        categoria: "Alimentos para gato",
        imagen: "cat-chow-gatitos.jpg",
        precio: 1200,
        stock: 20
    },
    {
        id: 2,
        nombre: "Dog Chow Edad Madura",
        categoria: "Alimentos para perro",
        imagen: "dog-chow-edad-madura.jpg",
        precio: 1000,
        stock: 10 
    },
    {
        id: 3,
        nombre: "Whiskas Adulto",
        categoria: "Alimentos para gato",
        imagen: "whiskas-adulto.jpg",
        precio: 970,
        stock: 30 
    },
    {
        id: 4,
        nombre: "Iams Adulto",
        categoria: "Alimentos para gato",
        imagen: "iams-adulto.jpg",
        precio: 900,
        stock: 25 
    },
    {
        id: 5,
        nombre: "Piedras Sanitarias",
        categoria: "Higiene",
        imagen: "piedras-sanitarias-poopy-pets.jpg",
        precio: 375,
        stock: 24 
    },
    {
        id: 6,
        nombre: "Royal Canin Poodle",
        categoria: "Alimentos para perro",
        imagen: "royal-canin-poodle.jpg",
        precio: 1400,
        stock: 15 
    },
    {
        id: 7,
        nombre: "Shampoo Pulguicida",
        categoria: "Higiene",
        imagen: "shampoo.jpg",
        precio: 240,
        stock: 44 
    },
    {
        id: 8,
        nombre: "Eukanuba Puppy",
        categoria: "Alimentos para perro",
        imagen: "eukanuba-puppy.jpg",
        precio: 1150,
        stock: 20 
    }
];

// Array de categorías de productos
let categorias = [
    {
        id: 1,
        nombre: "Alimentos para perro"

    },
    {
        id: 2,
        nombre: "Alimentos para gato"

    },
    {
        id: 3,
        nombre: "Higiene"

    }
];

// Variable para la creación de carrito de compras
let carrito = [];


// FUNCIONES //

// Función para crear carousel de productos del home
const crearCards = (lista) => {
    lista.forEach((p) => {
        if (document.querySelector("#listaProductos")) {
            let li = document.createElement("li");   
            li.setAttribute("class", "d-inline-block home__productos-item-carousel me-3");

            li.innerHTML = `
                <div class="card pt-3 home__productos-card">
                    <img class="card-img-top" src="./images/${p.imagen}" alt="Card image">
                    <div class="card-body text-center">
                        <h4 class="card-title fw-bold fs-4 gris">$${p.precio}</h4>
                        <p class="card-text">${p.nombre}</p>
                        <button class="btn w-100 home__productos-boton" id="producto${p.id}" onclick="agregarItem(${p.id})">Agregar al carrito</button>
                    </div>
                </div>          
            `;

            let ul = document.querySelector("#listaProductos");
            ul.appendChild(li);  
        } else if (document.querySelector("#cardsProductos")) {
            let col = document.createElement("div");
            col.setAttribute("class", "col mb-4");  
            col.setAttribute("id", `col${p.id}`)

            col.innerHTML = `
                <div class="card pt-3">
                    <img class="card-img-top" src="../images/${p.imagen}" alt="Card image">
                    <div class="card-body text-center">
                        <h4 class="card-title fw-bold fs-4 gris">$${p.precio}</h4>
                        <p class="card-text">${p.nombre}</p>
                        <button class="btn w-100 home__productos-boton" id="producto${p.id}" onclick="agregarItem(${p.id})">Agregar al carrito</button>
                    </div>
                </div>          
            `;

            let row = document.querySelector("#cardsProductos");
            row.appendChild(col);
        }
        
    });
};

// Funciones para mover el carousel de productos del home
let botonAtras = document.querySelector("#botonAtras");
if (botonAtras) {
    botonAtras.addEventListener("click", () => {
        let botonAtras = document.querySelector("#botonAtras");
        let lista = document.querySelector(".home__productos-lista-carousel");
        lista.setAttribute("class", "d-block home__productos-lista-carousel home__productos--boton-atras");
    });
};

let botonAdelante = document.querySelector("#botonAdelante");
if (botonAdelante != null) {
    botonAdelante.addEventListener("click", () => {
        let botonAdelante = document.querySelector("#botonAdelante");
        let lista = document.querySelector(".home__productos-lista-carousel");
        lista.setAttribute("class", "d-block home__productos-lista-carousel home__productos--boton-adelante");
    });
};

// Función para agregar productos al carrito de compras
const agregarItem = (p) => {
    let cantidad = 1;
    let marcador = false;
    let totalProductos = 1;
    let badgeCarrito = document.querySelector("#badgeCarrito");

    if (sessionStorage.getItem("usuario")) {
        listaProductos.forEach((producto) => {
            let item = {
                id: producto.id,
                nombre: producto.nombre,
                categoria: producto.categoria,
                imagen: producto.imagen,
                precioUnitario: producto.precio,
                cantidad: cantidad
            };
    
            if (carrito.length != 0) {
                if (p == producto.id) {
                    for (let i = 0; i < carrito.length; i++) {
                        if (p == carrito[i].id) {
                            marcador = false;
                            carrito[i].cantidad += 1;
                            break
                        } else {
                            marcador = true;
                        }
                    }
                    if (marcador == true) {
                        carrito.push(item);
                        totalProductos = carrito.length;
                        badgeCarrito.innerHTML = totalProductos;
                    };
                }
            } else {
                if (p == producto.id) {
                    carrito.push(item);
                    let badge = document.querySelector("#iconoCarrito");
                    badge.innerHTML = `
                    <span class="position-absolute translate-middle badge rounded-pill bg-danger navbar__carrito-badge" id="badgeCarrito">
                        ${totalProductos}
                    </span>
                    `;
                }
            }
    
        });
    
        let carritoJson = JSON.stringify(carrito);
        sessionStorage.setItem("carrito", carritoJson);
    } else {
        let myModal = new bootstrap.Modal(document.getElementById('sesionModal'));
        myModal.show()
    }

    
};

// Función para crear y aplicar los filtros de visualización de productos que seleccione el usuario
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

// Función para establecer el orden de los productos que seleccione el usuario
const ordenarProductos = (lista) => {
    $("#ordenProductos").change(function (e) {
        let valorFiltro = $("#filtroProductos").val();
        let listaNueva = [];
        if ((valorFiltro == null) || (valorFiltro == "todos")) {
            listaNueva = [];
            lista.forEach ((p) => {
                listaNueva.push(p)
            });
        } else {
            listaNueva = [];
            lista.forEach((p) => {
                if (p.categoria == valorFiltro) {
                    listaNueva.push(p);
                }  
            });
        };

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