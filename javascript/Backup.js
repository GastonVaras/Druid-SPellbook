import {
  spells
} from "./spells.js";

const resolutions = [{
    width: 425,
    spellsPerPage: 5
  },
  {
    width: 768,
    spellsPerPage: 2
  },
  {
    width: 1024,
    spellsPerPage: 3
  },
  {
    width: 1440,
    spellsPerPage: 4
  },
  // Agrega más resoluciones según tus necesidades
];

// Evalúa el ancho de la pantalla y devuelve la cantidad de hechizos por página correspondiente a la resolución más adecuada. 
function calculateSpellsPerPage() {
  const screenWidth = window.innerWidth;
  for (let i = resolutions.length - 1; i >= 0; i--) {
    if (screenWidth >= resolutions[i].width) {
      return resolutions[i].spellsPerPage;
    }
  }
  return resolutions[0].spellsPerPage;
}

let spellsPerPage = calculateSpellsPerPage();

// Al cambiar tamaño de ventana, se recalcula la cantidad de hechizos por página
window.addEventListener("resize", () => {
  spellsPerPage = calculateSpellsPerPage();
  totalPages = Math.ceil(spells.length / spellsPerPage);
  renderSpells();
});

const spellsContainer = document.getElementById('spells-container');

function createMainSpellCard(spell) {
  // 1 - Crea div class .spell-card dentro de #spells-container
  const spellCard = document.createElement("div");
  spellCard.classList.add("spell-card");
  spellsContainer.appendChild(spellCard);

  asignarEscuelaMagia(spell, spellCard); // Llama a la función para asignar la clase de escuela de magia

  // 2 - Crea 5 divs principales dentro de .spell-card
  // (title, illustration, attributes, description, extra)
  const spellMain = document.createElement("div");
  spellMain.classList.add("spell-main");
  spellCard.appendChild(spellMain);

  //---------------> 3 - Vista compacta
  // (h3 name; p castingTime; p school; p components; p materialComponents)
  const spellName = document.createElement("h3");
  spellName.classList.add("spell-name");
  spellName.textContent = spell.name;
  spellMain.appendChild(spellName);

  const spellCastingTime = document.createElement("p");
  spellCastingTime.classList.add("spell-casting-time");
  spellCastingTime.textContent = `Casting Time: ${spell.castingTime}`;
  spellMain.appendChild(spellCastingTime);

  // La escuela me gustaria que se refleje en el diseño
  const spellSchool = document.createElement("p");
  spellSchool.classList.add("spell-school");
  spellSchool.textContent = `School: ${spell.school}`;
  spellMain.appendChild(spellSchool);

  const spellLevel = document.createElement("p");
  spellLevel.classList.add("spell-level");
  spellLevel.textContent = `${spell.level}`;
  spellMain.appendChild(spellLevel);

  // Crea boton de vista individual ------------->
  let viewButtonSpell = document.createElement("button");
  viewButtonSpell.classList.add("view-button-spell", "main-buttons");
  viewButtonSpell.innerHTML =
    '<img src="../images/change-view-icon.png" alt="Cambiar vista">';
  spellMain.appendChild(viewButtonSpell);

  viewButtonSpell.addEventListener("click", function () {
    // Obtiene el elemento "abuelo" del botón
    let spellCard = this.parentNode.parentNode;
    // Agrega la clase "change-view-spell" al hechizo en el que se hizo clic
    spellCard.classList.toggle("change-view-spell");

    // Verifica si la clase "change-view-spell" está presente en el spellCard
    if (spellCard.classList.contains("change-view-spell")) {
      // Si está presente, crea los elementos de detalles
      createDetailsSpellCard(spellCard, spell);
    } else {
      // Si no está presente, elimina los elementos de detalles
      removeDetailsSpellCard(spellCard);
    }
  });

  // Crea boton de hechizos preparados ------------->
  const preparedButton = document.createElement("button");
  preparedButton.classList.add("prepared-spells", "main-buttons");
  preparedButton.innerHTML =
    '<img src="../images/prepared-icon.png" alt="Mano con hechizo">';
  spellMain.appendChild(preparedButton);

  preparedButton.addEventListener("click", function () {
    // Obtiene el elemento mismo
    let preparedButton = this;

    // Agrega la clase "change-view-spell" al hechizo en el que se hizo clic
    preparedButton.classList.toggle("prepared-spell");
  });

  // Crea boton de hechizos favoritos ------------->
  const favoriteButton = document.createElement("button");
  favoriteButton.classList.add("favorite-spells", "main-buttons");
  favoriteButton.innerHTML =
    '<img src="../images/favorite-icon.png" alt="Estrella favoritos">';
  spellMain.appendChild(favoriteButton);

  favoriteButton.addEventListener("click", function () {
    // Obtiene el elemento mismo
    let favoriteSpell = this;

    // Agrega la clase "change-view-spell" al hechizo en el que se hizo clic
    favoriteSpell.classList.toggle("favorite-spell");
  });


  // Crea boton de casteo ------------->
  const castButton = document.createElement("button");
  castButton.classList.add("cast-spells", "main-buttons");
  castButton.innerHTML =
    '<img src="../images/prepared-icon.png" alt="Mano con hechizo">';
  spellMain.appendChild(castButton);

  castButton.addEventListener("click", function () {
    // Obtiene el elemento mismo
    let castButton = this;

    // Agrega la clase "casteado" al hechizo en el que se hizo clic
    castButton.classList.toggle("casteado");

    // Llama a la función para mostrar la imagen emergente
    mostrarImagenEmergente();
  });

  // Define la función para mostrar la imagen emergente
  function mostrarImagenEmergente() {
    // Obtén el contenedor .spell-main
    const spellMain = document.querySelector(".spell-main");

    // Crea un nuevo div para la imagen casteada
    const castedSpellDiv = document.createElement("div");
    castedSpellDiv.classList.add("casted-spell");

    // Crea un elemento de imagen
    const imagenHechizo = document.createElement("img");

    // Obtén la imagen del hechizo del array de hechizos
    const spell = spells[currentSpellIndex];
    const imagenSpell = spell.image;

    // Establece la imagen del hechizo
    imagenHechizo.src = imagenSpell;
    imagenHechizo.alt = "Imagen del hechizo";
    imagenHechizo.style.width = "300px";
    imagenHechizo.style.height = "200px";

    // Agrega la imagen al div casteado
    castedSpellDiv.appendChild(imagenHechizo);

    // Crea un botón para ocultar la imagen
    const hideButton = document.createElement("button");
    hideButton.textContent = "X";
    hideButton.addEventListener("click", function () {
      // Oculta el div casteado al hacer clic en el botón
      castedSpellDiv.style.display = "none";
    });

    // Agrega el botón de ocultar al div casteado
    castedSpellDiv.appendChild(hideButton);

    // Agrega el div casteado al contenedor .spell-main
    spellMain.appendChild(castedSpellDiv);
  }


  function asignarEscuelaMagia(spell, spellCard) {
    const esAbjuration = spell.school.toLowerCase().includes("abjuration");
    const esDivination = spell.school.toLowerCase().includes("divination");
    const esConjuration = spell.school.toLowerCase().includes("conjuration");
    const esEnchantment = spell.school.toLowerCase().includes("enchantment");
    const esEvocation = spell.school.toLowerCase().includes("evocation");
    const esIllusion = spell.school.toLowerCase().includes("illusion");
    const esNecromancy = spell.school.toLowerCase().includes("necromancy");
    const esTransmutation = spell.school.toLowerCase().includes("transmutation");

    if (esAbjuration) {
      spellCard.classList.add("abjuration");
    } else if (esDivination) {
      spellCard.classList.add("divination");
    } else if (esConjuration) {
      spellCard.classList.add("conjuration");
    } else if (esEnchantment) {
      spellCard.classList.add("enchantment");
    } else if (esEvocation) {
      spellCard.classList.add("evocation");
    } else if (esIllusion) {
      spellCard.classList.add("illusion");
    } else if (esNecromancy) {
      spellCard.classList.add("necromancy");
    } else if (esTransmutation) {
      spellCard.classList.add("transmutation");
    }
  }

  //---------> Fin de vista compacta
  return spellCard;
}

function createDetailsSpellCard(spellCard, spell) {
  // Busca el elemento .spell-main dentro del .spell-card
  const spellMain = spellCard.querySelector(".spell-main");

  // Crea el elemento para mostrar los componentes del hechizo
  const spellComponents = document.createElement("p");
  spellComponents.classList.add("spell-components");
  spellComponents.textContent = `Components: ${spell.components}`;
  spellMain.appendChild(spellComponents);

  // Verifica si existen componentes materiales y crea el elemento correspondiente
  if (spell.materialComponents) {
    const spellMaterialComponents = document.createElement("p");
    spellMaterialComponents.classList.add("spell-material-components");
    spellMaterialComponents.textContent = `M: ${spell.materialComponents}`;
    spellMain.appendChild(spellMaterialComponents);
  }

  const spellBoxDescription = document.createElement('div');
  spellBoxDescription.classList.add('spell-box-description');
  spellCard.appendChild(spellBoxDescription);

  const spellDuration = document.createElement('p');
  spellDuration.classList.add("spell-duration");
  spellDuration.textContent = `Duration: ${spell.duration}`;
  spellMain.appendChild(spellDuration);

  // Los atributos en if statement solo son visibles si tiene info el hechizo
  if (spell.range) {
    const spellRange = document.createElement('p');
    spellRange.classList.add("spell-range");
    spellRange.textContent = `Range: ${spell.range}`;
    spellMain.appendChild(spellRange);
  }
  if (spell.target) {
    const spellTarget = document.createElement('p');
    spellTarget.classList.add("spell-target");
    spellTarget.textContent = `Target: ${spell.target}`;
    spellMain.appendChild(spellTarget);
  }
  if (spell.effect) {
    const spellEffect = document.createElement('p');
    spellEffect.classList.add("spell-effect");
    spellEffect.textContent = `Effect: ${spell.effect}`;
    spellMain.appendChild(spellEffect);
  }
  if (spell.area) {
    const spellArea = document.createElement('p');
    spellArea.classList.add("spell-area");
    spellArea.textContent = `Area: ${spell.area}`;
    spellMain.appendChild(spellArea);
  }
  if (spell.savingThrow) {
    const spellSavingThrow = document.createElement('p');
    spellSavingThrow.classList.add("spell-saving-throw");
    spellSavingThrow.textContent = `Saving Throw: ${spell.savingThrow}`;
    spellMain.appendChild(spellSavingThrow);
  }
  if (spell.spellResistance) {
    const spellResistance = document.createElement('p');
    spellResistance.classList.add("spell-resistance");
    spellResistance.textContent = `Spell Resistance: ${spell.spellResistance}`;
    spellMain.appendChild(spellResistance);
  }
  if (spell.XPCost) {
    const spellXPCost = document.createElement('p');
    spellXPCost.classList.add("spell-XPCost");
    spellXPCost.textContent = `XPCost: ${spell.XPCost}`;
    spellMain.appendChild(spellXPCost);
  }
  if (spell.focus) {
    const spellFocus = document.createElement('p');
    spellFocus.classList.add("spell-focus");
    spellFocus.textContent = `Focus: ${spell.focus}`;
    spellMain.appendChild(spellFocus);
  }
  //---------> Fin de vista detalle
  //---------------> 4 - Vista completa
  const spellDescription = document.createElement('p');
  spellDescription.innerHTML = spell.description.replace(/~/g, '<br>');
  spellBoxDescription.appendChild(spellDescription);
}

function createFullSpellCard(spell) {
  const spellCard = createMainSpellCard(spell);
  createDetailsSpellCard(spellCard, spell);
  spellCard.classList.toggle("change-view-spell");
  return spellCard;
}

function removeDetailsSpellCard(spellCard) {
  // Busca el elemento .spell-main dentro del .spell-card
  const spellMain = spellCard.querySelector(".spell-main");

  // Selecciona y elimina los elementos de detalles agregados recientemente
  const spellComponents = spellMain.querySelector(".spell-components");
  if (spellComponents) {
    spellMain.removeChild(spellComponents);
  }

  const spellMaterialComponents = spellMain.querySelector(".spell-material-components");
  if (spellMaterialComponents) {
    spellMain.removeChild(spellMaterialComponents);
  }

  const spellDuration = spellMain.querySelector(".spell-duration");
  if (spellDuration) {
    spellMain.removeChild(spellDuration);
  }

  const spellRange = spellMain.querySelector(".spell-range");
  if (spellRange) {
    spellMain.removeChild(spellRange);
  }
  const spellTarget = spellMain.querySelector(".spell-target");
  if (spellTarget) {
    spellMain.removeChild(spellTarget);
  }

  const spellEffect = spellMain.querySelector(".spell-effect");
  if (spellEffect) {
    spellMain.removeChild(spellEffect);
  }

  const spellArea = spellMain.querySelector(".spell-area");
  if (spellArea) {
    spellMain.removeChild(spellArea);
  }

  const spellSavingThrow = spellMain.querySelector(".spell-saving-throw");
  if (spellSavingThrow) {
    spellMain.removeChild(spellSavingThrow);
  }
  const spellResistance = spellMain.querySelector(".spell-resistance");
  if (spellResistance) {
    spellMain.removeChild(spellResistance);
  }
  const spellXPCost = spellMain.querySelector(".spell-XPCost");
  if (spellXPCost) {
    spellMain.removeChild(spellXPCost);
  }
  const spellFocus = spellMain.querySelector(".spell-focus");
  if (spellFocus) {
    spellMain.removeChild(spellFocus);
  }
  const spellBoxDescription = spellCard.querySelector(".spell-box-description");
  if (spellBoxDescription) {
    spellCard.removeChild(spellBoxDescription);
  }

}

function renderSpells() {

  spellsContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * spellsPerPage;
  console.log(startIndex)
  const endIndex = Math.min(currentSpellIndex + spellsPerPage, spells.length);
  const spellsToRender = spells.slice(startIndex, endIndex);

  for (let i = currentSpellIndex; i < endIndex; i++) {
    const spell = spells[i];
    createMainSpellCard(spell, spellsContainer);
  }
}


// Código relacionado a boton de vista general
const changeViewAllButton = document.getElementById('change-view-all-button');
const viewButtons = document.querySelectorAll(".view-button");

changeViewAllButton.addEventListener("click", () => {
  const spellCards = document.querySelectorAll(".spell-card");
  let hasClass = false;
  spellCards.forEach((spellCard) => {
    if (spellCard.classList.contains("change-view-spell")) {
      hasClass = true;
    }
  });

  spellCards.forEach((spellCard) => {
    if (hasClass) {
      spellCard.classList.remove("change-view-spell");
    } else {
      spellCard.classList.add("change-view-spell");
    }
  });
});

let spellManager = document.getElementById('spell-manager')

// Calcula la cantidad total de páginas y establece la página actual
let currentPage = 1;
let totalPages = Math.ceil(spells.length / spellsPerPage);
let currentSpellIndex = 0;

// Actualiza la paginación y la vista actual
const previousPageButton = document.createElement("button");
previousPageButton.id = "previous-page-button";
spellManager.appendChild(previousPageButton);

const nextPageButton = document.createElement("button");
nextPageButton.id = "next-page-button";
spellManager.appendChild(nextPageButton);

previousPageButton.addEventListener("click", () => {
  goToPreviousPage();
});

nextPageButton.addEventListener("click", () => {
  goToNextPage();
});

function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    currentSpellIndex -= spellsPerPage;
    if (currentSpellIndex < 0) {
      currentSpellIndex = 0;
    }
  } else {
    currentPage = totalPages;
    currentSpellIndex = Math.max(spells.length - spellsPerPage, 0);
  }
  renderSpells();
}

function goToNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    currentSpellIndex += spellsPerPage;
    if (currentSpellIndex >= spells.length) {
      currentSpellIndex = spells.length - 1;
    }
  } else {
    currentPage = 1;
    currentSpellIndex = 0;
  }
  renderSpells();
}

// Llama a la función para renderizar los hechizos inicialmente
renderSpells([...spells]);

// Obtén el elemento de entrada de búsqueda y la lista de autocompletado
const searchInput = document.querySelector("#search-input");
const autocompleteList = document.querySelector("#autocomplete-list");

// Registra un evento de entrada en el campo de búsqueda
searchInput.addEventListener("input", handleSearchInput);

// Función para manejar la entrada en el campo de búsqueda
function handleSearchInput() {
  const searchTerm = searchInput.value.toLowerCase();
  // Filtra los hechizos que coinciden con el término de búsqueda
  const matchingSpells = spells.filter(spell =>
    spell.name.toLowerCase().includes(searchTerm)
  );
  currentSpellIndex = 0;
  // Actualiza la lista de autocompletado
  updateAutocompleteList(matchingSpells);
}

// Función para actualizar la lista de autocompletado
function updateAutocompleteList(matchingSpells) {
  // Borra los elementos anteriores de la lista de autocompletado
  autocompleteList.innerHTML = "";

  // Crea nuevos elementos de lista para los hechizos coincidentes
  matchingSpells.forEach(spell => {
    const listItem = document.createElement("li");
    listItem.textContent = spell.name;
    listItem.addEventListener("click", () => {
      currentSpellIndex = matchingSpells.indexOf(spell);
      // Al hacer clic en un elemento de la lista de autocompletado, establece el valor del campo de búsqueda y muestra el hechizo
      searchInput.value = spell.name;
      displaySpell(spell);
      // Borra la lista de autocompletado
      autocompleteList.innerHTML = "";
    });
    autocompleteList.appendChild(listItem);
  });
}

// Función para mostrar el hechizo seleccionado
function displaySpell(spell) {
  currentSpellIndex = spells.indexOf(spell);
  const spellsContainer = document.querySelector("#spells-container");
  spellsContainer.innerHTML = ""; // Borra el contenido existente del contenedor
  createFullSpellCard(spell, spellsContainer); // Muestra el hechizo buscado en el contenedor
}