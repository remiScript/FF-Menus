let counter = 0;
let minutes = 0;
let hours = 0;
let gameClock = document.getElementById("gameTime");

function formatTime() {
    counter += 1;
    if (counter >= 60) {
        counter = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    gameClock.innerText = hours + ":" + minutes + ":" + counter;
};

setInterval(formatTime, 1000);

//-------------------------------------------------------------------------------//
//----------------------------------- Cursor Start ------------------------------//
//-------------------------------------------------------------------------------//
let pos = 0;

const cursors = document.getElementsByClassName("cursor");
let cursorArray = Array.from(cursors);
let animationTimer = setInterval(animateCursor, 700);

function animateCursor() {
    Array.from(cursors).forEach((instance, index) => {
        if (party[index].selected == true) {
            return;
        } else {
            instance.classList.toggle('leftPosition');
        }
        
    });
    // cursor.classList.toggle('leftPosition');
}

function blinkCursor() {
    cursorArray.forEach((instance, index) => {
        if (party[index].isActive == true && party[index].selected == true) {
            instance.classList.toggle('hidden');
        }
    });
}
function renderCursorPHS() {
    // set the "highlighted" property of the top portrait in the active party to true
    party.forEach((character, index) => {
        let charContainer = document.getElementById('charContainerPHS' + (index + 1).toString());
        // console.log(charContainer);
        if (index == pos) {
            character.highlighted = true;
            let img = charContainer.children[0];
            img.classList.remove('hidden');
        } else {
            character.highlighted = false;
            let img = charContainer.children[0];
            img.classList.add('hidden');
            // console.log('hidden')
        }
        
    });
}



function moveCursorUp() {
    // when key is pressed, move one position down
    // if you are at the bottom row, move to the top instead
    // "movement" isn't really happening, we are removing and adding the cursor to
    // another place in the DOM, next to another portrait
    // here we are checking to see if we've already selected a character. If we 
    // haven't, we must be in the left panel, and if someone is already selected
    // we must be in the right panel.
    if ((party.filter(character => character.selected == true)).length == 0) {
        pos--;
        if (pos == -1) {
            pos = 2;
        }
    } else {
        pos--;
        if (pos == 2) {
            pos = 8;
        }
        let reserve = party.filter(character => character.isActive == false);
        previewCharacter(reserve[pos - 3]);
    }
    renderCursorPHS();
}

function moveCursorDown() {
    // when key is pressed, move one position down
    // if you are at the bottom row, move to the top instead
    // "movement" isn't really happening, we are revealing and hiding cursors
    // there's one next to each portrait, but only the active one is visible (css)
    
    if ((party.filter(character => character.selected == true)).length == 0) {
        // console.log('no one is selected')
        pos++;
        if (pos == 3) {
            pos = 0;
        }
    } else {
        // console.log('someone is selected')
        pos++;
        if (pos == 9) {
            pos = 3;
        } // console.log('position: ' + pos);
        let reserve = party.filter(character => character.isActive == false);
        previewCharacter(reserve[pos - 3]);
    }
    renderCursorPHS();
    
}

function previewCharacter(char) {
    // grab the div
    let previewDiv = document.getElementById('previewPanel');

    // wipe the old contents out
    previewDiv.innerHTML = '';

    // this holds the image
    let previewPortraitDiv = document.createElement('div');
    previewPortraitDiv.setAttribute('class', 'portrait');
    previewPortraitDiv.setAttribute('id', 'previewPortrait');

    // this IS the image
    let previewPortraitDivImg = document.createElement('img');
    previewPortraitDivImg.setAttribute('src', char.portrait);

    // this holds the info
    let previewInfoDiv = document.createElement('div');
    previewInfoDiv.setAttribute('class', 'info');

    let charName = document.createElement("p");
    charName.setAttribute("class", "heading");
    charName.textContent = char.name;
    previewInfoDiv.appendChild(charName);

    let charLevel = document.createElement("p");
    charLevel.setAttribute("class", "level");
    charLevel.innerHTML = `<span class="label">LV</span><span class="bold"> ${char.level}</span>`;
    previewInfoDiv.appendChild(charLevel);

    let charHP = document.createElement("p");
    charHP.setAttribute("class", "hp");
    charHP.innerHTML = `<span class="label">HP</span><span class="bold"> ${char.maxHP}/${char.maxHP}</span>`;
    previewInfoDiv.appendChild(charHP);

    let hpBar = document.createElement("div");
    hpBar.setAttribute("class", "hpBar");
    hpBar.innerHTML = '<span style="visibility: hidden;">.</span>';
    previewInfoDiv.appendChild(hpBar);

    let charMP = document.createElement("p");
    charMP.innerHTML = `<span class="label">MP</span> <span class="mpValueAdjust"><span class="bold"> ${char.maxMP}/${char.maxMP}</span></span>`;
    previewInfoDiv.appendChild(charMP);

    let mpBar = document.createElement("div");
    mpBar.setAttribute("class", "mpBar");
    mpBar.innerHTML = '<span style="visibility: hidden;">.</span>';
    previewInfoDiv.appendChild(mpBar);

    // append things to other things!
    previewDiv.appendChild(previewPortraitDiv);
    previewDiv.appendChild(previewInfoDiv);
    previewPortraitDiv.appendChild(previewPortraitDivImg);
}

function clearPreviewPanel() {
    // grab the div
    let previewDiv = document.getElementById('previewPanel');

    // wipe the old contents out
    previewDiv.innerHTML = '';
}




//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Write this as a function for the PHS screen only. Put this function in another file and import it
// to the PHS screen html file. The main menu screen will have its own X button function. 
// The X button only does 2 things

function xButtonPHS() {
    if ((party.filter(character => character.selected == true)).length == 0) {
        let active = party.filter(character => character.isActive == true);
        active.forEach((character, index) => {
        // if an active party member is highlighted, it should :
            if (character.highlighted == true) {        
                // select them
                character.selected = true;
                // de-highlight them
                character.highlighted = false;
                // make the cursor stop animating
                clearInterval(animationTimer);
                // make the cursor blink
                setInterval(blinkCursor, 25);
                // play a sound effect
                // highlight the first inactive party member portrait
                let reserve = party.filter(character => character.isActive == false);
                reserve[0].highlighted = true;
                pos = 3;
                renderCursorPHS();
                setInterval(animateCursor, 700);
                // disable up/down arrow functionality for the active party
                // enable the up/down arrow functionality for the reserve party
                // display the stats of the highlighted reserve party member in the preview panel
                previewCharacter(reserve[0]);
            } 
        });
    } else {
        let reserve = party.filter(character => character.isActive == false);
        reserve.forEach((character, index) => {
        // if an inactive party member is highlighted, it should:
            if(character.highlighted == true) {
                // select them
                character.selected = true;
                // de-highlight them
                character.highlighted = false;
                // swap the two selected party members
                swapAndPop()
                // disable the preview panel
                // de-select both party members (happens in swapPartyMembers function)
                // re-highlight the first active party member portrait
                let first = party.find(character => character.isActive);
                first.highlighted = true;
                console.log(first);
                // stop the blinking
                // play a sound effect
                // restart the cursor animation
                // disable arrow functionality for reserve party
                // re-enable arrow functionality for active party
                pos = 0;
                renderCursorPHS();
                clearPreviewPanel();
            } 
        });

    }



    console.log('x button')   
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        moveCursorUp();
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowDown') {
        moveCursorDown();
    }
})



document.addEventListener('keydown', function(event) {
    if(event.key === 'x') {
        xButtonPHS();
    }
})


//-------------------------------------------------------------------------------//
//------------------------------------ Cursor END -------------------------------//
//-------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------//
//------------------------------------ Party START-------------------------------//
//-------------------------------------------------------------------------------//

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Have the x button array functionality work one way for the PHS page, one way for the main
let party = [
    {name: 'Cloud', 
    portrait: 'images/Cloud.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    isActive: true, 
    selected: false,
    highlighted: true}, 

    {name: 'Barret', 
    portrait: 'images/Barret.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160, 
    isActive: true, 
    selected: false,
    highlighted: false}, 

    {name: 'Tifa', 
    portrait: 'images/Tifa.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160, 
    isActive: true, 
    selected: false,
    highlighted: false}, 

    {name: 'Aerith', 
    portrait: 'images/Aerith.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160, 
    isActive: false, 
    selected: false,
    highlighted: false},

    {name: 'Red XIII', 
    portrait: 'images/Red XIII.jpeg', 
    level: 7,
    maxHP: 345,
    maxMP: 160,
    selected: false, 
    isActive: false, 
    highlighted: false}, 

    {name: 'Yuffie', 
    portrait: 'images/Yuffie.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false, 
    isActive: false, 
    highlighted: false}, 

    {name: 'Cait Sith', 
    portrait: 'images/Cait Sith.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false, 
    isActive: false, 
    highlighted: false},

    {name: 'Vincent', 
    portrait: 'images/Vincent.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false, 
    isActive: false, 
    highlighted: false}, 

    {name: 'Cid', 
    portrait: 'images/Cid.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false, 
    isActive: false, 
    highlighted: false}
]

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// this function will need to be rewritten. It reflects the 2 array system (active/reserve)
// that is going away. This function will be simplier, toggling the boolean value isActive
// on members of the party.
function swapPartyMembers() {
    // swapping out a party member, cloud for squall
    let activeSelected = party.find(partyMember => ((partyMember.selected === true) && (partyMember.isActive === true)));
    let aIndex = party.indexOf(activeSelected);

    let reserveSelected = party.find(partyMember =>((partyMember.selected === true) && (partyMember.isActive === false)));
    let rIndex = party.indexOf(reserveSelected);
        
    // swap cloud to reserve party
    activeSelected.isActive = false;
    activeSelected.selected = false;
    activeSelected.highlighted = false;
        
    // swap squall to the active party
    reserveSelected.isActive = true;
    reserveSelected.selected = false;
    reserveSelected.highlighted = false;

    // activeSelected.selected = false;
    // reserveSelected.selected = false;    

    
    let temp = party[aIndex];
    
    party[aIndex] = party[rIndex];
    console.log("temp: " + temp)
    party[rIndex] = temp;
    
    // indexOf(reserveSelected) = aIndex;
    console.table(party);
}

//-------------------------------------------------------------------------------//
//------------------------------------ PARTY END --------------------------------//
//-------------------------------------------------------------------------------//


function populateActiveParty() {
    let active = party.filter(member => member.isActive == true);
    active.forEach((character, index) => {
        // for each character in the active party (an array with 3 objects), we populate
        // their information to each of the 3 slots in the main menu
        // this function should run at page load, whenever the main menu is pulled up
        
        // the portrait image
        let portrait = document.getElementById('portrait' + (index + 1).toString());
        portrait.src = character.portrait;
        
        // the displayed name
        let charName = document.getElementById('charName' + (index + 1).toString());
        charName.innerText = character.name;
        
        // the character's level
        let charLevel = document.getElementById('charLevel' + (index + 1).toString());
        charLevel.innerText = character.level;
        
        // their current and max hp
        let charHP = document.getElementById('charHP' + (index + 1).toString());
        charHP.innerText = ` ${character.maxHP}/${character.maxHP}`;

        // their current and max mp
        let charMP = document.getElementById('charMP' + (index + 1).toString());
        charMP.innerText = `${character.maxMP}/${character.maxMP}`;
    });
}

function populateReserveParty() {
    let reserve = party.filter(member => member.isActive == false);
    reserve.forEach((character, index) => {
        let portrait = document.getElementById('reservePortrait' + (index + 1).toString());
        portrait.src = character.portrait; 
    });
}

function populateParty() {
    populateActiveParty();
    populateReserveParty();
}

function swapAndPop(){
    console.log('test')
    swapPartyMembers();
    populateParty();
}

window.onload = populateParty();
renderCursorPHS();