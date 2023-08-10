import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('É renderizado um card com as informações de determinado Pokémon:', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    screen.getByTestId('pokemon-name');
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');
  });
  it('O peso médio do pokémon deve ser exibido`;', () => {
    renderWithRouter(<App />);
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  });
  it('O link More details deve possuir o destino correto', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toHaveAttribute('href', '/pokemon/25');
  });
});

it('A imagem do Pokémon deve ser exibida', () => {
  renderWithRouter(<App />);
  const image = screen.getByRole('img');
  expect(image).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  expect(image).toHaveAttribute('alt', 'Pikachu sprite');
});
it('A imagem de favorito é exibida corretamente', async () => {
  const { queryByAltText } = renderWithRouter(<App />, { route: '/pokemon/25' });
  const favoritCheckbox = screen.getByText(/pokémon favoritado\?/i);
  const favoriteNull = queryByAltText(/pikachu is marked as favorite/i);
  expect(favoriteNull).not.toBeInTheDocument();
  await userEvent.click(favoritCheckbox);
  const favoriteIco = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favoriteIco).toHaveAttribute('src', '/star-icon.png');
});
