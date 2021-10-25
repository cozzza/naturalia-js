const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

const carrito = []

const mostrarProductos = (array) => {
    contenedorProductos.innerHTML = ''

    array.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
                    <img src=${producto.img} alt="">
                    <h3>${producto.nombre}</h3>
                    <p class="precioProducto">Precio: $${producto.precio}</p>
                    <button onclick="agregarAlCarrito(${producto.id})" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>       
        `
        contenedorProductos.appendChild(div)
    } )
}

mostrarProductos(productos);

// agregar productos al carrito

const agregarAlCarrito = (itemId) => {

    const productoEnCarrito = carrito.find((prod) => prod.id === itemId)

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++
    } else {

        const producto = productos.find((prod) => prod.id === itemId)

        carrito.push({
            img: producto.img,
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        })
    }

    actualizarCarrito()
}

// actualizar carrito

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
                <img src=${prod.img} width= "120px" alt="">
                <h3 style="width: 50px; padding-right:1px">${prod.nombre}</h3>
                <p>Precio <br> $${prod.precio}</p>
                <p>Cantidad <br>${prod.cantidad}</p>
                <button onclick="eliminarProducto(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
             `

        contenedorCarrito.appendChild(div)
    })

    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc += prod.cantidad, 0)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc += prod.precio * prod.cantidad, 0)

    const contadorItems = JSON.stringify(contadorCarrito.innerText);
    localStorage.setItem("contador items", contadorItems);


    const carritoJson = JSON.stringify(carrito.innerHTML);
    localStorage.setItem('carrito', carrito)
}

// eliminar productos carrito

const eliminarProducto = (itemId) => {
    const producto = carrito.find((prod) => prod.id === itemId)

    producto.cantidad--

    if (producto.cantidad === 0) {
        const index = carrito.indexOf(producto)
        carrito.splice(index, 1)
    }
    actualizarCarrito()
}

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.add('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.remove('modal-active')
})
contenedorModal.addEventListener('click', ()=>{
    botonCerrar.click()
})


// log-in
const abrirLogin = $(".login-abrir");
const modalContainer = $(".modal-login-contenedor");
const modalLogin = $(".modal-login")
const cerrarLogin = $(".cerrar-login")

abrirLogin.click(function () {
    modalContainer.addClass("modal-active")
});

cerrarLogin.click(function () {
    modalContainer.removeClass("modal-active")
})


const inicioSesion = ("#inicio-sesion");

class User {
    constructor(nombre, email, pass) {
        this.nombre = nombre;
        this.email = email;
        this.pass = pass;
    }
}
function login() {
    var nombre = $("#user").value;
    var email = $("#email").value;
    var pass = $("#pass").value;
    let user1 = new User(nombre, email, pass);
    sessionStorage.setItem("usuario", user1.nombre);
}

function agregarNombre() {
    if (sessionStorage.getItem("usuario")) {
        let usuarioActual = sessionStorage.getItem("usuario");

        var loginContainer = $("#current-user");
        loginContainer.append(`<div> ${usuarioActual} </div>`)
        
        modalContainer.removeClass("modal-active");
    }
}


