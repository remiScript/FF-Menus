let activeParty = [
    {name: 'Cloud', level: 7, selected: 'true'}, 
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
let activeSwap = activeParty.findIndex(partyMember => partyMember.selected === 'true');
console.log(activeSwap);
activeParty.splice(activeSwap, 1);
console.log('updated!')