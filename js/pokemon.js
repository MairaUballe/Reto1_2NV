let list = ["SPEAROW", "FEAROW", "EKANS", "ARBOK", "PIKACHU","RAICHU", "SANDSHREW", "SANDSLASH", "NIDORINA"]
let pokemones = []

list.forEach(element => {
  pokemones.push(element.toLowerCase())
});

document.addEventListener("DOMContentLoaded", async () => {
   for (let i = 0; i < pokemones.length; i++) {
       const pokemon = pokemones[i];
      await fetchData(pokemon)
    }
});

   
const fetchData = async (id) => {
    try {
        console.log(id)
        
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        
        console.log(data)

        const pokemon = {
            id,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            imgJuego: data.sprites.front_default,
            imgCvg: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse at, dignissimos aspernatur molestiae, quia eos officiis dolor corporis ullam, nemo eligendi maxime expedita. Blanditiis aliquid quod eius, exercitationem rerum id?',
            experiencia: data.base_experience,
            habilidades: data.abilities[0].ability.name,
        }
       
         pintarCard(pokemon)

    } catch (error) {
        console.log(error)
    }
} 

const pintarCard = pokemon => {
    const template = document.createElement('div')
    const templaeteString =  `
    <article class="card">
        <div class="card-body">
            <img src="${pokemon.imgCvg}" alt="imagen de vitoko" class="card-body-img" />
            <h1 class="card-body-title">
                ${pokemon.nombre}
            </h1>
            <h3>Experiencia: ${pokemon.experiencia}</h3>
            
            <p class="card-body-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse at, dignissimos aspernatur molestiae, quia eos officiis dolor corporis ullam, nemo eligendi maxime expedita. Blanditiis aliquid quod eius, exercitationem rerum id?</p>
            <button type="button" class="btn" onclick="mostrarHab('${pokemon.id}')">Ver Habilidades</button>
            
        </div>
        <div class="card-footer">
            <div class="card-footer-social">
                <p id="${pokemon.id}_hab" class="hidden">${pokemon.habilidades}</p>  
                </div>
            </div>
        </article>`
        template.innerHTML = templaeteString.trim()

        document.getElementById('root').appendChild(template)
}

  function mostrarHab(id){
    const elementHability = document.getElementById(`${id}_hab`)
    elementHability.classList.remove("hidden")
    }

