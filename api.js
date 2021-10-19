const btnNext = document.querySelector('#btnNext')
const btnBack = document.querySelector('#btnBack')
const character = document.getElementById('character')
const container = document.getElementById('container')
const buscador = document.getElementById('buscador')
const Btnbuscador = document.getElementById('btnbuscador')



// contador de la paginacion 
let counter = 1;
// actulizo los datos de la pagina con el boton next
btnNext.addEventListener('click', () => {
    counter + 1
    counter = counter
    console.log(counter);
    fetch(`https://rickandmortyapi.com/api/character/?page=${++counter}`)
        .then(res => res.json())
        .then(data => {
            character.innerHTML = data.results.map(item => `
        <div class = 'character'>
        <div><img class="imageCharacter" src="${item.image}">
        <p>#${item.id}</p>
        <h2>${item.name}</h2>
        <p>${item.species}</p>
        <p>${item.status}</p>
        </div>
        </div>
       `).join('')
    });


})
btnBack.addEventListener('click',()=>{
    console.log(counter);
    fetch(`https://rickandmortyapi.com/api/character/?page=${--counter}`)
        .then(res => res.json())
        .then(data => {
            character.innerHTML = data.results.map(item => `
        <div class = 'character'>
        <div><img class="imageCharacter" src="${item.image}">
        <p>#${item.id}</p>
        <h2>${item.name}</h2>
        <p>${item.species}</p>
        </div>
        </div>
       `).join('')
    });
})
document.addEventListener('DOMContentLoaded', () => {
    leerAPI()
})


async function leerAPI() {
    try {
        const res = await fetch('https://rickandmortyapi.com/api/character')
        const data = await res.json()
        pintarPersonajes(data)
        return data 
    } catch (error) {
        console.log(error);
    }

}
function pintarPersonajes(data) {
    data.results.forEach(e => {
        const { id, name, species,status, image } = e
        const div = document.createElement('div')
        div.classList.add('personajes')
        const imagen = document.createElement('img')
        imagen.classList.add('imageCharacter')
        const nombre = document.createElement('h2')
        const idChacharacter = document.createElement('p')
        const especie = document.createElement('p')
        const estado = document.createElement('p')
        imagen.src = image
        nombre.textContent = name
        idChacharacter.textContent = `#${id}`
        especie.textContent = species
        estado.textContent = status
        div.appendChild(imagen)
        div.appendChild(idChacharacter)
        div.appendChild(nombre)
        div.appendChild(especie)
        div.appendChild(estado)
        document.querySelector('#character').appendChild(div)
    });
  
   


}
const filtrar =  async ()=>{
  const personajes =  await leerAPI()
  let texto =  buscador.value
 const Personajes = personajes.results.filter(personaje=> personaje.name.toLowerCase().includes(texto) )
Personajes.forEach(personaje =>{
let divBusqueda = document.createElement('div')
let imagenPersonaje = document.createElement('img')
let nombre = document.createElement('p')
imagenPersonaje.src=personaje.image
nombre.textContent = personaje.name
divBusqueda.appendChild(nombre)
divBusqueda.appendChild(imagenPersonaje)
character.appendChild(divBusqueda)
})


} 
Btnbuscador.addEventListener('click' ,filtrar)
