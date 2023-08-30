import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Easy from '../(levels)/easy/page'; // Assuming this is the file containing your component

test('Game initializes and resets correctly', async () => {
  // Render the component
  render(<Easy/>);

  // Verify that the game initializes correctly by checking for an initial state
  const initialMovesText = screen.getByText(/Moves - 0/i);
  expect(initialMovesText).toBeInTheDocument();

  // Click on the reset button to start the game
  const resetButton = screen.getByText(/Reset/i);
  fireEvent.click(resetButton);

  // Verify that the game board renders after the reset
  const cards = await screen.findAllByRole('button', { name: /card/i });
  expect(cards.length).toBeGreaterThan(0);

  // Simulate clicking on a card
  const firstCard = cards[0];
  fireEvent.click(firstCard);

  // Verify that the card flips and moves count increases
  const flippedCard = await screen.findByTestId('flipped-card');
  const updatedMovesText = screen.getByText(/Moves - 1/i);
  expect(flippedCard).toBeInTheDocument();
  expect(updatedMovesText).toBeInTheDocument();
});
