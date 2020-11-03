import React from 'react'
import styled from 'styled-components'

export const HowToPlayContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  text-align: center;
`

export const HowToPlayTitle = styled.h1`
  align-self: 'center';
`

export const HowToPlay = () => {
  return (
    <HowToPlayContainer>
      <HowToPlayTitle>How to Play!</HowToPlayTitle>
      <p>
        The aim of the game is to collect 2 full sets of city cards in your
        empire. There are 4 sets available
      </p>
      <p>
        You can collect city cards in 2 ways:
        <ol>
          <li>
            Move a city from your hand to your empire by clicking on the ciy,
            then clicking in the space on the right of your city.
          </li>
          <li>
            Attack another player's empire with your battle cards. Battle cards
            have attack and defence values written on them. To attack, click
            your battle card to select it, then click the city you wish to
            attack
          </li>
        </ol>
      </p>
      <p>
        When attacking, the attacking card is placed face down in the attack
        square. The attacked player can then defend using one of their battle
        cards, if the attacking card's attack value is higher than the defending
        card's defence value, the city will be moved into the attacking player's
        hand.
        <br />
        To defend, click on the army card you wish to defend with to select it,
        then click on the defence square
      </p>
      <p>
        At the start of a new round, you must discard the cards left in your
        hand and pick up new cards. The round ends by either:
        <ul>
          <li>No players have any cards left in their hand</li>
          <li>Every player passes</li>
        </ul>
      </p>
      <p>
        Each city has a special advantage given to the player who has the city
        in their empire. A description of the advantages is printed on each city
        card
      </p>
      <p>
        If you run out of battle cards and you are attacked, you have no other
        option other than to not defend. To preserve your battle cards within
        the round, you can pass your turn. However, as mentioned above, if every
        player passes, a new round will begin and you'll have to discard all of
        the cards in your hand.
      </p>
    </HowToPlayContainer>
  )
}
