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

// Contador de tiradas
let tiradasHechas = 0;

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

// Función que se puede llamar después de cada tirada
// para activar efectos según amplificadores
function aplicarAmplificadores(patronesObtenidos) {
    playerInventory.forEach(amp => {
        switch(amp.name) {
            case "Ojo de dios":
                // Cada 5 tiradas aseguramos patrón Eye
                if (tiradasHechas % 5 === 0) {
                    console.log("Ojo de dios activado: patrón Eye asegurado");
                    // aquí iría la lógica para forzar patrón Eye
                }
                break;
            case "7 a tutiplem":
                // aumentar probabilidad del 7
                // esta lógica debe integrarse en la función randomNumber de index.html
                break;
            case "1 aunque sea":
                // Si la tirada anterior no obtuvo patrón, asegura patrón de unos
                break;
            case "Como si nada hubiera pasado":
                // Si en tres tiradas no hubo patrón, sumar 5 tiradas
                break;
        }
    });
    }
