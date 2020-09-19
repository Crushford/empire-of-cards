export const deck = {
  armies: [
    { title: 'Catapult', attack: 9, defence: 1 },
    { title: 'Armored Knight', attack: 5, defence: 9 },
    { title: 'Archer', attack: 8, defence: 4 },
    { title: 'Warrior', attack: 4, defence: 4 },
    { title: 'Horseman', attack: 7, defence: 4 },
    { title: 'Axeman', attack: 4, defence: 5 },
    { title: 'Pikeman', attack: 5, defence: 8 },
    { title: 'Mounted knight', attack: 9, defence: 6 }
  ],
  cities: [
    { title: 'Wall', benefit: 'defence', bonus: 1 },
    { title: 'Town Hall', benefit: 'handCapacity', bonus: 1 },
    { title: 'Monument Space', benefit: 'monumentCapacity', bonus: 1 },
    { title: 'University', benefit: 'specialismCapacity', bonus: 1 }
  ],
  monuments: [],
  specialisms: []
}

export const cityColor = ['red', 'blue', 'orange', 'purple']
