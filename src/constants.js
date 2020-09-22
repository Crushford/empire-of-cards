export const CITY_COLORS = ['red', 'lightblue', 'orange', 'pink']

export const deck = {
  armies: [
    {
      title: 'Catapult',
      attack: 9,
      defence: 1,
      imageUrl:
        'https://cdn.britannica.com/34/83934-050-4787BA22/Roman-torsion-arm-stone-bundle-cords-force.jpg'
    },
    { title: 'Armored Knight', attack: 5, defence: 9 },
    { title: 'Archer', attack: 8, defence: 4 },
    { title: 'Warrior', attack: 4, defence: 4 },
    { title: 'Horseman', attack: 7, defence: 4 },
    { title: 'Axeman', attack: 4, defence: 5 },
    { title: 'Pikeman', attack: 5, defence: 8 },
    { title: 'Mounted knight', attack: 9, defence: 6 }
  ],
  cities: [
    { title: 'City Wall', benefit: 'defence', bonus: 1, color: CITY_COLORS[0] },
    {
      title: 'Town Hall',
      benefit: 'handCapacity',
      bonus: 1,
      color: CITY_COLORS[0]
    },
    {
      title: 'Armory',
      benefit: 'colorAttack',
      bonus: 1,
      color: CITY_COLORS[0]
    },
    {
      title: 'Forge',
      benefit: 'colorDefence',
      bonus: 1,
      color: CITY_COLORS[0]
    },
    { title: 'City Wall', benefit: 'defence', bonus: 1, color: CITY_COLORS[1] },
    {
      title: 'Town Hall',
      benefit: 'handCapacity',
      bonus: 1,
      color: CITY_COLORS[1]
    },
    {
      title: 'Armory',
      benefit: 'colorAttack',
      bonus: 1,
      color: CITY_COLORS[1]
    },
    {
      title: 'Forge',
      benefit: 'colorDefence',
      bonus: 1,
      color: CITY_COLORS[1]
    },
    { title: 'City Wall', benefit: 'defence', bonus: 1, color: CITY_COLORS[2] },
    {
      title: 'Town Hall',
      benefit: 'handCapacity',
      bonus: 1,
      color: CITY_COLORS[2]
    },
    {
      title: 'Armory',
      benefit: 'colorAttack',
      bonus: 1,
      color: CITY_COLORS[2]
    },
    {
      title: 'Forge',
      benefit: 'colorDefence',
      bonus: 1,
      color: CITY_COLORS[2]
    },
    { title: 'City Wall', benefit: 'defence', bonus: 1, color: CITY_COLORS[3] },
    {
      title: 'Town Hall',
      benefit: 'handCapacity',
      bonus: 1,
      color: CITY_COLORS[4]
    },
    {
      title: 'Armory',
      benefit: 'colorAttack',
      bonus: 1,
      color: CITY_COLORS[4]
    },
    {
      title: 'Forge',
      benefit: 'colorDefence',
      bonus: 1,
      color: CITY_COLORS[4]
    }
  ],
  monuments: [],
  specialisms: []
}
