import {
    spells
  } from "./spells.js";
  
  const spellsContainer = document.getElementById('spells-container');
  const changeViewAllButton = document.getElementById('change-view-all-button');
  const resolutions = [{
      width: 425,
      spellsPerPage: 1
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
  let currentResolutionIndex = 200;
  let spellsPerPage = calculateSpellsPerPage();
  let currentPage;
  let totalPages;
  let currentSpellIndex = 0;
  
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
  
  function createSpellCard(spell) {
    // 1 - Crea div class .spell-card dentro de #spells-container
    const spellCard = document.createElement("div");
    spellCard.classList.add("spell-card");
    spellsContainer.appendChild(spellCard);
  
    // 2 - Crea 5 divs principales dentro de .spell-card
    // (title, illustration, attributes, description, extra)
    const spellTitle = document.createElement("div");
    spellTitle.classList.add("spell-title");
    spellCard.appendChild(spellTitle);
  
    const spellIllustration = document.createElement('div');
    spellIllustration.classList.add('spell-illustration');
    spellCard.appendChild(spellIllustration);
    spellIllustration.style.backgroundImage = `url("${spell.image}")`;
  
    const spellAttributes = document.createElement('div');
    spellAttributes.classList.add('spell-attributes');
    spellCard.appendChild(spellAttributes);
  
    const spellBoxDescription = document.createElement('div');
    spellBoxDescription.classList.add('spell-box-description');
    spellCard.appendChild(spellBoxDescription);
  
    const spellExtra = document.createElement('div');
    spellExtra.classList.add('spell-extra');
    spellCard.appendChild(spellExtra);
  
    //---------------> 3 - Vista compacta
    const spellTitleText = document.createElement("div");
    spellTitleText.classList.add("spell-title-text");
    spellTitle.appendChild(spellTitleText);
  
    // (h3 name; p castingTime; p school; p components; p materialComponents)
    const spellName = document.createElement("h3");
    spellName.textContent = spell.name;
    spellTitleText.appendChild(spellName);
  
    const spellCastingTime = document.createElement("p");
    spellCastingTime.textContent = `Casting Time: ${spell.castingTime}`;
    spellTitleText.appendChild(spellCastingTime);
  
    // La escuela me gustaria que se refleje en el diseño
    const spellSchool = document.createElement("p");
    spellSchool.textContent = `School: ${spell.school}`;
    spellTitleText.appendChild(spellSchool);
  
    const spellComponents = document.createElement("p");
    spellComponents.textContent = `Components: ${spell.components}`;
    spellTitleText.appendChild(spellComponents);
  
    if (spell.materialComponents) {
      const spellMaterialComponents = document.createElement('p');
      spellMaterialComponents.textContent = `M: ${spell.materialComponents}`;
      spellTitleText.appendChild(spellMaterialComponents);
    }
  
    // Crea boton de vista individual ------------->
    let viewButtonSpell = document.createElement("button");
    viewButtonSpell.classList.add("view-button-spell");
    viewButtonSpell.innerHTML =
      '<img src="../images/change-view-icon.png" alt="Cambiar vista">';
    spellTitle.appendChild(viewButtonSpell);
  
    viewButtonSpell.addEventListener("click", function () {
      // Obtiene el elemento "abuelo" del botón
      let spellCard = this.parentNode.parentNode;
      // Agrega la clase "change-view-spell" al hechizo en el que se hizo clic
      spellCard.classList.toggle("change-view-spell");
    });
  
    // Crea boton de hechizos preparados ------------->
    const preparedButton = document.createElement("button");
    preparedButton.classList.add("prepared-spells", "toggle-button");
    preparedButton.innerHTML =
      '<img src="../images/prepared-icon.png" alt="Cambiar vista">';
    spellTitle.appendChild(preparedButton);
  
    preparedButton.addEventListener("click", function () {
      // Obtiene el elemento mismo
      let preparedButton = this;
  
      // Agrega la clase "change-view-spell" al hechizo en el que se hizo clic
      preparedButton.classList.toggle("prepared-spell");
    });
  
    // Crea boton de hechizos favoritos ------------->
    const favoriteButton = document.createElement("button");
    favoriteButton.classList.add("favorite-spells", "toggle-button");
    favoriteButton.innerHTML =
      '<img src="../images/favorite-icon.png" alt="Cambiar vista">';
    spellTitle.appendChild(favoriteButton);
  
    favoriteButton.addEventListener("click", function () {
      // Obtiene el elemento mismo
      let favoriteSpell = this;
  
      // Agrega la clase "change-view-spell" al hechizo en el que se hizo clic
      favoriteSpell.classList.toggle("favorite-spell");
    });
  
    const spellLevel = document.createElement("p");
    spellLevel.classList.add("spell-level");
    spellLevel.textContent = `${spell.level}`;
    spellCard.appendChild(spellLevel);
    //---------> Fin de vista compacta
    //---------------> 4 - Vista detalle
    const spellImageDescription = document.createElement('p')
    spellImageDescription.classList.add('spell-image-description');
    spellImageDescription.innerHTML = spell.imageDescription.replace(/~/g, '<br>');
    spellIllustration.appendChild(spellImageDescription);
  
    const spellDuration = document.createElement('p');
    spellDuration.textContent = `Duration: ${spell.duration}`;
    spellAttributes.appendChild(spellDuration);
  
    // Los atributos en if statement solo son visibles si tiene info el hechizo
    if (spell.range) {
      const spellRange = document.createElement('p');
      spellRange.textContent = `Range: ${spell.range}`;
      spellAttributes.appendChild(spellRange);
    }
    if (spell.target) {
      const spellTarget = document.createElement('p');
      spellTarget.textContent = `Target: ${spell.target}`;
      spellAttributes.appendChild(spellTarget);
    }
    if (spell.effect) {
      const spellEffect = document.createElement('p');
      spellEffect.textContent = `Effect: ${spell.effect}`;
      spellAttributes.appendChild(spellEffect);
    }
    if (spell.area) {
      const spellArea = document.createElement('p');
      spellArea.textContent = `Area: ${spell.area}`;
      spellAttributes.appendChild(spellArea);
    }
    if (spell.savingThrow) {
      const spellSavingThrow = document.createElement('p');
      spellSavingThrow.textContent = `Saving Throw: ${spell.savingThrow}`;
      spellAttributes.appendChild(spellSavingThrow);
    }
    if (spell.spellResistance) {
      const spellResistance = document.createElement('p');
      spellResistance.textContent = `Spell Resistance: ${spell.spellResistance}`;
      spellAttributes.appendChild(spellResistance);
    }
    if (spell.XPCost) {
      const spellXPCost = document.createElement('p');
      spellXPCost.textContent = `XPCost: ${spell.XPCost}`;
      spellAttributes.appendChild(spellXPCost);
    }
    if (spell.focus) {
      const spellFocus = document.createElement('p');
      spellFocus.textContent = `Focus: ${spell.focus}`;
      spellAttributes.appendChild(spellFocus);
    }
    //---------> Fin de vista detalle
    //---------------> 4 - Vista completa
    const spellDescription = document.createElement('p');
    spellDescription.innerHTML = spell.description.replace(/~/g, '<br>');
    spellBoxDescription.appendChild(spellDescription);
    
    return spellCard;
  }
  
  function renderSpells() {
    // Eliminar todos los elementos hijos del contenedor de hechizos
    while (spellsContainer.firstChild) {
      spellsContainer.removeChild(spellsContainer.firstChild);
    }
    spellsContainer.innerHTML = "";
  
    const startIndex = (currentPage - 1) * spellsPerPage;
    const endIndex = Math.min(currentSpellIndex + spellsPerPage, spells.length);
    const spellsToRender = spells.slice(startIndex, endIndex);
    
    for (let i = currentSpellIndex; i < endIndex; i++) {
      const spell = spells[i];
      createSpellCard(spell, spellsContainer);
    }
  }
  
  
  
  
  
  
  
  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      currentSpellIndex -= spellsPerPage;
      if (currentSpellIndex < 0) {
        currentSpellIndex = Math.max(spells.length - spellsPerPage, 0);
        currentPage = totalPages;
      }
      renderSpells();
    } else if (currentPage === 1) {
      currentPage = totalPages;
      currentSpellIndex = (totalPages - 1) * spellsPerPage;
      renderSpells();
    }
  }
  
  function goToNextPage() {
    currentPage++;
    currentSpellIndex += spellsPerPage;
    if (currentSpellIndex >= spells.length) {
      currentSpellIndex = 0;
      currentPage = 1;
    }
    renderSpells();
  }
  
  window.addEventListener("resize", () => {
    spellsPerPage = calculateSpellsPerPage();
    totalPages = Math.ceil(spells.length / spellsPerPage);
    renderSpells();
  });
  
  
  
  // Código relacionado con la vista de todos los hechizos
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
  
  
  
  // Actualiza la paginación y la vista actual
  const previousPageButton = document.createElement("button");
  previousPageButton.id = "previous-page-button";
  const nextPageButton = document.createElement("button");
  nextPageButton.id = "next-page-button";
  
  // Agrega los elementos al DOM
  
  document.getElementById("spell-manager").appendChild(previousPageButton);
  document.getElementById("spell-manager").appendChild(nextPageButton);
  
  previousPageButton.addEventListener("click", () => {
    goToPreviousPage();
  });
  
  nextPageButton.addEventListener("click", () => {
    goToNextPage();
  
  });
  
  // Calcula la cantidad total de páginas y establece la página actual
  totalPages = Math.ceil(spells.length / spellsPerPage);
  currentPage = 1;
  
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
  
  function handleNextPage() {
    currentSpellIndex = Math.min(currentSpellIndex + spellsPerPage, spells.length - 1);
    renderSpells();
  }
  
  function handlePreviousPage() {
    currentSpellIndex = Math.max(currentSpellIndex - spellsPerPage, 0);
    renderSpells();
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
    createSpellCard(spell, spellsContainer); // Muestra el hechizo buscado en el contenedor
  }