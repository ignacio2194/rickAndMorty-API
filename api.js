const btnNext = document.querySelector('#btnNext')
const btnBack = document.querySelector('#btnBack')
const character = document.getElementById('character')
const container = document.getElementById('container')
const buscador = document.getElementById('buscador')
const Btnbuscador = document.getElementById('btnbuscador')
const  Allpersonajes = []
console.log(Allpersonajes);


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
    fetch(`https://rickandmortyapi.com/api/character/?page=${++counter}`)
        .then(res => res.json())
        .then(data => {
            character.innerHTML = data.results.map(item =>   `
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
       console.log(data.results.map);
    });
    
})
// BUSCADOR DE PERSONAJES 
Btnbuscador.addEventListener('click', async () => {
    const personajes = await leerAPI()
    let texto = buscador.value
    character.innerHTML='';
    const Personajes = Allpersonajes.filter(personaje => personaje.name.toLowerCase().includes(texto))
    console.log(Personajes);
    // si no se escribe nada en el buscador entonces no hagas nada 
    if(texto ===''){
        return ;
    }else{
    container.innerHTML=''
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
        character.appendChild(div)

    });
}


const actualizarDom = (info) => {
    info.forEach(item => {
        const { id, name, species, status, image } = item
        // creo los elementos
        const div = document.createElement('div')
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
    })
}
 function  getAllCharacters(){
let contador ;
for(contador=1; contador<=671 ; contador++){
    fetch(`https://rickandmortyapi.com/api/character/${contador}`)
    .then(res=>res.json())
    .then(data=>{
    const infoPersonajes = [data]
     infoPersonajes.map(personaje=> Allpersonajes.push({image:personaje.image,
                                                        id:personaje.id ,
                                                        name:personaje.name,
                                                        species:personaje.species,
                                                        estado:personaje.status }))
    })
}
}
getAllCharacters()