//variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//listeners 
cargarEventListeners();

function cargarEventListeners(){
    //cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Muestra los cursos de local storage
    document.addEventListener('3', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTMl();
    });

    //vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHtml(); //Eliminamos todo el HTML 
    })
}

//Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso); 
    }
}
function leerDatosCurso(curso){

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        image: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado 
            }else{
                return curso;  //retorna los objetos que nos son los duplicados 
            }
        })
        articulosCarrito = [...cursos]
    }else{
        //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTMl();
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso') ) {
        // e.target.parentElement.parentElement.remove();
        const cursoId = e.target.getAttribute('data-id')
        
        // Eliminar del arreglo del carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTMl();
    }
}


//Muestra el carrito de compras en el HTMl 
function carritoHTMl(){

    //Limpiar el HTML
    limpiarHtml();

    //rercorre e. carrito y genera el HTML 
    articulosCarrito.forEach( curso => {
        const { image, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = '${image}' width='100'>
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>

            <td>
                <a href = '#' class = 'borrar-curso' data-id ='${id}'> X </a>
            </td>
        `;

        //agrega el HTML del carrito en le tbody
        contenedorCarrito.appendChild(row);
    });
    
    //agregar el carrito a local storage
    addStorage();

}

function addStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


function limpiarHtml(){

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
