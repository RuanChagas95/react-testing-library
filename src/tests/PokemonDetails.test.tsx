import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const route = '/pokemon/25';
  it('É exibido na tela um h2 com o texto Details', () => {
    renderWithRouter(<App />, { route });

    screen.getByRole('heading', { level: 2, name: /Pikachu Details/i });
  });
  it('É exibido na tela um h2 com o texto Summary', () => {
    renderWithRouter(<App />, { route });

    screen.getByRole('heading', { level: 2, name: /Summary/i });
  });
  it('O Sumário é exibido corretamente na tela', () => {
    renderWithRouter(<App />, { route });

    screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
  });
  it('É exibido na tela um h2 com o texto Game Locations of Pikachu', () => {
    renderWithRouter(<App />, { route });
    screen.getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
  });
  it('São exibidas na tela imagens de localização com o src correto', () => {
    renderWithRouter(<App />, { route });
    const image = screen.getAllByAltText(/Pikachu location/i);
    expect(image).toHaveLength(2);
    expect(image[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('É exibido na tela uma label com o texto Pokémon favoritado?', async () => {
    renderWithRouter(<App />, { route });
    screen.getByText(/Pokémon favoritado\?/i);
  });
  it('Checkbox checked renderiza a imagem de favorito', async () => {
    const { queryByAltText, user } = renderWithRouter(<App />, { route });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    expect(queryByAltText(/Pikachu is marked as favorite/i)).not.toBeInTheDocument();
    await user.click(checkbox);
    screen.getByAltText(/Pikachu is marked as favorite/i);
  });
});
