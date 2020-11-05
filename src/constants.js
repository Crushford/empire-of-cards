export const CITY_COLORS = [
  'lightgreen',
  'lightblue',
  'orange',
  'plum',
  'yellow',
  'lightgrey',
  'hotpink'
]

export const PLAYER_COLORS = ['blue', 'red', 'brown', 'green']

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
      imageUrl: 'https://freesvg.org/img/liftarn-Catapult.png'
    },
    {
      title: 'Archer',
      attack: 8,
      defence: 4,
      imageUrl: 'https://freesvg.org/storage/img/thumb/bow-and-arrow-2.png'
    },
    {
      title: 'Knight',
      attack: 5,
      defence: 9,
      imageUrl: 'https://freesvg.org/storage/img/thumb/medieval-knight.png'
    },
    {
      title: 'Mounted Knight',
      attack: 9,
      defence: 6,
      imageUrl: 'https://freesvg.org/storage/img/thumb/KnightHorseback4.png'
    },
    {
      title: 'Warrior',
      attack: 4,
      defence: 4,
      imageUrl: 'https://freesvg.org/img/nello-sword.png'
    },
    {
      title: 'Horseman',
      attack: 7,
      defence: 4,
      imageUrl: 'https://freesvg.org/storage/img/thumb/Horse-Silhouette.png'
    },
    {
      title: 'Ship',
      attack: 4,
      defence: 5,
      imageUrl:
        'https://cdn1.vectorstock.com/i/1000x1000/47/50/ancient-ship-icon-simple-style-vector-20314750.jpg'
    },
    {
      title: 'Trireme',
      attack: 5,
      defence: 8,
      imageUrl:
        'https://thumbs.dreamstime.com/b/trireme-floating-sea-waves-intage-engraving-illustration-hand-drawn-design-element-sailing-ship-vintage-color-poster-90311288.jpg'
    }
  ],
  cities: [
    {
      title: 'City Wall',
      benefit: 'cityDefence',
      text: `Plus one defence for all cities you control in this same color`
    },
    {
      title: 'Town Hall',
      benefit: 'handCapacity',
      text: `At the start of the round you can pick up one extra card for each Town Hall you control`
    },
    {
      title: 'Market',
      benefit: 'retentionCapacity',
      text: `You may retain 1 card at the end of the round for each Market you control`
    },
    {
      title: 'Barracks',
      benefit: 'specialization'
    }
  ]
}

const barracksSpecializations = [
  {
    title: 'Barracks - Naval',
    specialization: ['Ship', 'Trireme'],
    text: `Plus one attack to Ships and Triremes`
  },
  {
    title: 'Barracks - Knights',
    specialization: ['Mounted Knight', 'Knight'],
    text: `Plus one attack to Knight and Mounted Knights`
  },
  {
    title: 'Barracks - Melee',
    specialization: ['Warrior', 'Horseman'],
    text: `Plus one attack to Warriors and Horsemen`
  },
  {
    title: 'Barracks - Projectiles',
    specialization: ['Catapult', 'Archer'],
    text: `Plus one attack to Archers and Catapults`
  }
]

const makeTeams = ({ category, numberOfPlayers = 4, isComplex }) => {
  const numberOfColorsToPlayWith = isComplex ? 4 : numberOfPlayers + 5
  const colors = CITY_COLORS.slice(0, numberOfColorsToPlayWith)

  return colors.map((color, colorIndex) =>
    category.map((item, index) => {
      let isBattleCard = !!item.attack

      const card = {
        ...item,
        color: isBattleCard ? 'red' : color,
        id: `${isBattleCard ? 'a' : 'c'}-${color}-${index}`
      }

      if (!isComplex || !item.title.includes('Barracks')) {
        return card
      }

      return {
        ...barracksSpecializations[colorIndex],
        ...card
      }
    })
  )
}

export const getDeck = (complexity, numberOfPlayers) => {
  switch (complexity) {
    case 'simple':
      // work around for lack of Array.flat()
      return [].concat(
        ...makeTeams({ category: simpleDeck.armies, numberOfPlayers }),
        ...makeTeams({ category: simpleDeck.cities, numberOfPlayers })
      )

    default:
      return [].concat(
        ...makeTeams({ category: normalDeck.armies, isComplex: true }),
        ...makeTeams({ category: normalDeck.cities, isComplex: true })
      )
  }
}

export const deck = getDeck('')
