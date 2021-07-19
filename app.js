$( document ).ready(function() 
{
console.log( "El DOM esta listo" );
});


window.onload = function () {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Pizza de Rucula y Tomate',
            precio: 250,
            imagen: './img/pizza-1.jpg'
        },
        {
            id: 2,
            nombre: 'Pizza de pimientos y Cebolla',
            precio: 300,
            imagen: './img/pizza-2.jpg'
        },
        {
            id: 3,
            nombre: 'Pizza Muzzarella',
            precio: 300,
            imagen: './img/pizza-10.jpg'
        },
        {
            id: 4,
            nombre: 'Pizza de champiñones',
            precio: 350,
            imagen: './img/pizza-4.jpg'
        },
        {
            id: 5,
            nombre: 'Pizza de Macarrones con Queso',
            precio: 400,
            imagen: './img/pizza-5.jpg'
        },
        {
            id: 6,
            nombre: 'Porción de Faina',
            precio: 100,
            imagen: './img/pizza-6.jpg'
        },
        {
            id: 7,
            nombre: 'Pizza Pepperoni',
            precio: 300,
            imagen: './img/pizza-7.jpg'
        },
        {
            id: 8,
            nombre: 'Pizza de Aji Picante',
            precio: 400,
            imagen: './img/pizza-8.jpg'
        },
        {
            id: 9,
            nombre: 'Empanada de Carne',
            precio: 70,
            imagen: './img/empanada-1.jpg'
        },
        {
            id: 10,
            nombre: 'Empanada de Jamon y Queso',
            precio: 75,
            imagen: './img/empanada-1.jpg'
        },
        {
            id: 11,
            nombre: 'Empanada de Pollo',
            precio: 75,
            imagen: './img/empanada-1.jpg'
        },
        {
            id: 12,
            nombre: 'Empanada de Humita',
            precio: 75,
            imagen: './img/empanada-1.jpg'
        },
        {
            id: 13,
            nombre: 'Promo 1 pizza de muzzarella + 1 docena de empanadas',
            precio: 1000,
            imagen: './img/empanada-1.jpg'
        },
        {
            id: 14,
            nombre: 'Promo 2 pizzas de muzzarella',
            precio: 500,
            imagen: './img/pizza-10.jpg'
        },
        {
            id: 15,
            nombre: 'Promo 2 docenas de empanadas',
            precio: 1400,
            imagen: './img/pizza-10.jpg'
        }

    ];

    let carrito = [];
    let total = 0;
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonComprar = document.querySelector('#boton-comprar');
    const miLocalStorage = window.localStorage;
    const spanCarrito = document.getElementById('span-carrito');

    // Funciones

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = info.precio + '$';
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-danger','cursor-1');
            miNodoBoton.textContent = 'Añadir';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            miNodoBoton.addEventListener('click', mostrarBadge);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Calculo el total
        calcularTotal();
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    // Dibuja todos los productos guardados en el carrito


    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}$`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            miBoton.addEventListener('click', borrarBadge);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    /**
    * Calcula el precio total teniendo en cuenta los productos repetidos
    */
    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        carrito.forEach((item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            total = total + miItem[0].precio;
        });
        // Renderizamos el precio en el HTML
        DOMtotal.textContent = total.toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
        // Borra LocalStorage
        localStorage.clear();

    }


    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
            modal();
        }
    }

    // Funciones para mostrar y borrar el badge del carrito

    function mostrarBadge(){
            spanCarrito.classList.add('icon-button__badge')
    }

    function borrarBadge(){
            spanCarrito.classList.remove('icon-button__badge')
    }

    // Evento del boton comprar

function modal(){
    $(DOMbotonComprar).click(e=>{
        let modal = document.createElement('div');
        modal.classList.add('modal-1');
        modal.innerHTML = ` 
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title titulo-modal" id="exampleModalLabel">Gracias por tu compra!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Ya recibimos tu pedido.</p>
                        <p>Recibiras un correo electrónico cuando el pedido este listo</p> 
                        <p>Saludos!</p>
                        <p>Pizzeria BA :) </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        `
        $('body').append(modal);

        vaciarCarrito();
        borrarBadge();
    })
}

    
    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    DOMbotonVaciar.addEventListener('click',borrarBadge);


    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    calcularTotal();
    renderizarCarrito();
}