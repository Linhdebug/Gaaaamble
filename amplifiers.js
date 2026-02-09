// amplifiers.js

// Definición de amplificadores disponibles
const availableAmplifiers = [
    {
        name: "Ojo de dios",
        description: "Cada 5 tiradas hay un patrón de ojo asegurado.",
        price: 15
    },
    {
        name: "7 a tutiplem",
        description: "Aumenta la probabilidad del 7 a un 50%.",
        price: 15
    },
    {
        name: "1 aunque sea",
        description: "Si en una tirada no sale patrón, la siguiente se asegura un patrón de unos.",
        price: 5
    },
    {
        name: "Como si nada hubiera pasado",
        description: "Si en tres tiradas no obtienes patrón, se te da 5 tiradas.",
        price: 15
    }
];

// Inventario del jugador (máx. 7)
let playerInventory = [];

// Contadores de tiradas
let tiradasHechas = 0;
let tiradasSinPatron = 0;

// Referencias al DOM
const modifiersBtn = document.getElementById("modifiersBtn");
const inventoryBtn = document.getElementById("inventoryBtn");
const modifiersMenu = document.getElementById("modifiersMenu");
const inventoryMenu = document.getElementById("inventoryMenu");
const modifiersList = document.getElementById("modifiersList");
const inventoryList = document.getElementById("inventoryList");
const closeModifiers = document.getElementById("closeModifiers");
const closeInventory = document.getElementById("closeInventory");

// Mostrar menú de modificadores
modifiersBtn.addEventListener("click", () => {
    modifiersMenu.style.display = "block";
    renderModifiers();
});

// Cerrar menú
closeModifiers.addEventListener("click", () => {
    modifiersMenu.style.display = "none";
});

inventoryBtn.addEventListener("click", () => {
    inventoryMenu.style.display = "block";
    renderInventory();
});

closeInventory.addEventListener("click", () => {
    inventoryMenu.style.display = "none";
});

// Función para renderizar los modificadores disponibles
function renderModifiers() {
    modifiersList.innerHTML = ""; // limpiar
    availableAmplifiers.forEach((amp, index) => {
        const div = document.createElement("div");
        div.style.marginBottom = "20px";
        div.innerHTML = `
            <div style="color: gold; font-size: 20px; font-weight: bold;">${amp.name}</div>
            <div style="color: white; font-size: 14px;">${amp.description} <br>Precio: ${amp.price} tiradas</div>
            <button data-index="${index}">Comprar</button>
        `;
        const btn = div.querySelector("button");
        btn.addEventListener("click", () => buyAmplifier(index));
        modifiersList.appendChild(div);
    });
}

// Función para comprar amplificador
function buyAmplifier(index) {
    const amp = availableAmplifiers[index];
    if (tiradasHechas >= amp.price) {
        if (playerInventory.length < 7) {
            playerInventory.push({...amp}); // agregamos copia
            tiradasHechas -= amp.price;
            alert(`Compraste "${amp.name}"`);
            renderInventory();
        } else {
            alert("Inventario lleno (máx 7).");
        }
    } else {
        alert(`No tienes suficientes tiradas. Necesitas ${amp.price}, tienes ${tiradasHechas}.`);
    }
}

// Función para renderizar inventario
function renderInventory() {
    inventoryList.innerHTML = "";
    playerInventory.forEach((amp, i) => {
        const div = document.createElement("div");
        div.style.marginBottom = "20px";
        div.innerHTML = `
            <div style="color: gold; font-size: 20px; font-weight: bold;">${amp.name}</div>
            <div style="color: white; font-size: 14px;">${amp.description}</div>
            <button data-index="${i}">Eliminar</button>
        `;
        const btn = div.querySelector("button");
        btn.addEventListener("click", () => {
            playerInventory.splice(i,1);
            renderInventory();
        });
        inventoryList.appendChild(div);
    });
}

// Función que se llama al final de cada tirada
// patronesObtenidos = array de patrones detectados en esta tirada
function aplicarAmplificadores(patronesObtenidos, slots, colorNumber, randomNumberFunc) {
    tiradasHechas++;
    
    // Ojo de dios
    if (playerInventory.some(a => a.name === "Ojo de dios")) {
        if (tiradasHechas % 5 === 0) {
            console.log("Ojo de dios activado: patrón Eye asegurado");
            const eyePatternIndices = [1,2,3,5,6,7,9,10,11];
            const forcedNum = randomNumberFunc();
            eyePatternIndices.forEach(i => {
                slots[i].textContent = forcedNum;
                slots[i].style.color = colorNumber(forcedNum);
            });
        }
    }

    // 1 aunque sea
    if (playerInventory.some(a => a.name === "1 aunque sea")) {
        if (patronesObtenidos.length === 0 && tiradasHechas > 1) {
            console.log("1 aunque sea activado: patrón de unos asegurado");
            [0,1,2].forEach(i => {
                slots[i].textContent = 1;
                slots[i].style.color = colorNumber(1);
            });
        }
    }

    // Como si nada hubiera pasado
    if (playerInventory.some(a => a.name === "Como si nada hubiera pasado")) {
        if (patronesObtenidos.length === 0) tiradasSinPatron++;
        else tiradasSinPatron = 0;

        if (tiradasSinPatron >= 3) {
            console.log("Como si nada hubiera pasado activado: +5 tiradas");
            tiradasHechas += 5;
            tiradasSinPatron = 0;
        }
    }

    // "7 a tutiplem" se aplica dentro de randomNumber de index.html
    }
