import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
describe('Testar renderização da página Ranking  ', () => {
  const newRanking = [
    { name: 'nome_da_pessoa', score: 10, picture: 'url_da_foto_no_gravatar' }
  ]
  global.localStorage.setItem('ranking', JSON.stringify(newRanking))
  test('Verificar se a página de Ranking contém heading `h1` com o texto `Ranking`.', () => {
    renderWithRouterAndRedux(<App />, '', '/ranking');
    expect(screen.getByRole('heading', { name: /ranking/i, level: 1 })).toBeInTheDocument();
  });
  test('Verificar se a aplicação contém botão, "Play"', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', {
      name: /play/i
    });;
    expect(playBtn).toBeInTheDocument();
  });
  test('Verificar se a página Ranking renderiza na rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  })
  test(`Verificar se ao clicar no botão "Play",
       é feito o redirecionamento da aplicação para a página Login. `, () => {
    const { history } = renderWithRouterAndRedux(<App />, '', '/ranking');
    const playBtnLogin = screen.getByRole('button', { name: /play/i });
    userEvent.click(playBtnLogin);
    expect(history.location.pathname).toBe('/');
  });
}); 