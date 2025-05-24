import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Universidad Católica de Pereiraß', () => {
  render(<App />);
  const linkElement = screen.getByText(/¡Universidad Católica de Pereira !/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Listado de integrantes - Proceso de Desarrollo de Software I', () => {
  render(<App />);
  const linkElement = screen.getByText(/Listado de integrantes - Proceso de Desarrollo de Software I/i);
  expect(linkElement).toBeInTheDocument();
});


