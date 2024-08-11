let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let juegos = []; 

function mostrarJuegos(data) {
    const container = document.getElementById('juegos-container');
    data.forEach(juego => {
        const juegoDiv = document.createElement('div');
        juegoDiv.classList.add('juego');

        juegoDiv.innerHTML = `
            <img src="${juego.imagen}" alt="${juego.nombre}">
            <h2>${juego.nombre}</h2>            
            <p class="plataformas">Plataformas: ${juego.plataformas.join(', ')}</p>
            <p class="tipos">Géneros: ${juego.tipos.join(', ')}</p>
            <p class="precio">$${juego.precio}</p>
            <button onclick="agregarAlCarrito('${juego.codigo}')">Agregar al Carrito</button>
        `;

        container.appendChild(juegoDiv);
    });
}

function agregarAlCarrito(codigo) {
    const juego = juegos.find(j => j.codigo === codigo);
    carrito.push(juego);
    actualizarCarrito();
    guardarCarrito();
}

function actualizarCarrito() {
    document.getElementById('carrito-cantidad').textContent = carrito.length;
}

function mostrarCarrito() {
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = '';

    carrito.forEach((juego, index) => {
        const juegoDiv = document.createElement('div');
        juegoDiv.classList.add('juego');

        juegoDiv.innerHTML = `
            <img src="${juego.imagen}" alt="${juego.nombre}">
            <h2>${juego.nombre}</h2>
            <p class="precio">$${juego.precio}</p>
            <button  onclick="quitarDelCarrito(${index})">
                Cerrar
            </button>
        `;

        carritoContainer.appendChild(juegoDiv);
    });

    const total = carrito.reduce((acc, juego) => acc + juego.precio, 0);
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    carritoContainer.appendChild(totalDiv);

    const vaciarCarritoButton = document.createElement('button');
    vaciarCarritoButton.classList.add('vaciar-carrito');
    vaciarCarritoButton.textContent = 'Vaciar Carrito';
    vaciarCarritoButton.onclick = vaciarCarrito;
    carritoContainer.appendChild(vaciarCarritoButton);
}

function quitarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    mostrarCarrito();
    guardarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    mostrarCarrito();
    guardarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ver-carrito').addEventListener('click', () => {
        document.getElementById('carrito-modal').style.display = 'block';
        mostrarCarrito();
    });

    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('carrito-modal').style.display = 'none';
    });

    document.getElementById('cerrar-carrito').addEventListener('click', () => {
        document.getElementById('carrito-modal').style.display = 'none';
    });

    getProducts();
    actualizarCarrito(); 
});