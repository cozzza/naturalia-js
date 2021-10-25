
const productos = [
    {
        nombre: "Leche de almendras Amande",
        precio: 220,
        id: 1,
        img: './img/leche-almendras.png'
    },
    {
        nombre: "Yogur Haulani",
        precio: 110,
        id: 2,
        img: './img/haulani.png'
    },
    {
        nombre: "Alfajor felices las vacas",
        precio: 100,
        id: 3,
        img: './img/alfajor.png'
    },
    {
        nombre: "Galletas Cookids",
        precio: 120,
        id: 4,
        img: './img/cookids-galles.png'
    },
    {
        nombre: "Tofu soyana",
        precio: 200,
        id: 5,
        img: './img/tofu.png'
    },
    {
        nombre: "Queso Crudda",
        precio: 270,
        id: 6,
        img: './img/crudda-queso.png'
    },
    {
        nombre: "Nitro Tea",
        precio: 180,
        id: 7,
        img: './img/nitro-tea.png'
    },
    {
        nombre: "Aceite de coco",
        precio: 260,
        id: 7,
        img: './img/aceite-coco.png'
    },
];


const productosJson = JSON.stringify(productos);
localStorage.setItem("productos", productosJson);

