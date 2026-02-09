// amplifiers.js

const availableAmplifiers = [
    { name:"Ojo de dios", description:"Cada 5 tiradas hay un patrón de ojo asegurado.", price:15 },
    { name:"7 a tutiplem", description:"Aumenta la probabilidad del 7 a un 50%.", price:15 },
    { name:"1 aunque sea", description:"Si en una tirada no sale patrón, la siguiente se asegura un patrón de unos.", price:5 },
    { name:"Como si nada hubiera pasado", description:"Si en tres tiradas no obtienes patrón, se te da 5 tiradas.", price:15 }
];

let playerInventory = [];
let tiradasHechas = 0;

const modifiersBtn = document.getElementById("modifiersBtn");
const inventoryBtn = document.getElementById("inventoryBtn");
const modifiersMenu = document.getElementById("modifiersMenu");
const inventoryMenu = document.getElementById("inventoryMenu");
const modifiersList = document.getElementById("modifiersList");
const inventoryList = document.getElementById("inventoryList");
const closeModifiers = document.getElementById("closeModifiers");
const closeInventory = document.getElementById("closeInventory");

modifiersBtn.addEventListener("click", ()=>{
    modifiersMenu.style.display="block";
    renderModifiers();
});
closeModifiers.addEventListener("click", ()=>{ modifiersMenu.style.display="none"; });

inventoryBtn.addEventListener("click", ()=>{
    inventoryMenu.style.display="block";
    renderInventory();
});
closeInventory.addEventListener("click", ()=>{ inventoryMenu.style.display="none"; });

function renderModifiers(){
    modifiersList.innerHTML="";
    availableAmplifiers.forEach((amp,index)=>{
        const div=document.createElement("div");
        div.style.marginBottom="20px";
        div.innerHTML=`
            <div style="color:gold;font-size:20px;font-weight:bold">${amp.name}</div>
            <div style="color:white;font-size:14px">${amp.description}<br>Precio: ${amp.price} tiradas</div>
            <button data-index="${index}">Comprar</button>
        `;
        div.querySelector("button").addEventListener("click",()=>buyAmplifier(index));
        modifiersList.appendChild(div);
    });
}

function buyAmplifier(index){
    const amp = availableAmplifiers[index];
    if(tiradasHechas >= amp.price){
        if(playerInventory.length < 7){
            playerInventory.push({...amp});
            tiradasHechas -= amp.price;
            alert(`Compraste "${amp.name}"`);
            renderInventory();
        }else alert("Inventario lleno (máx 7).");
    }else alert(`No tienes suficientes tiradas. Necesitas ${amp.price}, tienes ${tiradasHechas}.`);
}

function renderInventory(){
    inventoryList.innerHTML="";
    playerInventory.forEach((amp,i)=>{
        const div=document.createElement("div");
        div.style.marginBottom="20px";
        div.innerHTML=`
            <div style="color:gold;font-size:20px;font-weight:bold">${amp.name}</div>
            <div style="color:white;font-size:14px">${amp.description}</div>
            <button data-index="${i}">Eliminar</button>
        `;
        div.querySelector("button").addEventListener("click",()=>{
            playerInventory.splice(i,1);
            renderInventory();
        });
        inventoryList.appendChild(div);
    });
            }
