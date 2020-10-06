export const CITY_COLORS = ['red', 'lightblue', 'orange', 'pink']

const standardDeckOfCards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

const simpleDeck = {
  cities: standardDeckOfCards
    .map((value, index) => index < 4 && { title: value })
    .filter(card => !!card.title),
  armies: standardDeckOfCards
    .map(
      (value, index) =>
        index > 4 && { title: value, attack: index + 1, defence: index + 1 }
    )
    .filter(card => !!card.title)
}

const normalDeck = {
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
    { title: 'Cathedral' },
    {
      title: 'Town Hall'
    },
    {
      title: 'Market'
    },
    {
      title: 'Barracks'
    }
  ]
}

const complexDeck = {
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
    { title: 'City Wall', benefit: 'cityDefence', bonus: 1 },
    {
      title: 'Town Hall',
      benefit: 'handCapacity',
      bonus: 1,
      text: 'Benefits: plus 1 to hand capacity'
    },
    {
      title: 'Barracks',
      benefit: 'colorAttack',
      bonus: 1
    },
    {
      title: 'Battel Academy',
      benefit: 'colorDefence',
      bonus: 1
    }
  ]
}

const makeTeams = category =>
  CITY_COLORS.map(color =>
    category.map((item, index) => ({
      ...item,
      color,
      id: `${item.attack ? 'a' : 'c'}-${color}-${index}`
    }))
  )

export const getDeck = complexity => {
  switch (complexity) {
    case 'simple':
      // work around for lack of Array.flat()
      return [].concat(
        ...makeTeams(simpleDeck.armies),
        ...makeTeams(simpleDeck.cities)
      )
    case 'complex':
      return [
        ...makeTeams(complexDeck.armies).flat(),
        ...makeTeams(complexDeck.cities).flat()
      ]

    default:
      return [].concat(
        ...makeTeams(normalDeck.armies),
        ...makeTeams(normalDeck.cities)
      )
  }
}

export const deck = getDeck('')
