import {
  spells
} from "./spells.js";
// Creamos nuevos arrays para los hechizos preparados y favoritos
let preparedSpells = [];
let favoriteSpells = [];
let showAllSpells = true;
let preparedCurrentPage = 1;
let favoriteCurrentPage = 1;
let preparedCurrentSpellIndex = 0;
let favoriteCurrentSpellIndex = 0;
let preparedTotalPages = 1;
let favoriteTotalPages = 1;

let showPrepared = false;
let showFavorite = false;
let showAll = true;
let isSearching = false;

// Variable para recordar la página actual antes de mostrar un hechizo individual
let previousPage;

const bookContainer = document.getElementById('book-container')
const spellsContainer = document.getElementById('spells-container');
const mainContainer = document.getElementById('main-container');
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
let spellsPerPage = calculateSpellsPerPage();

function loadSpellStateFromLocalStorage() {
  for (const spell of spells) {
    const isPrepared = localStorage.getItem(`${spell.name}_prepared`);
    if (isPrepared !== null) {
      spell.prepared = isPrepared === "true";
    }

    const preparedCount = localStorage.getItem(`${spell.name}_prepared_count`);
    if (preparedCount !== null) {
      spell.preparedCount = parseInt(preparedCount);
    }
  }
}

// Cargar datos de preparación y contador desde el localStorage al iniciar la página
loadSpellStateFromLocalStorage();

function calculateSpellsPerPage() {
  const screenWidth = window.innerWidth;
  for (let i = resolutions.length - 1; i >= 0; i--) {
    if (screenWidth >= resolutions[i].width) {
      return resolutions[i].spellsPerPage;
    }
  }
  return resolutions[0].spellsPerPage;
}

// Calcula la cantidad total de páginas y establece la página actual
let currentPage = 1;
let currentSpellIndex = 0;
let totalPages = Math.ceil(spells.length / spellsPerPage);

// Función para mostrar los hechizos según el estado de preparado o favorito
function showFilteredSpells(filteredSpells, currentPage) {
  const startIndex = (currentPage - 1) * spellsPerPage;
  const endIndex = startIndex + spellsPerPage;
  return filteredSpells.slice(startIndex, endIndex);
}

// Optimización de la función para actualizar los arrays de hechizos preparados y favoritos
function updateFilteredSpells() {
  preparedSpells = spells.filter((spell) => spell.prepared);
  favoriteSpells = spells.filter((spell) => spell.favorite);
}

// Llamamos a la función para actualizar los arrays de hechizos preparados y favoritos inicialmente
renderSpells(spells);
showAllSpellsHandler();


function renderSpells(spellsToRender) {
  // Eliminamos los hechizos actuales antes de agregar los nuevos hechizos a mostrar
  while (spellsContainer.firstChild) {
    spellsContainer.removeChild(spellsContainer.firstChild);
  }

  for (const spell of spellsToRender) {
    const spellCard = createMainSpellCard(spell);
    spellsContainer.appendChild(spellCard);
  }
}

// Modificación de las funciones goToNextPage y goToPreviousPage para que avancen o retrocedan dentro del array actual
function goToNextPage() {
  if (showAll) {
    currentPage++;
    if (currentPage > totalPages) {
      currentPage = 1;
    }
  } else if (showPrepared) {
    preparedCurrentPage++;
    if (preparedCurrentPage > preparedTotalPages) {
      preparedCurrentPage = 1;
    }
  } else if (showFavorite) {
    favoriteCurrentPage++;
    if (favoriteCurrentPage > favoriteTotalPages) {
      favoriteCurrentPage = 1;
    }
  }
  updateSpellsToShow();
}

function goToPreviousPage() {
  if (showAll) {
    if (currentPage === 1) {
      currentPage = totalPages;
    } else {
      currentPage--;
    }
  } else if (showPrepared) {
    if (preparedCurrentPage === 1) {
      preparedCurrentPage = preparedTotalPages;
    } else {
      preparedCurrentPage--;
    }
  } else if (showFavorite) {
    if (favoriteCurrentPage === 1) {
      favoriteCurrentPage = favoriteTotalPages;
    } else {
      favoriteCurrentPage--;
    }
  }

  updateSpellsToShow();
}

// Función para obtener los hechizos correspondientes a la página actual según el array actual
function getSpellsForCurrentPage() {
  if (isSearching) {
    // Si estamos en modo de búsqueda, mostramos todos los hechizos buscados sin paginación
    return searchResults;
  }

  // Si no estamos en modo de búsqueda, aplicamos la paginación según el estado actual
  let filteredSpells = showAll ? spells : showPrepared ? preparedSpells : favoriteSpells;
  let currentPageToShow;

  if (showAll) {
    currentPageToShow = currentPage;
  } else if (showPrepared) {
    currentPageToShow = preparedCurrentPage;
  } else if (showFavorite) {
    currentPageToShow = favoriteCurrentPage;
  }

  const startIndex = (currentPageToShow - 1) * spellsPerPage;
  return showFilteredSpells(filteredSpells, currentPageToShow);
}

// Actualiza el array de hechizos mostrados en función del estado actual
function updateSpellsToShow() {
  const spellsToShow = getSpellsForCurrentPage();
  renderSpells(spellsToShow);
}

// Al cambiar tamaño de ventana, se recalcula la cantidad de hechizos por página
window.addEventListener("resize", () => {
  spellsPerPage = calculateSpellsPerPage();
  totalPages = Math.ceil(spells.length / spellsPerPage);
  updateFilteredSpells();
  updateSpellsToShow(); // Llamar a updateSpellsToShow para actualizar los hechizos en función de la nueva resolución
});

// Crea los botones de cambio de pagina dentro de bookContainer
const previousPageButton = document.createElement("button");
previousPageButton.id = "previous-page-button";
mainContainer.appendChild(previousPageButton);

const nextPageButton = document.createElement("button");
nextPageButton.id = "next-page-button";
mainContainer.appendChild(nextPageButton);

previousPageButton.addEventListener("click", () => {
  goToPreviousPage();
});

nextPageButton.addEventListener("click", () => {
  goToNextPage();
});



// Función para mostrar solo los hechizos preparados
function showPreparedSpellsHandler() {
  showAll = false;
  showPrepared = true;
  showFavorite = false;
  preparedCurrentPage = 1;
  updateFilteredSpells();
  preparedTotalPages = Math.ceil(preparedSpells.length / spellsPerPage);
  updateSpellsToShow();
}

const onlyPreparedButton = document.querySelector(".only-prepared-spells");
onlyPreparedButton.addEventListener("click", () => {
  onlyPreparedButton.classList.add("active");
  onlyFavouriteButton.classList.remove("active"); // Quita la clase "active" de onlyFavouriteButton
  showAllButton.classList.remove("active");
  showPreparedSpellsHandler();
});

// Función para mostrar solo los hechizos favoritos
function showFavoriteSpellsHandler() {
  showAll = false;
  showPrepared = false;
  showFavorite = true;
  favoriteCurrentPage = 1;
  updateFilteredSpells();
  favoriteTotalPages = Math.ceil(favoriteSpells.length / spellsPerPage);
  updateSpellsToShow();
}

const onlyFavouriteButton = document.querySelector(".only-favourite-spells");
onlyFavouriteButton.addEventListener("click", () => {
  onlyFavouriteButton.classList.add("active");
  onlyPreparedButton.classList.remove("active"); // Quita la clase "active" de onlyFavouriteButton
  showAllButton.classList.remove("active");
  showFavoriteSpellsHandler();
});

// Función para mostrar todos los hechizos (preparados y no preparados)
function showAllSpellsHandler() {
  showAll = true;
  showPrepared = false;
  showFavorite = false;
  currentPage = 1;
  totalPages = Math.ceil(spells.length / spellsPerPage);
  preparedTotalPages = Math.ceil(preparedSpells.length / spellsPerPage);
  favoriteTotalPages = Math.ceil(favoriteSpells.length / spellsPerPage);

  updateFilteredSpells();
  updateSpellsToShow();
}

const showAllButton = document.querySelector(".show-all-spells");
showAllButton.addEventListener("click", () => {
  showAllSpellsHandler();
  showAllButton.classList.add("active");
  onlyPreparedButton.classList.remove("active");
  onlyFavouriteButton.classList.remove("active");
});

function createFavoriteButton(spell) {
  const favoriteButton = document.createElement("button");
  favoriteButton.classList.add("favorite-spells", "main-buttons");
  favoriteButton.innerHTML = '<img src="../images/favorite-spell-icon.png" alt="Estrella favoritos">';

  if (spell.favorite) {
    favoriteButton.classList.add("favorite-spell");
  }

  favoriteButton.addEventListener("click", () => {
    favoriteButton.classList.toggle("favorite-spell");
    const isFavorite = favoriteButton.classList.contains("favorite-spell");
    spell.favorite = isFavorite;

    // Actualizar el estado de favorito en el localStorage
    localStorage.setItem(`favorite_${spell.name}`, isFavorite);
  });

  return favoriteButton;
}


function createPreparedButton(spell) {
  const preparedButtonContainer = document.createElement("div");
  preparedButtonContainer.classList.add("prepared-button-container");

  const preparedButton = document.createElement("button");
  preparedButton.classList.add("prepared-spells", "main-buttons");
  preparedButton.innerHTML = '<img src="../images/prepared-icon.png" alt="Mano con hechizo">';

  // Obtener el estado de preparado y el valor del contador desde el localStorage
  const isPrepared = localStorage.getItem(`${spell.name}_prepared`) === "true";
  const preparedCount = parseInt(localStorage.getItem(`${spell.name}_prepared_count`)) || 0;

  // Establecer el contador
  spell.preparedCount = isPrepared ? preparedCount : 0;

  // Crear el contador
  const counter = document.createElement("span");
  counter.classList.add("cantidad");
  counter.textContent = spell.preparedCount; // Valor inicial del contador
  preparedButtonContainer.appendChild(counter);

  const incrementButton = document.createElement("button");
  incrementButton.classList.add("increment-button");
  incrementButton.textContent = "+";
  incrementButton.addEventListener("click", () => {

    if (spell.preparedCount === 0) {
      spell.preparedCount += 1;
      counter.textContent = spell.preparedCount;
      spell.prepared = true;
      preparedButton.classList.add("prepared-spell");
    } else {
      spell.preparedCount += 1;
      counter.textContent = spell.preparedCount;
    }

    // Guardar el valor actualizado del contador y el estado de preparado en el localStorage
    localStorage.setItem(`${spell.name}_prepared`, "true");
    localStorage.setItem(`${spell.name}_prepared_count`, spell.preparedCount);
  });
  preparedButtonContainer.appendChild(incrementButton);

  const decrementButton = document.createElement("button");
  decrementButton.classList.add("decrement-button");
  decrementButton.textContent = "-";
  decrementButton.addEventListener("click", () => {
    if (spell.preparedCount > 0) {
      spell.preparedCount -= 1;
      counter.textContent = spell.preparedCount;

      // Guardar el valor actualizado del contador en el localStorage
      localStorage.setItem(`${spell.name}_prepared_count`, spell.preparedCount);

      if (spell.preparedCount === 0) {
        spell.prepared = false;
        preparedButton.classList.remove("prepared-spell");
        localStorage.setItem(`${spell.name}_prepared`, "false");
      }
    }
  });
  preparedButtonContainer.appendChild(decrementButton);

  // Aplicar/quitar la clase "prepared-spell" al botón según el estado de preparación
  if (spell.prepared) {
    preparedButton.classList.add("prepared-spell");
  } else {
    preparedButton.classList.remove("prepared-spell");
  }

  preparedButton.addEventListener("click", () => {
    spell.prepared = !spell.prepared;
    if (spell.prepared) {
      spell.preparedCount = 1; // Establecer el contador en 1 cuando se prepara
    } else {
      spell.preparedCount = 0; // Reiniciar el contador cuando se desmarca
    }

    // Actualizar el contador en la interfaz
    counter.textContent = spell.preparedCount;

    // Guardar el estado de preparación y el valor del contador en el localStorage
    localStorage.setItem(`${spell.name}_prepared`, spell.prepared ? "true" : "false");
    localStorage.setItem(`${spell.name}_prepared_count`, spell.preparedCount);

    // Aplicar/quitar la clase "prepared-spell" al botón según el estado de preparación
    if (spell.prepared) {
      preparedButton.classList.add("prepared-spell");
    } else {
      preparedButton.classList.remove("prepared-spell");
    }
  });

  preparedButtonContainer.appendChild(preparedButton);

  return preparedButtonContainer;
}






// -----> Crear Hechizo <------ \\
// ---------------------------- \\
function createMainSpellCard(spell) {
  const spellCard = document.createElement("div");
  spellCard.classList.add("spell-card");
  spellsContainer.appendChild(spellCard);

  // Asignar la clase de escuela de magia
  assignSchoolClass(spell, spellCard);

  const spellMain = document.createElement("div");
  spellMain.classList.add("spell-main");
  spellCard.appendChild(spellMain);

  // Elementos de vista colapsada
  const spellName = createSpellElement("h3", "spell-name", spell.name);
  spellMain.appendChild(spellName);

  const spellCastingTime = createSpellElement("p", "spell-casting-time", `Casting Time: ${spell.castingTime}`);
  spellMain.appendChild(spellCastingTime);

  const spellSchool = createSpellElement("p", "spell-school", `School: ${spell.school}`);
  spellMain.appendChild(spellSchool);

  const spellLevel = createSpellElement("p", "spell-level", spell.level);
  spellMain.appendChild(spellLevel);

  const viewButtonSpell = createSpellButton("view-button-spell", "Cambiar vista");
  spellMain.appendChild(viewButtonSpell);

  viewButtonSpell.addEventListener("click", (event) => {
    // Evitar el comportamiento predeterminado del botón (cambio de vista)
    event.preventDefault();

    // Obtener el contenedor del hechizo actual
    const spellContainer = event.target.closest(".spell-card");
    if (spellContainer) {
      spellContainer.classList.toggle("change-view-spell");

      if (spellContainer.classList.contains("change-view-spell")) {
        // Obtener el hechizo asociado
        const spell = spells.find((s) => s.name === spellContainer.querySelector(".spell-name").textContent);
        expandSpellCard(spellContainer, spell);
      } else {
        collapseSpellCard(spellContainer);
      }
    }
  });



  // Crea boton de hechizos preparados y contador
  const preparedButtonContainer = createPreparedButton(spell);
  spellMain.appendChild(preparedButtonContainer);

  // Crea botón de hechizos favoritos
  const favoriteStatus = localStorage.getItem(`favorite_${spell.name}`) === "true";
  spell.favorite = favoriteStatus; // Agregamos la propiedad 'favorite' al objeto 'spell'
  const favoriteButton = createFavoriteButton(spell);
  spellMain.appendChild(favoriteButton);

  const castButton = createSpellButton("cast-spells", "Mano con hechizo");
  castButton.classList.add("glow-on-hover");
  spellMain.appendChild(castButton);

  castButton.addEventListener("click", () => {
    castButton.classList.toggle("casteado");
    mostrarImagenEmergente(spell);

    // Verificar si preparedCount es mayor que 0
    if (spell.preparedCount > 0) {
      spell.preparedCount -= 1;

      // Obtener los elementos relacionados con este hechizo
      const preparedButton = preparedButtonContainer.querySelector('.prepared-spells');
      const counter = preparedButtonContainer.querySelector('.cantidad');

      // Actualizar el contenido del contador en el DOM
      if (counter) {
        counter.textContent = spell.preparedCount;
      }

      // Si preparedCount llega a 0, quitar la clase "prepared-spell"
      if (spell.preparedCount === 0) {
        preparedButton.classList.remove("prepared-spell");
        // También puedes actualizar el valor de "prepared" a false si es necesario
        spell.prepared = false;
      } 
      // Guardar el valor actualizado del contador en el localStorage
      localStorage.setItem(`${spell.name}_prepared`, spell.prepared ? "true" : "false");
      localStorage.setItem(`${spell.name}_prepared_count`, spell.preparedCount);
    } else {
                // Crear una ventana de alerta personalizada
                const customAlert = document.createElement("div");
                customAlert.classList.add("custom-alert");
                customAlert.textContent = "Ups! Parece que no tienes este hechizo preparado para lanzar. Quizás ya lo usaste?";
                document.body.appendChild(customAlert);
        
                // Agregar un temporizador para quitar la ventana de alerta después de un tiempo
                setTimeout(() => {
                  customAlert.remove();
                }, 3500);
    }
  });


  function createSpellElement(tag, className, text) {
    const element = document.createElement(tag);
    element.classList.add(className);
    element.textContent = text;
    return element;
  }

  function createSpellButton(className, altText) {
    const button = document.createElement("button");
    button.classList.add(className, "main-buttons");
    button.innerHTML = `<img src="../images/${className}-icon.png" alt="${altText}">`;
    return button;
  }

  function assignSchoolClass(spell, spellCard) {
    const schools = ["abjuration", "divination", "conjuration", "enchantment", "evocation", "illusion", "necromancy", "transmutation"];
    for (const school of schools) {
      if (spell.school.toLowerCase().includes(school)) {
        spellCard.classList.add(school);
        break;
      }
    }
  }
  /// Define la función para mostrar la imagen emergente y recibe el hechizo correspondiente
  function mostrarImagenEmergente(spell) {
    // Crea un nuevo div para la imagen casteada
    const castedSpellDiv = document.createElement("div");
    castedSpellDiv.classList.add("casted-spell");
    // Establecer la background-image del div casted-spell
    castedSpellDiv.style.backgroundImage = getImageForSpell(spell);
    const imagenHechizo = document.createElement("p");
    imagenHechizo.classList.add("image-description");
    const imagenSpell = spell.imageDescription;
    imagenHechizo.innerHTML = imagenSpell.replace(/~/g, '<br>');

    castedSpellDiv.appendChild(imagenHechizo);

    const hideButton = document.createElement("button");
    hideButton.textContent = "X";
    hideButton.addEventListener("click", function () {
      castedSpellDiv.remove();
    });
    castedSpellDiv.appendChild(hideButton);
    spellCard.appendChild(castedSpellDiv);
  }
  return spellCard;
}

function expandSpellCard(spellCard, spell) {
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

// ------------ > Funciones optimizadas:
function collapseSpellCard(spellCard) {
  // Busca el elemento .spell-main dentro del .spell-card
  const spellMain = spellCard.querySelector(".spell-main");

  // Clases de elementos de detalles a eliminar
  const detailClasses = [
    "spell-components",
    "spell-material-components",
    "spell-duration",
    "spell-range",
    "spell-target",
    "spell-effect",
    "spell-area",
    "spell-saving-throw",
    "spell-resistance",
    "spell-XPCost",
    "spell-focus",
  ];

  // Eliminar elementos de detalles si existen
  detailClasses.forEach((className) => {
    const detailElement = spellMain.querySelector(`.${className}`);
    if (detailElement) {
      spellMain.removeChild(detailElement);
    }
  });

  // Eliminar el elemento de descripción si existe
  const spellBoxDescription = spellCard.querySelector(".spell-box-description");
  if (spellBoxDescription) {
    spellCard.removeChild(spellBoxDescription);
  }
}

// Define la función para crear la tarjeta completa de un hechizo
function createFullSpellCard(spell, parentContainer) {
  const spellCard = createMainSpellCard(spell);
  expandSpellCard(spellCard, spell);
  spellCard.classList.toggle("change-view-spell");
  return spellCard;
}

// Modificación de la función para obtener la imagen del hechizo
function getImageForSpell(spell) {
  return `url(${spell.image})`;
}

// ---> Buscar Hechizos <--- \\
// ---------------------------- \\
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

    function handleItemClick() {
      currentSpellIndex = matchingSpells.indexOf(spell);
      // Al hacer clic en un elemento de la lista de autocompletado, establece el valor del campo de búsqueda y muestra el hechizo
      searchInput.value = spell.name;
      searchInput.value = '';

      // Usar setTimeout para desenfocar el campo de búsqueda después de un breve retraso
      setTimeout(() => {
        searchInput.blur(); // Cierra el teclado virtual
        displaySpell(spell);
      }, 100); // Ajusta el tiempo según sea necesario para que funcione correctamente
    }

    // listItem.addEventListener("click", handleItemClick);
    listItem.addEventListener("touchend", handleItemClick); // Agregar el evento táctil

    autocompleteList.appendChild(listItem);
  });
}

// Variable para mantener el contenido anterior del contenedor de hechizos
let previousSpellsContainerContent = "";

// Función para mostrar el hechizo seleccionado
function displaySpell(spell) {
  currentSpellIndex = spells.indexOf(spell);
  const spellsContainer = document.querySelector("#spells-container");

  // Guarda la página actual antes de mostrar el hechizo individual
  previousPage = currentPage;

  // Borramos todo el contenido actual del contenedor de hechizos
  spellsContainer.innerHTML = "";

  // Creamos el botón de vuelta
  const backButton = document.createElement("button");
  backButton.textContent = "X";
  backButton.classList.add("back-button");

  // Agrega el evento de clic al botón para volver a la vista de tarjetas de hechizos
  backButton.addEventListener("click", function () {
    // Restauramos el contenido original del contenedor
    spellsContainer.innerHTML = previousSpellsContainerContent;
    isSearching = false;

    // Vuelve a la página anterior
    currentPage = previousPage;
    updateSpellsToShow();
  });

  spellsContainer.appendChild(backButton); // Agrega el botón de vuelta

  // Quitamos el foco del campo de búsqueda
  searchInput.blur();

  // Mostramos solo el hechizo buscado en el contenedor
  const spellCard = createFullSpellCard(spell, spellsContainer);
  autocompleteList.innerHTML = "";

  // Establecer isSearching a true cuando muestras un hechizo individual
  isSearching = true;
}