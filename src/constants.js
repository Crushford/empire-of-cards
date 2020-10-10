export const CITY_COLORS = [
  'lightgreen',
  'lightblue',
  'orange',
  'pink',
  'lightbrown'
]

// const standardDeckOfCards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

// const simpleDeck = {
//   cities: standardDeckOfCards
//     .map((value, index) => index < 4 && { title: value })
//     .filter(card => !!card.title),
//   armies: standardDeckOfCards
//     .map(
//       (value, index) =>
//         index > 4 && { title: value, attack: index + 1, defence: index + 1 }
//     )
//     .filter(card => !!card.title)
// }

const simpleDeck = {
  armies: [
    {
      title: '1',
      attack: 1,
      defence: 1,
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/11/11/16/24/knight-2939429_960_720.png'
    },
    {
      title: '2',
      attack: 2,
      defence: 2,
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/11/11/16/24/knight-2939429_960_720.png'
    },
    {
      title: '3',
      attack: 3,
      defence: 3,
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/11/11/16/24/knight-2939429_960_720.png'
    },
    {
      title: '4',
      attack: 4,
      defence: 4,
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/11/11/16/24/knight-2939429_960_720.png'
    },
    {
      title: '5',
      attack: 5,
      defence: 5,
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/11/11/16/24/knight-2939429_960_720.png'
    },
    {
      title: '6',
      attack: 6,
      defence: 6,
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/11/11/16/24/knight-2939429_960_720.png'
    },
    {
      title: '7',
      attack: 7,
      defence: 7,
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/11/11/16/24/knight-2939429_960_720.png'
    }
  ],
  cities: [
    {
      title: 'Cathedral',
      imageUrl:
        'https://cdn.pixabay.com/photo/2018/02/20/11/57/house-3167461_960_720.png'
    },
    {
      title: 'Town Hall',
      imageUrl:
        'https://cdn.pixabay.com/photo/2018/02/20/12/00/house-3167469_960_720.png'
    },
    {
      title: 'Market',
      imageUrl:
        'https://cdn.pixabay.com/photo/2018/02/18/14/24/house-3162387_960_720.png'
    },
    {
      title: 'Barracks',
      imageUrl:
        'https://cdn.pixabay.com/photo/2018/02/18/14/13/house-3162364_960_720.png'
    }
  ]
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
    category.map((item, index) => {
      let isBattleCard = !!item.attack

      return {
        ...item,
        color: isBattleCard ? 'red' : color,
        id: `${isBattleCard ? 'a' : 'c'}-${color}-${index}`
      }
    })
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
