import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

it('A página contém um h2 com o \'texto Encoutered Pokémon\'', () => {
  renderWithRouter(<App />);
  screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
});

it('Ao clickar no botão o próximo pokémon da lista deve ser mostrado', async () => {
  renderWithRouter(<App />);
  const button = screen.getByRole('button', { name: /Próximo pokémon/i });
  screen.getByText(/pikachu/i);
  await userEvent.click(button);
  screen.getByText(/charmander/i);
});
