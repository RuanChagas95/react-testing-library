import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O topo da aplicação contém o links Home', () => {
    renderWithRouter(
      <App />,
    );
    screen.getByRole('link', { name: /Home/i });
  });
  it('O topo da aplicação contém o link About', () => {
    renderWithRouter(
      <App />,
    );
    screen.getByRole('link', { name: /About/i });
  });
  it('O topo da aplicação contém o link Favorite Pokémon', () => {
    renderWithRouter(
      <App />,
    );
    screen.getByRole('link', { name: /Favorite Pokémon/i });
  });
});

it('Renderiza a página inicial', () => {
  renderWithRouter(
    <App />,
  );
  screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
});

describe('Links da barra de navegação redirecionam para o lugar correto', () => {
  it('Redireciona para About', async () => {
    renderWithRouter(
      <App />,
    );
    await userEvent.click(screen.getByRole('link', { name: /About/i }));
    screen.getByRole('heading', { name: /about pokédex/i });
  });

  it('Redireciona para a página favorites', async () => {
    renderWithRouter(
      <App />,
    );
    await userEvent.click(screen.getByRole('link', { name: /favorite pokémon/i }));

    screen.getByRole('heading', { name: /favorite pokémon/i });
  });

  it('Redireciona para a página inicial', async () => {
    renderWithRouter(
      <App />,
    );
    await userEvent.click(screen.getByRole('link', { name: /Home/i }));
    screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
  });
});
