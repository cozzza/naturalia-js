const contenedorProductos = document.getElementById("contenedor-productos");

var productos = [];

$.ajax({
  url: "./stock.json",
  dataType: "json",
  success: (response) => {
    cargarStock(response, productos);
  },
});

function cargarStock(res, productos) {
  res.forEach((producto) => {
    var producto = new Producto(
      producto.nombre,
      producto.precio,
      producto.id,
      producto.img
    );
    productos.push(producto);
  });

  console.log(productos);

  mostrarProductos(productos);
}

const mostrarProductos = (array) => {
  contenedorProductos.innerHTML = "";

  array.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
                    <img class="card-img" src=${producto.img} alt="">
                    <h3 class= "card-title">${producto.nombre}</h3>
                    <p class="precioProducto card-text">Precio: $${producto.precio}</p>
                    <button onclick="agregarAlCarrito(${producto.id})" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>       
        `;
    contenedorProductos.appendChild(div);
  });
};

const carrito = [];
// agregar productos al carrito

const agregarAlCarrito = (itemId) => {
  const productoEnCarrito = carrito.find((prod) => prod.id === itemId);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const producto = productos.find((prod) => prod.id === itemId);

    carrito.push({
      img: producto.img,
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });
  }

  actualizarCarrito();
};

// actualizar carrito

const contenedorCarrito = document.getElementById("contenedor-carrito");

console.log(contenedorCarrito)

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");

    div.innerHTML = `
                <img src=${prod.img} width= "120px" alt="">
                <h5 style="width: 50px">${prod.nombre}</h5>
                <p>Precio <br> $${prod.precio}</p>
                <p>Cantidad <br>${prod.cantidad}</p>
                <button onclick="eliminarProducto(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
             `;

    contenedorCarrito.appendChild(div);
  });

  contadorCarrito.innerText = carrito.reduce(
    (acc, prod) => (acc += prod.cantidad),
    0
  );
  precioTotal.innerText = carrito.reduce(
    (acc, prod) => (acc += prod.precio * prod.cantidad),
    0
  );

  const totalProductos = JSON.stringify(precioTotal.innerText);
  const contadorItems = JSON.stringify(contadorCarrito.innerText);

  localStorage.setItem("cont productos en carrito ", contadorItems);
  localStorage.setItem("productos en carrito", JSON.stringify(carrito));
  localStorage.setItem("total productos", JSON.stringify(precioTotal.innerText));

  console.log(carrito);
};

// eliminar productos carrito

const eliminarProducto = (itemId) => {
  const producto = carrito.find((prod) => prod.id === itemId);

  producto.cantidad--;

  if (producto.cantidad === 0) {
    const index = carrito.indexOf(producto);
    carrito.splice(index, 1);
  }
  actualizarCarrito();
};

const contenedorModal = document.getElementsByClassName("modal-contenedor")[0];
const botonAbrir = document.getElementById("boton-carrito");
const botonCerrar = document.getElementById("carritoCerrar");
const modalCarrito = document.getElementsByClassName("modal-carrito")[0];

botonAbrir.addEventListener("click", () => {
  contenedorModal.classList.add("modal-active");
});
botonCerrar.addEventListener("click", () => {
  contenedorModal.classList.remove("modal-active");
});


function Producto(nombre, precio, id, img) {
  this.nombre = nombre;
  this.precio = precio;
  this.id = id;
  this.img = img;
}


// check out

// cuando toque el boton de check-out se abre un modal de checkout que cuando pone submit 
//se borra todo carrito y pone un cartel de enviado

const checkout = $(".checkout");
const checkContainer = $("#checkout-container");

$("#checkout").click(function () {
  console.log("toco")
  checkContainer.addClass("modal-active");
  contenedorModal.classList.remove("modal-active");
});

$("#realizar-compra").click(function () {
  checkContainer.removeClass("modal-active");
  $(".succes-container").addClass("modal-active")
  vaciarCarrito();
});

$("#cerrar-compra").click(function(){
  checkContainer.removeClass("modal-active");
});


const vaciarCarrito = () => {
  contenedorCarrito.innerHTML = " "
  contadorCarrito.innerHTML = "0"

}

$("#cerrar-succes").click (function(){
  $(".succes-container").removeClass("modal-active")
})