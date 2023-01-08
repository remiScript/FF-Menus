//-------------------------------------------------------------------------------//
//------------------------------------ Timer START ------------------------------//
//-------------------------------------------------------------------------------//

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
//------------------------------------ Timer END --------------------------------//
//-------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------//
//----------------------------------- Cursor Start ------------------------------//
//-------------------------------------------------------------------------------//

let pos = 0;

const cursor = document.getElementsByClassName("cursor");

function animateCursor() {
    Array.from(cursor).forEach(instance => {
        instance.classList.toggle('leftPosition');
    });
    // cursor.classList.toggle('leftPosition');
}

function blinkCursor() {
    Array.from(cursor).forEach((instance, index) => {
        if (activeParty[index].highlighted == true) {
            instance.classList.toggle('hidden');
        }
    });
}

animationTimer = setInterval(animateCursor, 700);

function isAnimationRunning() {
    return !!animateCursor;
}

function renderCursorPHS() {
    // set the "highlighted" property of the top portrait in the active party to true
    activeParty.forEach((character, index) => {
        let charContainer = document.getElementById('charContainerPHS' + (index + 1).toString());
        if (index == pos) {
            character.highlighted = true;
            let img = charContainer.children[0];
            img.classList.remove('hidden');
        } else {
            character.highlighted = false;
            let img = charContainer.children[0];
            img.classList.add('hidden');
        }
        
    });
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// needs rewrite
function moveCursorUp() {
    // when key is pressed, move one position down
    // if you are at the bottom row, move to the top instead
    // "movement" isn't really happening, we are removing and adding the cursor to
    // another place in the DOM, next to another portrait
    pos--;
    if (pos == -1) {
        pos = 2;
    }
    console.log("position: " + pos);
    renderCursorPHS();
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// needs rewrite
function moveCursorDown() {
    // when key is pressed, move one position down
    // if you are at the bottom row, move to the top instead
    // "movement" isn't really happening, we are removing and adding the cursor to
    // another place in the DOM, next to another portrait
    pos++;
    if (pos == 3) {
        pos = 0;
    }
    console.log("position: " + pos);
    renderCursorPHS();
}


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Write this as a function for the PHS screen only. Put this function in another file and import it
// to the PHS screen html file. The main menu screen will have its own X button function. 
// The X button only does 2 things
// if an active party member is highlighted, it should :
    // select them
    // de-highlight them
    // make the cursor stop animating
    // make the cursor blink
    // play a sound effect
    // highlight the first inactive party member portrait
    // disable up/down arrow functionality for the active party
    // enable the up/down arrow functionality for the reserve party
    // display the stats of the highlighted reserve party member in the preview panel
// if an inactive party member is highlighted, it should:
    // select them
    // de-highlight them
    // swap the two selected party members
    // disable the preview panel
    // de-select both party members
    // re-highlight the first active party member portrait
    // stop the blinking
    // play a sound effect
    // restart the cursor animation
    // disable arrow functionality for reserve party
    // re-enable arrow functionality for active party
function xButtonPHS() {
    // Everything in here will need to be rewritten (probably)
    //if we're on the active party, step 1, make cursor blink
    clearInterval(animationTimer);
    setInterval(blinkCursor, 25);
    // "move" cursor to index[0] of reserve party
    // adjust arrow functions?
    console.log('x button')   
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowDown') {
        moveCursorDown();
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        moveCursorUp();
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

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Make both parties one array, have a value of isActive set to true/false
// Have the x button array functionality work one way for the PHS page, one way for the main



//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// this needs to be renamed to "party" to address the one party array, so all references
// to activeParty need to be reviewed
let activeParty = [
    {name: 'Cloud', 
    portrait: 'images/Cloud.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    isActive: true, 
    selected: true,
    highlighted: false}, 

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
    selected: true,
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
// this needs to be merged into"party" to address the one party array, so all references
// to reserveParty need to be reviewed
let reserveParty = [
    {name: 'Aerith', 
    portrait: 'images/Aerith.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: true,
    highlighted: false},

    {name: 'Red XIII', 
    portrait: 'images/Red XIII.jpeg', 
    level: 7,
    maxHP: 345,
    maxMP: 160,
    selected: false,
    highlighted: false}, 

    {name: 'Yuffie', 
    portrait: 'images/Yuffie.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false,
    highlighted: false}, 

    {name: 'Cait Sith', 
    portrait: 'images/Cait Sith.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false,
    highlighted: false},

    {name: 'Vincent', 
    portrait: 'images/Vincent.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false,
    highlighted: false}, 

    {name: 'Cid', 
    portrait: 'images/Cid.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false,
    highlighted: false}
]

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// needs adjustment to one party array
function displayPartyMembers() {
    console.log("Active Party: ")
    console.table(activeParty)
    console.log("Reserve Party: ")
    console.table(reserveParty)
    return true;
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// this function will need to be rewritten. It reflects the 2 array system (active/reserve)
// that is going away. This function will be simplier, toggling the boolean value isActive
// on members of the party.
function swapPartyMembers() {
    // swapping out a party member, cloud for squall
    let activeSelected = activeParty.find(partyMember => partyMember.selected === true);
    let activeIndex = activeParty.findIndex(partyMember => partyMember.selected === true);
    let reserveSelected = reserveParty.find(partyMember => partyMember.selected === true);
    let reserveIndex = reserveParty.findIndex(partyMember => partyMember.selected === true);
    
    // add cloud to reserve party
    reserveParty.unshift(activeSelected);
        
    // add squall to the active party
    activeParty.unshift(reserveSelected);
    console.table(activeParty);

    // remove cloud from active party
    activeParty.forEach(member => {
        if (member.name === activeSelected.name){
            console.log(member.name + ' match')
            console.log(activeIndex)
            activeParty.splice(activeIndex + 1, 1)
            
        } else {
            console.log(member.name + ' no match')
        }
    });
    
    // remove squall from reserve party
    reserveParty.forEach(member => {
        if (member.name === reserveSelected.name){
            console.log(member.name + ' match')
            console.log(reserveIndex)
            reserveParty.splice(reserveIndex + 1, 1)
            
        } else {
            console.log(member.name + ' no match')
        }
    });

    // activeSelected.selected = false;
    // reserveSelected.selected = false;    

    console.log('updated!');
}

//-------------------------------------------------------------------------------//
//------------------------------------ PARTY END --------------------------------//
//-------------------------------------------------------------------------------//

let portrait1 = document.getElementById('portrait1');
let charName1 = document.getElementById('charName1');
let charLevel1 = document.getElementById('charLevel1');
let charHP1 = document.getElementById('charHP1');
let charMP1 = document.getElementById('charMP1');

let portrait2 = document.getElementById('portrait2');
let charName2 = document.getElementById('charName2');
let charLevel2 = document.getElementById('charLevel2');
let charHP2 = document.getElementById('charHP2');
let charMP2 = document.getElementById('charMP2');

let portrait3 = document.getElementById('portrait3');
let charName3 = document.getElementById('charName3');
let charLevel3 = document.getElementById('charLevel3');
let charHP3 = document.getElementById('charHP3');
let charMP3 = document.getElementById('charMP3');

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// references to activeParty below, need to adjust
function populateFirstCharacter() {
    portrait1.src = activeParty[0].portrait;
    charName1.innerText = activeParty[0].name;
    charLevel1.innerText = activeParty[0].level;
    charHP1.innerText = ` ${activeParty[0].maxHP}/${activeParty[0].maxHP}`;
    charMP1.innerText = `${activeParty[0].maxMP}/${activeParty[0].maxMP}`;
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// references to activeParty below, need to adjust
function populateSecondCharacter() {
    portrait2.src = activeParty[1].portrait;
    charName2.innerText = activeParty[1].name;
    charLevel2.innerText = activeParty[1].level;
    charHP2.innerText = ` ${activeParty[1].maxHP}/${activeParty[1].maxHP}`;
    charMP2.innerText = `${activeParty[1].maxMP}/${activeParty[1].maxMP}`;
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// references to activeParty below, need to adjust
function populateThirdCharacter() {
    portrait3.src = activeParty[2].portrait;
    charName3.innerText = activeParty[2].name;
    charLevel3.innerText = activeParty[2].level;
    charHP3.innerText = ` ${activeParty[2].maxHP}/${activeParty[2].maxHP}`;
    charMP3.innerText = `${activeParty[2].maxMP}/${activeParty[2].maxMP}`;
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// references to activeParty below, need to adjust
function populateReserveParty() {
    reserveParty.forEach((character, index) => {
        let portrait = document.getElementById('reservePortrait' + (index + 1).toString());
        portrait.src = character.portrait;
        
    });
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        // this now needs to be rewritten to address the single party array
        // instead of looking at the activePartyArray (which is going away), this should
        // now check for the three party members that have "isActive: true"
function populateParty() {
    activeParty.forEach((character, index) => {
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
    reserveParty.forEach((character, index) => {
        let portrait = document.getElementById('reservePortrait' + (index + 1).toString());
        portrait.src = character.portrait;
        
    });
}
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXNOTEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function swapAndPop(){
    swapPartyMembers();
    populateParty();
}

populateParty();
renderCursorPHS();