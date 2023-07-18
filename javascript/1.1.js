import { spells } from "./spells.js";

const spellsContainer = document.getElementById('spells-container');
const changeViewAllButton = document.getElementById('change-view-all-button');
const resolutions = [
  { width: 425, spellsPerPage: 1 },
  { width: 768, spellsPerPage: 2 },
  { width: 1024, spellsPerPage: 3 },
  { width: 1440, spellsPerPage: 4 },
  // Agrega más resoluciones según tus necesidades
];
let currentResolutionIndex = 200;
let spellsPerPage = calculateSpellsPerPage();
let currentPage;
let totalPages;

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

    // Crea boton de vista individual
    let viewButtonSpell = document.createElement("button");
    viewButtonSpell.classList.add("view-button-spell");
    viewButtonSpell.innerHTML =
        '<img src="../images/change-view-icon.png" alt="Cambiar vista">';
    spellTitle.appendChild(viewButtonSpell);

    // Crea boton de hechizos preparados
    const preparedButton = document.createElement("button");
    preparedButton.classList.add("prepared-spells", "toggle-button");
    preparedButton.innerHTML =
        '<img src="../images/prepared-icon.png" alt="Cambiar vista">';
    spellTitle.appendChild(preparedButton);

    // Crea boton de hechizos favoritos
    const favoriteButton = document.createElement("button");
    favoriteButton.classList.add("favorite-spells", "toggle-button" );
    favoriteButton.innerHTML =
        '<img src="../images/favorite-icon.png" alt="Cambiar vista">';
    spellTitle.appendChild(favoriteButton);

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
        spellFocus.textContent = `XPCost: ${spell.focus}`;
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
  spellsContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * spellsPerPage;
  const endIndex = startIndex + spellsPerPage;
  const spellsToRender = spells.slice(startIndex, endIndex);

  spellsToRender.forEach((spell) => {
    const spellCard = createSpellCard(spell);
    spellsContainer.appendChild(spellCard);
  });

  // Actualiza la paginación y la vista actual
  // Código relacionado con la paginación y el cambio de vista
  const previousPageButton = document.getElementById("previous-page-button");
  const nextPageButton = document.getElementById("next-page-button");

  if (currentPage === 1) {
      previousPageButton.disabled = true;
  } else {
      previousPageButton.disabled = false;
  }

  if (currentPage === totalPages) {
      nextPageButton.disabled = true;
  } else {
      nextPageButton.disabled = false;
  }

  // Código relacionado con la vista actual
  const viewButtons = document.querySelectorAll(".view-button");

  viewButtons.forEach((button) => {
      button.classList.remove("active");
  });

  const currentViewButton = document.getElementById(`${viewMode}-button`);
  currentViewButton.classList.add("active");
}

function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderSpells();
  }
}

function goToNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    renderSpells();
  }
}

window.addEventListener("resize", () => {
  spellsPerPage = calculateSpellsPerPage();
  totalPages = Math.ceil(spells.length / spellsPerPage);
  renderSpells();
});

changeViewAllButton.addEventListener("click", () => {
  const currentResolution = resolutions[currentResolutionIndex];
  // Cambiar la altura de spellCard
  spellsContainer.style.height = `${currentResolution}px`;
  currentResolutionIndex = (currentResolutionIndex + 1) % resolutions.length;
});

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
renderSpells();
