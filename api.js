const btnNext = document.querySelector('#btnNext')
btnNext.addEventListener('click',paginaSiguiente)
document.addEventListener('DOMContentLoaded', () => {
    leerAPI()
})


async function leerAPI() {
    try {
    const res = await fetch('https://rickandmortyapi.com/api/character')
    const data = await res.json()
    paginaSiguiente(data.info)
    pintarPersonajes(data)
    } catch (error) {
        console.log(error);
    }
    
}
function pintarPersonajes(data) {
    data.results.forEach(e => {

        const { id, name, species, image } = e
        const div = document.createElement('div')
        const imagen = document.createElement('img')
        imagen.classList.add('imageCharacter')
        const nombre = document.createElement('h2')
        const idChacharacter = document.createElement('p')
        const especie = document.createElement('p')
        imagen.src = image
        nombre.textContent = name
        idChacharacter.textContent=`#${id}`
        especie.textContent = species
        div.appendChild(imagen)
        div.appendChild(idChacharacter)
        div.appendChild(nombre)
        div.appendChild(especie)
        document.querySelector('#character').appendChild(div)
    });
  

}
function paginaSiguiente(info) {
let contador = 1 

};
