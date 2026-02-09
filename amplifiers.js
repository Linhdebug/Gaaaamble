// amplifiers.js

const availableAmplifiers = [
    {name:"Ojo de dios",description:"Cada 5 tiradas hay un patrón de ojo asegurado.",price:15},
    {name:"7 a tutiplem",description:"Aumenta la probabilidad del 7 a un 50%.",price:15},
    {name:"1 aunque sea",description:"Si en una tirada no sale patrón, la siguiente se asegura un patrón de unos.",price:5},
    {name:"Como si nada hubiera pasado",description:"Si en tres tiradas no obtienes patrón, se te da 5 tiradas.",price:15}
];

let playerInventory=[];
let tiradasHechas=0;

// DOM
const modifiersBtn = document.getElementById("modifiersBtn");
const inventoryBtn = document.getElementById("inventoryBtn");
const modifiersMenu = document.getElementById("modifiersMenu");
const inventoryMenu = document.getElementById("inventoryMenu");
const modifiersList = document.getElementById("modifiersList");
const inventoryList = document.getElementById("inventoryList");
const closeModifiers = document.getElementById("closeModifiers");
const closeInventory = document.getElementById("closeInventory");

modifiersBtn.addEventListener("click",()=>{modifiersMenu.style.display="block";renderModifiers();});
closeModifiers.addEventListener("click",()=>{modifiersMenu.style.display="none";});
inventoryBtn.addEventListener("click",()=>{inventoryMenu.style.display="block";renderInventory();});
closeInventory.addEventListener("click",()=>{inventoryMenu.style.display="none";});

// Mostrar 3 aleatorios
let currentModifiers=[];
function renderModifiers(){
    modifiersList.innerHTML="";
    if(currentModifiers.length===0){ currentModifiers = availableAmplifiers.slice(); shuffle(currentModifiers); currentModifiers = currentModifiers.slice(0,3);}
    currentModifiers.forEach((amp,index)=>{
        if(playerInventory.find(a=>a.name===amp.name)) return; // no mostrar comprados
        const div=document.createElement("div");
        div.style.marginBottom="20px";
        div.innerHTML=`<div style="color:gold;font-size:20px;font-weight:bold">${amp.name}</div>
                       <div style="color:white;font-size:14px">${amp.description}<br>Precio: ${amp.price} tiradas</div>
                       <button data-index="${index}">Comprar</button>`;
        div.querySelector("button").addEventListener("click",()=>buyAmplifier(index));
        modifiersList.appendChild(div);
    });
}

function shuffle(array){for(let i=array.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]];}}

function refreshModifiers(){currentModifiers=[]; renderModifiers();}

function buyAmplifier(index){
    const amp = currentModifiers[index];
    if(window.tiradas>=amp.price){
        if(playerInventory.length<7){
            playerInventory.push({...amp});
            window.tiradas-=amp.price; updateTiradas();
            alert(`Compraste "${amp.name}"`);
            renderModifiers(); renderInventory();
        } else { alert("Inventario lleno"); }
    } else { alert(`No tienes suficientes tiradas. Necesitas ${amp.price}`); }
}

function renderInventory(){
    inventoryList.innerHTML="";
    playerInventory.forEach((amp,i)=>{
        const div=document.createElement("div");
        div.style.marginBottom="20px";
        div.innerHTML=`<div style="color:gold;font-size:20px;font-weight:bold">${amp.name}</div>
                       <div style="color:white;font-size:14px">${amp.description}</div>
                       <button data-index="${i}">Eliminar</button>`;
        div.querySelector("button").addEventListener("click",()=>{
            playerInventory.splice(i,1); renderInventory(); renderModifiers();
        });
        inventoryList.appendChild(div);
    });
}

// Aplicar efectos de amplificadores
function aplicarAmplificadores(patronesObtenidos){
    playerInventory.forEach(amp=>{
        switch(amp.name){
            case "Ojo de dios":
                if(tiradasHechas%5===0){
                    console.log("Ojo de dios activado: forzar patrón Eye");
                    // aquí forzar patrón Eye si quieres
                }
                break;
            case "1 aunque sea":
                if(patronesObtenidos.length===0){
                    console.log("1 aunque sea activado: forzar patrón de 1 en siguiente tirada");
                    // lógica a implementar en index.html
                }
                break;
            case "Como si nada hubiera pasado":
                // si 3 tiradas sin patrón, dar 5 tiradas extra
                break;
        }
    });
}
