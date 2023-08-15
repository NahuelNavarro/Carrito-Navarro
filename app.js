let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const pintarCards = (productos) =>{
	const contenedorProductos = document.querySelector(".lista-productos");
	contenedorProductos.innerHTML="";
	productos.forEach(producto => {
		const div = document.createElement("div");
			div.innerHTML = 	`
			<div class="card" style="width: 18rem;">
			<img class="card-img-top" src="${producto.imagen}" alt="Card image cap">
			<div class="card-body">
			<h5 class="card-title">${producto.title}</h5>
			<p class="card-text">$${producto.precio}</p>
			<a  class="btn btn-dark" id ="${producto.id}">Agregar al carrito</a>
			</div>
		`;
		contenedorProductos.appendChild(div);

		const boton = document.getElementById(`${producto.id}`);
		boton.addEventListener("click",() => {
			agregarAlCarrito(producto.id)
		})
		
	});
	
};

const agregarAlCarrito = (id) => {
	if (!carrito.some((producto) => producto.id === id)) {
		const producto = productos.find((producto) => producto.id === id);
		carrito.push({ ...producto, cantidad: 0 });
	} 	const producto = carrito.find((prod) => prod.id === id);

	if(producto.cantidad >= producto.stock){
		Swal.fire({
			title: 'No hay mas en stock',
			icon: 'error',
			confirmButtonText: 'OK'})
	}else{
		producto.cantidad++
	}
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();

	actualizarTotal();
	
}

const mostrarCarrito = () => {
	const contenedorCarrito = document.querySelector(".contendor-carrito");
	contenedorCarrito.innerHTML="";
	const contenedorCarrito1 = document.querySelector(".contendor-carrito1");
	contenedorCarrito1.innerHTML="";
	
	const vacioContenedor =document.querySelector(".vacio")
	vacioContenedor.innerHTML="";
	const contenedorBoton = document.querySelector(".boton-total");
	contenedorBoton.innerHTML="";
	const contenedorBotonVacio = document.querySelector(".vaciarCarrito");
	contenedorBotonVacio.innerHTML="";
	
	
	if(carrito.length > 0){
	
	carrito.forEach((producto)=>{
		const tr = document.createElement("tr");
		tr.innerHTML=
		`
	<tr>
		<th scope="row"><img src="${producto.imagen}" alt=""></th>
		<td>${producto.title}</td>
		<td>$${producto.precio}</td>
		<td><div class="counter">
		  <button id="decrementar-${producto.id}" class="button">-</button>
		  <span class="product-price">${producto.cantidad}</span>
		  <button id="incrementar-${producto.id}" class="button">+</button>
		  </div></td>
		<td>$${producto.precio*producto.cantidad}</td>
	</tr>
    `;
	const tr1 = document.createElement("tr");
		tr1.innerHTML=
		`
		<tr>
		<th scope="row"><img src="${producto.imagen}" alt=""></th>
		<td>${producto.title}</td>
		<td>$${producto.precio}</td>
		<td><div class="counter">
		  <button id="decrementar-${producto.id}" class="button">-</button>
		  <span class="product-price">${producto.cantidad}</span>
		  <button id="incrementar-${producto.id}" class="button">+</button>
		  </div></td>
		<td>$${producto.precio*producto.cantidad}</td>
	</tr>
		
	
    `;
	contenedorCarrito1.appendChild(tr1)
	contenedorCarrito.appendChild(tr)

	const incrementar =document.getElementById(`incrementar-${producto.id}`);
	incrementar.addEventListener("click",()=>{
		incrementarProducto(producto.id)
	})

	const decrementar = document.getElementById(`decrementar-${producto.id}`);
	decrementar.addEventListener("click",()=>{
		decrementarProducto(producto.id)
	})

	});

		const div = document.createElement("div");
		div.innerHTML=
		`
		<button  type="button" class="btn btn-dark btn-lg"  >Pagar</button>
		 `;
		contenedorBoton.appendChild(div)

		const vaciar = document.createElement("vaciar");
		vaciar.innerHTML=
		`
		<button  type="button" class="btn btn-dark btn-lg" id="vaciarCarrito" >Vaciar Carrito</button>
		 `;


		 contenedorBotonVacio.appendChild(vaciar)

		 const vaciarCarrito = document.getElementById("vaciarCarrito");
		 vaciarCarrito.addEventListener("click",vaciarCarrito1)

	}else{
		
		vacioContenedor.innerHTML = '<div class="alert alert-danger" role="alert">No hay nada en el carrito, seleccione su producto</div> ';
	}
	
};

const incrementarProducto = (id) => {
	const producto = carrito.find((prod) => prod.id === id);

	if(producto.cantidad >= producto.stock){
		Swal.fire({
			title: 'No hay mas en stock',
			icon: 'error',
			confirmButtonText: 'OK'})
	}else{
		producto.cantidad++
	}
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
	actualizarTotal();
};

const decrementarProducto = (id) =>{
	const producto = carrito.find((prod) => prod.id === id);
	if(producto.cantidad === 1){
		eliminarProducto(producto.id);
		actualizarTotal();
	}else{
		producto.cantidad--;
		localStorage.setItem("carrito", JSON.stringify(carrito));
		mostrarCarrito();
		actualizarTotal();

	}
	
};

const actualizarTotal = () => {
	const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
	console.log(total)
	const contenedortotales = document.querySelector(".total-final");
	contenedortotales.innerHTML="";
	
		const div = document.createElement("div");
			div.innerHTML = 	`
			<div class= "box-total">El total es $ ${total}</div>
		`;

		contenedortotales.appendChild(div);
		mostrarCarrito();
};

const eliminarProducto = (id) => {
	carrito = carrito.filter((producto) => producto.id !== id);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

function vaciarCarrito1(){
	carrito =  [];

	localStorage.setItem("carrito", JSON.stringify(carrito));
	actualizarTotal();
}


actualizarTotal();
pintarCards(productos);
mostrarCarrito();
