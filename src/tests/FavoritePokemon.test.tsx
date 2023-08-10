import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('É exibida na tela a mensagem \'No favorite Pokémon found\' caso a pessoa não tenha Pokémon favorito.', () => {
  render(<FavoritePokemon />);
  screen.getByText(/No favorite Pokémon found/i);
});

it('É exibido somente o card do pikachu ao favorita-lo.', async () => {
  renderWithRouter(<App />);
  const detailsBtn = screen.getByRole('link', { name: /more details/i });
  const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
  await userEvent.click(detailsBtn);
  await userEvent.click(screen.getByText(/pokémon favoritado\?/i));
  await userEvent.click(favoriteLink);
  screen.getByText(/pikachu/i);
  screen.getByText(/more details/i);
  screen.findByText(/No favorite Pokémon found/i).then((notFound) => {
    expect(notFound).not.toBeInTheDocument();
  });
});
it('Ao favoritar pikachu e charmander eles são exibidos na página de favoritos', async () => {
  renderWithRouter(<App />);
  const detailsBtn = screen.getByRole('link', { name: /more details/i });
  const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
  const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
  await userEvent.click(nextBtn);
  await userEvent.click(detailsBtn);
  await userEvent.click(screen.getByText(/pokémon favoritado\?/i));
  await userEvent.click(favoriteLink);
  screen.findByText(/No favorite Pokémon found/i).then((notFound) => {
    expect(notFound).not.toBeInTheDocument();
  });
  screen.getByText(/pikachu/i);
  screen.getByText(/Charmander/i);
});
