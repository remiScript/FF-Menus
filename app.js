
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
}



setInterval(formatTime, 1000);


let activeParty = [
    {name: 'Cloud', level: 7, selected: false}, 
    {name: 'Tifa', level: 7, selected: false}, 
    {name: 'Barret', level: 7, selected: true}
]

let reserveParty = [
    {name: 'Squall', level: 7, selected: true}, 
    {name: 'Zell', level: 7, selected: false}, 
    {name: 'Irvine', level: 7, selected: false}, 
    {name: 'Edea', level: 7, selected: false}
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

