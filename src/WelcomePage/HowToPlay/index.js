import React from 'react'
import styled from 'styled-components'

export const HowToPlayContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`

export const HowToPlay = () => {
  return (
    <HowToPlayContainer>
      <h1>How to Play!</h1>
      <p>
        The aim of the game is to collect 2 full sets of city cards in your
        empire. There are 5 sets available
      </p>
      <p>
        You can get city cards in 2 ways:
        <ol>
          <li>
            Pick up city card from the deck and on your turn, place them in your
            empire
          </li>
          <li>
            Attack another player's empire with your battle cards. Battle cards
            have attack and defence written on them
          </li>
        </ol>
      </p>
      <p>
        When you attack another player, you place your card face down in the
        attack square. The player you attacked can then defend using one of
        their battle cards, if the attacking card's value is higher than the
        defending card's value, the city will then move into your empire
      </p>
      <p>
        At the start of a new round, you must discard all of the cards left in
        your hand and pick up 5 new card. The round ends by either:
        <ul>
          <li>No players have any cards left in their hand</li>
          <li>Every player passes</li>
        </ul>
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
