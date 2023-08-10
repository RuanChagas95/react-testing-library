import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('NotFound tests', () => {
  it('Existe um h2 com o texto \'Page requested not found\'', () => {
    render(<NotFound />);
    screen.getByRole('heading', { level: 2, name: /Page requested not found/i });
  });

  it('Existe uma imagem com o atributo src contendo o valor \'/404.gif\'', () => {
    render(<NotFound />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/404.gif');
  });
});
