import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../../src/App';

describe('Testando o componente App.js', () => {
  test('Testando se ao entrar na página inicial estamos '
    + 'no caminho "/"', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });

  test('Testando se a aplicação contém a Logo TRIVIA.', () => {
    renderWithRouterAndRedux(<App />);
    const imgTrivia = screen.getByRole('img', { name: /logo/, src: "/static/media/trivia" });

    expect(imgTrivia).toBeInTheDocument();

  });

  test('Testando se a aplicação contém um input para o nome.', () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByRole('textbox', {
      name: /name/i
    });

    expect(nameInput).toBeInTheDocument();

  });

  test('Testando se a aplicação contém um input para o email.', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', {
      name: /email/i
    });

    expect(emailInput).toBeInTheDocument();

  });

  test('Testando se a aplicação contém dois botoes, "PLAY" e "Configurações".', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', {
      name: /play/i
    });;
    const configButton = screen.getByRole('button', {
      name: /configurações/i
    });

    expect(playButton).toBeInTheDocument();
    // expect(playButton).toBe('be.disabled');
    expect(configButton).toBeInTheDocument();

  });

  test('Testando se ao clicar no botao "PLAY" sem um email valido, a pagian nao sai da home.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const playButton = screen.getByRole('button', {
      name: /play/i
    });;
    expect(playButton).toBeInTheDocument();
    // expect(playButton).toBe('be.disabled');
    userEvent.click(playButton);

    expect(pathname).toBe('/');
  });

  test('Testando se ao clicar no botao "PLAY" com emails invalidos, a pagina continua em home.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', {
      name: /email/i
    });
    const namelInput = screen.getByRole('textbox', {
      name: /name/i
    });
    const playButton = screen.getByRole('button', {
      name: /play/i
    });
    expect(namelInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    userEvent.type(namelInput, 'Trybe');
    userEvent.type(emailInput, 'trybe.com');
    userEvent.click(playButton);

    userEvent.type(emailInput, '{del}trybe.com');
    userEvent.type(emailInput, 'trybe@trybe');
    userEvent.click(playButton);

    userEvent.type(emailInput, '{del}trybe@trybe');
    userEvent.type(emailInput, 'trybe');
    userEvent.click(playButton);

    const gameText = screen.queryByRole('heading', {
      name: /jogo/i
    });
    expect(gameText).not.toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

  });

  test('Testando se ao clicar no botao "PLAY" com email valido, a pagina avanca para "GAME".', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const namelInput = screen.getByRole('textbox', { name: /name/i });
    expect(namelInput).toBeInTheDocument();

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    expect(emailInput).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();

    userEvent.type(namelInput, 'Trybe');
    userEvent.type(emailInput, 'trybe@trybe.com');
    // expect(playButton).toBe('not.be.disabled')
    userEvent.click(playButton);

    const gameText = screen.queryByRole('heading', { name: /jogo/i, level: 1 });
    expect(gameText).not.toBeInTheDocument();

    const imgAvatar = screen.queryByRole('img', {
      name: /avatar do usuário/i
    });
    expect(imgAvatar).not.toBeInTheDocument();
    setTimeout(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/game');
    }, 3000)


  });


  test('Testando se ao clicar no botao "Configurações" vamos ser '
    + 'redirecionado para a página Configurações', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const configButton = screen.getByRole('button', {
        name: /configurações/i
      });
      userEvent.click(configButton);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/settings');
    });

});