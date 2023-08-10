import { render, screen } from '@testing-library/react';
import { About } from '../pages';

it('A página um h3 com o texto What does this app do?', () => {
  const h3text = 'What does this app do?';
  render(<About />);
  screen.getByRole('heading', { level: 3, name: h3text });
});
it('A página contém um heading h2 com o texto About Pokédex', () => {
  const h2Text = 'About Pokédex';
  render(<About />);
  screen.getByRole('heading', { level: 2, name: h2Text });
});

it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const p1text = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.';
  const p2text = 'One can filter Pokémon by type, and see more details for each one of them.';
  render(<About />);
  screen.getByText(p1text);
  screen.getByText(p2text);
});

it('A página contém a imagem correta de uma Pokédex', () => {
  render(<About />);
  const img = screen.getByRole('img', { name: /pokédex/i });
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
