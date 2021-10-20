const btnNext = document.querySelector('#btnNext')
const btnBack = document.querySelector('#btnBack')
const character = document.getElementById('character')
const container = document.getElementById('container')
const buscador = document.getElementById('buscador')
const Btnbuscador = document.getElementById('btnbuscador')

document.addEventListener('DOMContentLoaded', () => {
    leerAPI()
    pintarPersonajes()
})


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
// boton back del paginador 
btnBack.addEventListener('click', () => {
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
// BUSCADOR DE PERSONAJES 
Btnbuscador.addEventListener('click', async () => {
    const personajes = await leerAPI()
    let texto = buscador.value

    const Personajes = personajes.results.filter(personaje => personaje.name.toLowerCase().includes(texto))
})

async function leerAPI() {
    try {
        const res = await fetch('https://rickandmortyapi.com/api/character')
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
    }

}

 async function pintarPersonajes() {
    const  data = await leerAPI()
    data.results.forEach(e => {
        const { id, name, species, status, image } = e
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


