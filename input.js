const buscador = document.querySelector('#buscador')
const boton = document.querySelector('#boton')
const resultado = document.querySelector('#resultado')
const productos = [
    {nombre:'manzana',
    tipo:'fruta',
    color:'rojo', 
    valor:'$75'},

    {nombre:'melon',
    tipo:'fruta',
    color:'amarillo', 
    valor:'$300'} ,

    {nombre:'palta',
    tipo:'fruta',
    color:'verde', 
    valor:'$90'}
]
const filtrar = ()=>{
    resultado.innerHTML=''
  const texto = buscador.value.toLowerCase()
for(let producto of productos){
    let nombre= producto.nombre.toLowerCase()
    if(nombre.indexOf(texto) !== -1){
        resultado.innerHTML +=`
        <li>${producto.nombre}- valor :${producto.valor}</li>
        `
    }
   
}
if(resultado.innerHTML==='' ){
    resultado.innerHTML +=`
    <li>Producto no encontrado gel</li>
    `
}

 
}
boton.addEventListener('click',filtrar)
buscador.addEventListener('keyup',filtrar)