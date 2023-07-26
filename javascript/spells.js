const spells = [{
        name: "Create Water",
        school: "Conjuration",
        level: "0",
        image: "../images/water-template.png",
        imageDescription: "Create up to 2 gallons of water/level.~   1 gallon weighs about 8 pounds.~    One cubic foot contains roughly 8 gallons and weighs about 60 pounds.",
        components: "V, S",
        materialComponents: "",
        castingTime: "1 action",
        range: "Close (25 ft. + 5 ft./2 levels)",
        target: "",
        effect: "",
        area: "",
        duration: "Instantaneous",
        savingThrow: "None",
        spellResistance: "No",
        XPCost: "",
        focus: "",
        description: "This spell generates wholesome, drinkable water, just like clean rain water. Water can be created in an area as small as will actually contain the liquid, or in an area three times as large (possibly creating a downpour or filling many small receptacles). ~Note: Conjuration spells can’t create substances or objects within a creature. Water weighs about 8 pounds per gallon. One cubic foot of water contains roughly 8 gallons and weighs about 60 pounds.",
        prepared: false,
    },
    {
        name: "Cure Minor Wounds",
        school: "Conjuration",
        level: "0",
        image: "../images/healing-template.png",
        imageDescription: "Cures 1 points of damage +1 point per caster level (maximum +5).~",
        components: "V, S",
        materialComponents: "",
        castingTime: "1 action",
        range: "Touch",
        target: "Creature touched",
        effect: "",
        area: "",
        duration: "Instantaneous",
        savingThrow: "Will half (harmless) (see text)",
        spellResistance: "Yes (harmless)",
        XPCost: "",
        focus: "",
        description: "When laying your hand upon a living creature, you channel positive energy that cures 1 points of damage +1 point per caster level (maximum +5).~        Since undead are powered by negative energy, this spell deals damage to them instead of curing their wounds. An undead creature can apply spell resistance, and can attempt a Will save to take half damage.",
        prepared: false,
    },
    {
        name: "Detect Magic",
        school: "Divination",
        level: "0",
        image: "../images/detect-template.png",
        imageDescription: "1st Round: Presence or absence of magical auras.~    2nd Round: Number of different magical auras and the power of the most potent aura.~    3rd Round: The strength and location of each aura.",
        components: "V, S",
        materialComponents: "",
        castingTime: "1 action",
        range: "60 ft.",
        target: "",
        effect: "",
        area: "Quarter circle emanating from the character to the extreme of the range",
        duration: "Concentration, up to 1 minute/level (D)",
        savingThrow: "None",
        spellResistance: "No",
        XPCost: "",
        focus: "",
        description: `The character detect magical auras. The amount of information revealed depends on how long the character studies a particular area or subject:~    
        1st round: Presence or absence of magical auras.~
        2nd round: Number of different magical auras and the strength of the strongest aura.~
        3rd round: The strength and location of each aura. If the items or creatures bearing the auras are in line of sight, the character can make Spellcraft skill checks to determine the school of magic involved in each. (Make one check per aura; DC 15 + spell level, or 15 + half caster level for a nonspell effect.)~
        Magical areas, multiple types of magic, or strong local magical emanations may confuse or conceal weaker auras.
        Aura Strength: An aura’s magical power and strength depend on a spell’s functioning spell level or an item’s caster level.
        If an aura falls into more than one category, detect magic indicates the stronger of the two.~
        <table>
            <tr>
                <th align="left" rowspan="2">Spell or Object</th>
                <th colspan="4">Aura Power</th>
            </tr>
            <tr>
                <th>Faint</th>
                <th>Moderate</th>
                <th>Strong</th>
                <th>Overwhelming</th>
            </tr>
            <tr>
                <td>Functioning spell (spell level)</td>
                <td align="center">3rd or lower</td>
                <td align="center">4th-6th</td>
                <td align="center">7th-9th</td>
                <td align="center">10th+ (deity-level)</td>
            </tr>
            <tr>
                <td>Magic item (caster level)</td>
                <td align="center">5th or lower</td>
                <td align="center">6th-11th</td>
                <td align="center">12th-20th</td>
                <td align="center">21st+ (artifact)</td>
            </tr>
        </table>
        Lingering Aura: A magical aura lingers after its original source dissipates (in the case of a spell) or is destroyed (in the case of a magic item). If detect magic is cast and directed at such a location, the spell indicates an aura strength of dim (even weaker than a faint aura). How long the aura lingers at this dim level depends on its original power:~
        <table>
            <tr>
		        <th align="left">Original Strength</th>
		        <th align="left">Duration of Lingering Aura</th>
	        </tr>
            <tr>
                <td>Faint</td>
                <td>1d6 rounds</td>
            </tr>
            <tr>
                <td>Moderate</td>
                <td>1d6 minutes</td>
            </tr>
            <tr>
                <td>Strong</td>
                <td>1d6×10 minutes</td>
            </tr>
            <tr>
                <td>Overwhelming</td>
                <td>1d6 days</td>
            </tr>
        </table>
        Note: Each round, the character can turn to detect things in a new area. The spell can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it. Outsiders and elementals are not magical in themselves, but if they are conjured, the conjuration spell registers.~
        Detect magic can be made permanent with a permanency spell.`,
        prepared: false,
    },
    {
        name: "Detect Poison",
        school: "Divination",
        level: "0",
        image: "../images/detect-template.png",
        imageDescription: "Determine whether a creature, object, or area has been poisoned or is poisonous.~ Determine the exact type of poison with a successful Wisdom check (DC20)",
        components: "V, S",
        materialComponents: "",
        castingTime: "1 action",
        range: "Close (25 ft. + 5 ft./2 levels)",
        target: "One creature, one object, or a 5-ft. cube",
        effect: "",
        area: "",
        duration: "Instantaneous",
        savingThrow: "None",
        spellResistance: "No",
        XPCost: "",
        focus: "",
        description: "The character determine whether a creature, object, or area has been poisoned or is poisonous. The character can determine the exact type of poison with a successful Wisdom check (DC 20). A character with the Alchemy skill may try an Alchemy check (DC 20) if the Wisdom check fails, or may try the Alchemy check prior to the Wisdom check.~        Note: The spell can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.",
        prepared: false,
    },
    {
        name: "Flare",
        school: "Evocation",
        level: "0",
        image: "../images/dazzled-template.png",
        imageDescription: "A dazzled creature suffers a –1 penalty on attack rolls.~ The creature recovers in 1 minute.~ Sightless creatures are not affected by flare.",
        components: "V",
        materialComponents: "",
        castingTime: "1 action",
        range: "Close (25 ft. + 5 ft./2 levels)",
        target: "",
        effect: "Burst of light",
        area: "",
        duration: "Instantaneous",
        savingThrow: "Fortitude negates",
        spellResistance: "Yes",
        XPCost: "",
        focus: "",
        description: "This cantrip creates a burst of bright light. If the character causes the light to burst directly in front of a single creature, that creature is dazzled. A dazzled creature suffers a –1 penalty on attack rolls. The creature recovers in 1 minute. Sightless creatures are not affected by flare.",
        prepared: false,
    },
    {
        name: "Guidance",
        school: "Divination",
        level: "0",
        image: "../images/buff-template.png",
        imageDescription: "The creature gets a +1 competence bonus on a single attack roll, saving throw, or skill check.",
        components: "V, S",
        materialComponents: "",
        castingTime: "1 action",
        range: "Touch",
        target: "Creature touched",
        effect: "",
        area: "",
        duration: "1 minute or until discharged",
        savingThrow: "None",
        spellResistance: "Yes",
        XPCost: "",
        focus: "",
        description: "This spell imbues the subject with a touch of divine guidance. The creature gets a +1 competence bonus on a single attack roll, saving throw, or skill check. It must choose to use the bonus before making the roll to which it applies.",
        prepared: false,
    },
    {
        name: "Know Direction",
        school: "Divination",
        level: "0",
        image: "../images/know-direction.png",
        imageDescription: "Instantly know the direction of north.",
        components: "V, S",
        materialComponents: "",
        castingTime: "1 action",
        range: "Personal",
        target: "",
        effect: "",
        area: "",
        duration: "Instantaneous",
        savingThrow: "",
        spellResistance: "",
        XPCost: "",
        focus: "",
        description: "The character instantly knows the direction of north from the character's current position. The spell is effective in any environment in which 'north' exists, but it may not work in extraplanar settings. The character's knowledge of north is correct at the moment of casting, but note that the character can get lost again within moments if the character doesn’t find some external reference point to help the character keep track of direction.",
        prepared: false,
    },
    {
        name: "Light",
        school: "Evocation",
        level: "0",
        image: "../images/light-template.png",
        imageDescription: "20-foot radius of light and shadowy illumination out to a 40 ft. radius.",
        components: "V, M/DF",
        materialComponents: "A firefly or a piece of phosphorescent moss.  ",
        castingTime: "1 action",
        range: "Touch",
        target: "Object touched  ",
        effect: "",
        area: "",
        duration: "10 minutes/level (D)",
        savingThrow: "None",
        spellResistance: "No",
        XPCost: "",
        focus: "",
        description: "This spell causes an object to glow like a torch, shedding light in a 20-foot radius from the point the character touches. The effect is immobile, but it can be cast on a movable object. Light taken into an area of magical darkness does not function.",
        prepared: false,
    },
    {
        name: "Mending",
        school: "Transmutation",
        level: "0",
        image: "../images/mending.png",
        imageDescription: "Repairs small breaks or tears in objects of up to 1 lb.",
        components: "V, S",
        materialComponents: "",
        castingTime: "1 action",
        range: "10 ft.",
        target: "One object of up to 1 lb.",
        effect: "",
        area: "",
        duration: "Instantaneous",
        savingThrow: "Will negates (harmless, object)",
        spellResistance: "Yes (harmless, object)",
        XPCost: "",
        focus: "",
        description: "Mending repairs small breaks or tears in objects (but not warps, such as might be caused by a warp wood spell). It will weld broken metallic objects such as a ring, a chain link, a medallion, or a slender dagger, providing but one break exists.~         Ceramic or wooden objects with multiple breaks can be invisibly rejoined to be as strong as new.~ A hole in a leather sack or a wineskin is completely healed over by mending. The spell can repair a magic item, but the item’s magical abilities are not restored.~ The spell cannot mend broken magic rods, staffs, or wands, nor does it affect creatures (including constructs).",
        prepared: false,
    },
    {
        name: "Purify Food and Drink",
        school: "Transmutation",
        level: "0",
        image: "../images/purify-template.png",
        imageDescription: "Makes otherwise contaminated food and water pure and suitable for consumption.",
        components: "V, S",
        materialComponents: "",
        castingTime: "1 action",
        range: "10 ft.",
        target: "1 cu. ft./level of contaminated food and water",
        effect: "",
        area: "",
        duration: "Instantaneus",
        savingThrow: "Will negates (object)",
        spellResistance: "Yes (object)",
        XPCost: "",
        focus: "",
        description: "This spell makes spoiled, rotten, poisonous, or otherwise contaminated food and water pure and suitable for eating and drinking. This spell does not prevent subsequent natural decay or spoilage. Unholy water and similar food and drink of significance is spoiled by purify food and drink, but the spell has no effect on creatures of any type nor upon magic potions.~~         Note: Water weighs about 8 pounds per gallon. One cubic foot of water contains roughly 8 gallons and weighs about 60 pounds.",
        prepared: false,
    },
    {
        name: "Read Magic",
        school: "Divination",
        level: "0",
        image: "../images/read-magic.png",
        imageDescription: "You can decipher magical inscriptions on objects—books, scrolls, weapons, and the like—that would otherwise be unintelligible.",
        components: "V, S, F",
        materialComponents: "",
        castingTime: "1 action",
        range: "Personal",
        target: "Self",
        effect: "",
        area: "",
        duration: "10 minutes/level (D)",
        savingThrow: "",
        spellResistance: "",
        XPCost: "",
        focus: "A clear crystal or mineral prism.",
        description: "By means of read magic, you can decipher magical inscriptions on objects—books, scrolls, weapons, and the like—that would otherwise be unintelligible. This deciphering does not normally invoke the magic contained in the writing, although it may do so in the case of a cursed scroll.~ Furthermore, once the spell is cast and you have read the magical inscription, you are thereafter able to read that particular writing without recourse to the use of read magic.~ You can read at the rate of one page (250 words) per minute. The spell allows you to identify a glyph of warding with a DC 13 Spellcraft check, a greater glyph of warding with a DC 16 Spellcraft check, or any symbol spell with a Spellcraft check (DC 10 + spell level).~~ Read magic can be made permanent with a permanency spell.",
        prepared: false,
    },
    {
        name: "Resistance",
        school: "Abjuration",
        level: "0",
        image: "../images/buff-template.png",
        imageDescription: "+1 resistance bonus on saves",
        components: "V, S, M, DF",
        materialComponents: "A miniature cloak.",
        castingTime: "1 action",
        range: "Touch",
        target: "Object touched",
        effect: "",
        area: "",
        duration: "1 minute",
        savingThrow: "Will negates (harmless)",
        spellResistance: "Yes (harmless)",
        XPCost: "",
        focus: "",
        description: "You imbue the subject with magical energy that protects it from harm, granting it a +1 resistance bonus on saves.~~    Resistance can be made permanent with a permanency spell.",
        prepared: false,
    },
    {
        name: "Virtue",
        school: "Transmutation",
        level: "0",
        image: "../images/temporary-template.png",
        imageDescription: "1 temporary hit point",
        components: "V, S, DF",
        materialComponents: "",
        castingTime: "1 standard action",
        range: "Touch",
        target: "Creature touched",
        effect: "",
        area: "",
        duration: "1 minute",
        savingThrow: "Fortitude negates (harmless)",
        spellResistance: "Yes (harmless)",
        XPCost: "",
        focus: "",
        description: "The subject gains 1 temporary hit point.",
        prepared: false,
    },
];

export {
    spells
};