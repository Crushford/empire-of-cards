export const CITY_COLORS = ['red', 'lightblue', 'orange', 'pink']

const armies = [
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
]
const cities = [
  { title: 'City Wall', benefit: 'defence', bonus: 1 },
  {
    title: 'Town Hall',
    benefit: 'handCapacity',
    bonus: 1,

    text: 'Benefits: plus 1 to hand capacity'
  },
  {
    title: 'Armory',
    benefit: 'colorAttack',
    bonus: 1
  },
  {
    title: 'Forge',
    benefit: 'colorDefence',
    bonus: 1
  }
]

const makeTeams = category =>
  CITY_COLORS.map(color =>
    category.map((item, index) => ({
      ...item,
      color,
      key: `${item.attack ? 'a' : 'c'}-${color}-${index}`
    }))
  )

const deckWithTeams = [...makeTeams(armies).flat(), ...makeTeams(cities).flat()]

export const deck = deckWithTeams
