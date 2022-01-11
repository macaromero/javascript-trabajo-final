// ARRAY DE PRODUCTOS //
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
const botonAdelante = () => {
    let botonAdelante = document.querySelector("#botonAdelante");
    let lista = document.querySelector(".home__productos-lista-carousel");
    lista.setAttribute("class", "d-block home__productos-lista-carousel home__productos--boton-adelante")
}

const botonAtras = () => {
    let botonAtras = document.querySelector("#botonAtras");
    let lista = document.querySelector(".home__productos-lista-carousel");
    lista.setAttribute("class", "d-block home__productos-lista-carousel home__productos--boton-atras")
}

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

// LLAMADA A LAS FUNCIONES // 
crearCards(listaProductos);

