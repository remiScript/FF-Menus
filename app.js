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

setInterval(animateCursor, 700);

function renderCursorPHS() {
    // set the "highlighted" property of the top portrait in the active party to true
    activeParty.forEach((character, index) => {
        let charContainer = document.getElementById('charContainerPHS' + (index + 1).toString());
        if (index == pos) {
            character.highlighted = true;
            console.log(character.name + " is highlighted.")
            let img = charContainer.children[0];
            console.log(img);
            img.classList.remove('hidden');
        } else {
            character.highlighted = false;
            let img = charContainer.children[0];
            img.classList.add('hidden');
        }
        
    });
}

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


//-------------------------------------------------------------------------------//
//------------------------------------ Cursor END -------------------------------//
//-------------------------------------------------------------------------------//


//-------------------------------------------------------------------------------//
//------------------------------------ Party START-------------------------------//
//-------------------------------------------------------------------------------//

let activeParty = [
    {name: 'Cloud', 
    portrait: 'images/Cloud.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: true,
    highlighted: false}, 

    {name: 'Barret', 
    portrait: 'images/Barret.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false,
    highlighted: false}, 

    {name: 'Tifa', 
    portrait: 'images/Tifa.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false,
    highlighted: false}
]

let reserveParty = [
    {name: 'Aerith', 
    portrait: 'images/Aerith.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: true},

    {name: 'Red XIII', 
    portrait: 'images/Red XIII.jpeg', 
    level: 7,
    maxHP: 345,
    maxMP: 160,
    selected: false}, 

    {name: 'Yuffie', 
    portrait: 'images/Yuffie.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false}, 

    {name: 'Cait Sith', 
    portrait: 'images/Cait Sith.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false},

    {name: 'Vincent', 
    portrait: 'images/Vincent.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false}, 

    {name: 'Cid', 
    portrait: 'images/Cid.jpeg', 
    level: 7, 
    maxHP: 345,
    maxMP: 160,
    selected: false}
]

function displayPartyMembers() {
    console.log("Active Party: ")
    console.table(activeParty)
    console.log("Reserve Party: ")
    console.table(reserveParty)
    return true;
}

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

function populateFirstCharacter() {
    portrait1.src = activeParty[0].portrait;
    charName1.innerText = activeParty[0].name;
    charLevel1.innerText = activeParty[0].level;
    charHP1.innerText = ` ${activeParty[0].maxHP}/${activeParty[0].maxHP}`;
    charMP1.innerText = `${activeParty[0].maxMP}/${activeParty[0].maxMP}`;
}

function populateSecondCharacter() {
    portrait2.src = activeParty[1].portrait;
    charName2.innerText = activeParty[1].name;
    charLevel2.innerText = activeParty[1].level;
    charHP2.innerText = ` ${activeParty[1].maxHP}/${activeParty[1].maxHP}`;
    charMP2.innerText = `${activeParty[1].maxMP}/${activeParty[1].maxMP}`;
}

function populateThirdCharacter() {
    portrait3.src = activeParty[2].portrait;
    charName3.innerText = activeParty[2].name;
    charLevel3.innerText = activeParty[2].level;
    charHP3.innerText = ` ${activeParty[2].maxHP}/${activeParty[2].maxHP}`;
    charMP3.innerText = `${activeParty[2].maxMP}/${activeParty[2].maxMP}`;
}

function populateReserveParty() {
    reserveParty.forEach((character, index) => {
        let portrait = document.getElementById('reservePortrait' + (index + 1).toString());
        portrait.src = character.portrait;
        
    });
}

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

function swapAndPop(){
    swapPartyMembers();
    populateParty();
}

populateParty();
renderCursorPHS();