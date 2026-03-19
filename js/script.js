const productos=[

{nombre:"Muzzarella",precio:10000,imagen:"imagenes/muzzarella.jpg"},
{nombre:"Napolitana",precio:11000,imagen:"imagenes/napolitana.jpg"},
{nombre:"Fugazzeta",precio:12000,imagen:"imagenes/fugazzeta.jpg"},
{nombre:"Jamón y morrones",precio:12500,imagen:"imagenes/jamon-y-morrones.jpg"},
{nombre:"Cochina",precio:13000,imagen:"imagenes/cochina.jpg"},
{nombre:"Tomate y albahaca",precio:15000,imagen:"imagenes/tomate-y-albahaca.jpg"},
{nombre:"sandwich de milanesa",precio:9000,imagen:"imagenes/sandwich-de-milanesa.jpg"},
{nombre:"cono de papas",precio:5000,imagen:"imagenes/cono-de-papas.jpg"},

]

let carrito=JSON.parse(localStorage.getItem("carrito"))||[]

function toggleCarrito(){
    

let carrito = document.getElementById("carrito")
let overlay = document.querySelector(".overlay")

overlay.classList.toggle("activo")

carrito.classList.toggle("abierto")

}

function cargarMenu(){

let menu=document.getElementById("menu")

productos.forEach((p,i)=>{

let card=document.createElement("div")

card.classList.add("card")

card.innerHTML = `
<div class="card-bg" style="background-image:url('${p.imagen}')">
<div class="contenido">

<h3>${p.nombre}</h3>
<p>$${p.precio}</p>

<button onclick="agregar(${i})">
Agregar
</button>

</div>

</div>
`

menu.appendChild(card)

})

}

cargarMenu()

function agregar(i){
    
  let producto = productos[i]

  let img = document.createElement("img")
  img.src = producto.imagen
  img.classList.add("volando")

  document.body.appendChild(img)

  let boton = event.target
  let rect = boton.getBoundingClientRect()

  img.style.left = rect.left + "px"
  img.style.top = rect.top + "px"

  let carritoIcono = document.querySelector(".btn-carrito")
  let carritoRect = carritoIcono.getBoundingClientRect()

  setTimeout(()=>{
    img.style.left = carritoRect.left + "px"
    img.style.top = carritoRect.top + "px"
    img.style.transform = "scale(0.2)"
    img.style.opacity = "0.3"
  },10)

  setTimeout(()=>{
    img.remove()
  },700)


let prod=carrito.find(p=>p.nombre===productos[i].nombre)

if(prod){

prod.cantidad++

}else{

carrito.push({

nombre:productos[i].nombre,
precio:productos[i].precio,
cantidad:1

})

}

guardarCarrito()

mostrarCarrito()

}



function cambiarCantidad(nombre,valor){

let prod=carrito.find(p=>p.nombre===nombre)

prod.cantidad+=valor

if(prod.cantidad<=0){

carrito=carrito.filter(p=>p.nombre!==nombre)

}

guardarCarrito()

mostrarCarrito()

}


function mostrarCarrito(){

let lista=document.getElementById("listaCarrito")
let total=0

lista.innerHTML=""

carrito.forEach(p=>{

let li=document.createElement("li")

li.innerHTML=`

${p.nombre} x${p.cantidad}

<button onclick="cambiarCantidad('${p.nombre}',1)">+</button>
<button onclick="cambiarCantidad('${p.nombre}',-1)">-</button>

`

lista.appendChild(li)

total+=p.precio*p.cantidad

})

document.getElementById("total").innerText=total

}

function guardarCarrito(){

localStorage.setItem("carrito",JSON.stringify(carrito))

}

mostrarCarrito()

function enviarPedido(){

let nombre=document.getElementById("nombre").value
let direccion=document.getElementById("direccion").value

let mensaje="🍕 Pedido nuevo%0A%0A"

mensaje+=`Cliente: ${nombre}%0A`
mensaje+=`Dirección: ${direccion}%0A%0A`

mensaje+="Pedido:%0A"

let total=0

carrito.forEach(p=>{

mensaje+=`- ${p.nombre} x${p.cantidad}%0A`

total+=p.precio*p.cantidad

})

mensaje+=`%0ATotal: $${total}`

let telefono="5401169769132"

let url=`https://wa.me/${telefono}?text=${mensaje}`

window.open(url)

}

