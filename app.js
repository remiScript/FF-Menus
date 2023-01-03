
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


let active = [
    {name: 'Cloud', level: 7, selected: true}, 
    {name: 'Tifa', level: 7, selected: false}, 
    {name: 'Barret', level: 7, selected: false}
]

let reserve = [
    {name: 'Squall', level: 7, selected: true}, 
    {name: 'Zell', level: 7, selected: false}, 
    {name: 'Irvine', level: 7, selected: false}, 
    {name: 'Edea', level: 7, selected: false}
]

// swapping out a party member, cloud for squall
let activeSwap = active.findIndex(partyMember => active.selected === true);
active.splice(activeSwap, 1);
