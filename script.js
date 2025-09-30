/*
--------------------------------
-- C L A S E  P R O D U C T O --
--------------------------------
*/
class Producto {
  constructor(nombre, codigo, precio, stock) {
    this.nombre = nombre;
    this.codigo = codigo;
    this.precio = precio;
    this.stock = stock;
  }

  getProducto() {
    return `${this.nombre} (${this.codigo}) - $${this.precio}`;
  }
}

/*
------------------------------------
-- VARIABLES Y ELEMENTOS DEL DOM  --
------------------------------------
*/
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const botones = document.querySelectorAll(".agregar");
const lista = document.getElementById("carrito-lista");
const totalSpan = document.getElementById("total");

/*
--------------------------------
-- FUNCIONES PRINCIPALES      --
--------------------------------
*/
function crearProducto(boton) {
  return new Producto(
    boton.parentElement.querySelector(".nombre").textContent,
    boton.parentElement.querySelector(".codigo").textContent,
    boton.parentElement.querySelector(".precio").textContent.replace("$", ""),
    Number(boton.parentElement.querySelector(".stock").textContent)
  );
}

function verificarStock(producto) {
  const cantidad = carrito.filter((p) => p.codigo === producto.codigo).length;
  if (cantidad >= producto.stock) {
    alert(
      `¡No puedes agregar más unidades de ${producto.nombre}! Stock disponible: ${producto.stock}`
    );
    return false;
  }
  return true;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - ${producto.codigo} - $${producto.precio}`;
    lista.appendChild(li);

    total += Number(producto.precio);
  });

  totalSpan.textContent = total;
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  guardarCarrito();
  mostrarCarrito();
}

/*
--------------------------------
-- EVENTOS DE LOS BOTONES     --
--------------------------------
*/
botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = crearProducto(boton);
    if (verificarStock(producto)) {
      agregarAlCarrito(producto);
    }
  });
});

/*
--------------------------------
-- AL INICIAR LA PÁGINA        --
--------------------------------
*/
window.addEventListener("load", mostrarCarrito);
