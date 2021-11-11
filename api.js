const btnNext = document.querySelector('#btnNext')
const btnBack = document.querySelector('#btnBack')
const character = document.getElementById('character')
const container = document.getElementById('container')
const buscador = document.getElementById('buscador')
const Btnbuscador = document.getElementById('btnbuscador')
const datosPersonajes = document.getElementsByClassName('datosPersonajes')

const Allpersonajes = []








document.addEventListener('DOMContentLoaded', async () => {
    estado = await leerAPI()
    pintarPersonajes()
})


// contador de la paginacion 
let counter = 1;
// actulizo los datos de la pagina con el boton next
btnNext.addEventListener('click', () => {
    counter + 1
    counter = counter
    fetch(`https://rickandmortyapi.com/api/character/?page=${++counter}`)
        .then(res => res.json())
        .then(data => {
            character.innerHTML = data.results.map(item => `
        <div class = ' personajes'>
        <div><img class="imageCharacter" src="${item.image}"></div>
        <div class ='datosPersonajes'>
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

    fetch(`https://rickandmortyapi.com/api/character/?page=${--counter}`)
        .then(res => res.json())
        .then(data => {
            character.innerHTML = data.results.map(item => `
        <div class = ' personajes'>
        <div><img class="imageCharacter" src="${item.image}"></div>
        <div class ='datosPersonajes'>
        <p>#${item.id}</p>
        <h2>${item.name}</h2>
        <p>${item.species}</p>
        <p>${item.status}</p>
        </div>
        </div>
       `).join('')
            console.log(data.results.map);
        });

})
// BUSCADOR DE PERSONAJES 
Btnbuscador.addEventListener('click', async () => {
    const personajes = await leerAPI()
    let texto = buscador.value
    character.innerHTML = '';
    const Personajes = Allpersonajes.filter(personaje => personaje.name.toLowerCase().includes(texto))
    console.log(Personajes);
    // si no se escribe nada en el buscador entonces no hagas nada 
    if (texto === '') {
        return;
    } else {
        container.innerHTML = ''
        actualizarDom(Personajes)

    }
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
    const data = await leerAPI()
    data.results.forEach(e => {

        const { id, name, species, status, image } = e
        const div = document.createElement('div')
        div.classList.add('personajes')
        div.id = id
        const divDatos = document.createElement('div')
        divDatos.classList.add('datosPersonajes')

        const imagen = document.createElement('img')
        imagen.classList.add('imageCharacter')
        const nombre = document.createElement('h2')
        const idChacharacter = document.createElement('p')
        const especie = document.createElement('p')
        const estado = document.createElement('p')
        imagen.src = image

        nombre.textContent = name
        idChacharacter.textContent = `#${id}`
        datosPersonajes.id = id

        especie.textContent = species
        estado.textContent = status
        div.appendChild(imagen)
        divDatos.appendChild(idChacharacter)
        divDatos.appendChild(nombre)
        divDatos.appendChild(especie)
        divDatos.appendChild(estado)

        div.appendChild(divDatos)
        character.appendChild(div)

    });
    const personajes = document.querySelectorAll('.personajes')
    createCards(personajes)



}


const actualizarDom = (info) => {
    info.forEach(item => {

        const divPersonaje = document.createElement('div')
        divPersonaje.classList.add('card')
        const imagenCard = document.createElement('img')
        imagenCard.src = e.target.src

        const imagen = document.createElement('img')
        const nombre = document.createElement('h2')
        const idChacharacter = document.createElement('p')
        const especie = document.createElement('p')
        const estado = document.createElement('p')
        // agrego clases 
        div.classList.add('update')
        imagen.classList.add('updateCharacter')
        // asigno propiedades 
        imagen.src = image
        nombre.textContent = name
        idChacharacter.textContent = `#${id}`
        especie.textContent = species
        estado.textContent = status
        // seteo como nodo 
        div.appendChild(imagen)
        div.appendChild(idChacharacter)
        div.appendChild(nombre)
        div.appendChild(especie)
        div.appendChild(estado)
        container.appendChild(div)
        divPersonaje.appendChild(imagenCard)
        document.querySelector('.personajes').appendChild(divPersonaje)
    })
}
function getAllCharacters() {
    let contador;
    for (contador = 1; contador <= 671; contador++) {
        fetch(`https://rickandmortyapi.com/api/character/${contador}`)
            .then(res => res.json())
            .then(data => {
                const infoPersonajes = [data]
                infoPersonajes.map(personaje => Allpersonajes.push({
                    image: personaje.image,
                    id: personaje.id,
                    name: personaje.name,
                    species: personaje.species,
                    origin: personaje.origin,
                    location: personaje.location,
                    estado: personaje.status
                }))

            })
    }
}
getAllCharacters()


 // creo la info de la card a mostrar con el evento 
async function dataCards() {
  
    const dataInfo = await leerAPI()
    dataInfo.results.forEach(x => {
        const { id,image, location, origin, episode } = x
        const divCard = document.createElement('div')
        // creo la clase y su id  para llamarla con un querySelector  
        divCard.id = id  
        divCard.classList.add('divCard')
        const imgCard = document.createElement('img')
        const originCard = document.createElement('p')
        const episodios = document.createElement('p')
       imgCard.src = image
        originCard.textContent = ` ${origin.name} , ${location.name} `
        episodios.textContent = `# ${episode.length}`
        divCard.appendChild(imgCard)
        divCard.appendChild(originCard)
        divCard.appendChild(episodios)

    })
 
}
dataCards()

 
 function createCards(pj) {
   pj.forEach(personaje => {
       personaje.addEventListener('click',  e => {
           
        const x = Allpersonajes.find(x=>x.id === Number(e.target.parentElement.id))
        

       })
   })
}
