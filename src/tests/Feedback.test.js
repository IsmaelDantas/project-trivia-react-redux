import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../../src/App';
import { questionsResponse } from './helpers/questions';

const PLAYER_NAME = 'Trybe';
const PLAYER_EMAIL = 'trybe@trybe.com';
const tokenResponse = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
};

describe('Testando o componente Feedback.js', () => {

  test('Testando se ao entrar na página "Feedback", estamos '
    + 'no caminho "/feedback"', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/feedback');
      const { location: { pathname } } = history;
      expect(pathname).toBe('/feedback');

      const avatarUsuario = screen.getByRole('img', {
        name: /avatar do usuário/i
      });
      expect(avatarUsuario).toBeInTheDocument();

      const pontosUsuario = screen.getByRole('heading', { level: 2 });
      expect(pontosUsuario).toBeInTheDocument();

      const feedbackText = screen.getByRole('heading', { name: /feedback/i, level: 1 });
      expect(feedbackText).toBeInTheDocument();

      const acertouText = screen.getByText(/você acertouquestões!/i)
      expect(acertouText).toBeInTheDocument();

      const pontosText = screen.getByText(/um total depontos/i)
      expect(pontosText).toBeInTheDocument();
    });

    test('Testando se ao entrar na página "Feedback", estamos '
    + 'no caminho "/feedback"', async () => {

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(tokenResponse)
        .mockResolvedValue(questionsResponse)
      })

      const { history } = renderWithRouterAndRedux(<App />);

      const nameInput = screen.getByRole('textbox', { name: /name/i })
      expect(nameInput).toBeInTheDocument();
      userEvent.type(nameInput, PLAYER_NAME);

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      expect(emailInput).toBeInTheDocument();
      userEvent.type(emailInput, PLAYER_EMAIL);

      const playButton = screen.getByRole('button', { name: /play/i });
      expect(playButton).toBeInTheDocument();
      userEvent.click(playButton);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/game');
      })

      const nameHeader = screen.queryByRole('heading', { level: 3 });
      expect(nameHeader).toBeInTheDocument();
      const jogoText = screen.queryByRole('heading', { name: /jogo/i, level: 1 });
      expect(jogoText).toBeInTheDocument();

      const allChoiseButton = screen.getAllByRole('button')
      userEvent.click(allChoiseButton[0]);
      const nextButton = screen.getByRole('button', { name: /next/i });
      userEvent.click(nextButton);
      userEvent.click(allChoiseButton[0]);
      userEvent.click(nextButton);
      userEvent.click(allChoiseButton[0]);
      userEvent.click(nextButton);
      userEvent.click(allChoiseButton[0]);
      userEvent.click(nextButton);
      userEvent.click(allChoiseButton[0]);
      userEvent.click(nextButton);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/feedback');
      })   

      const avatarUsuario = screen.getByRole('img', {
        name: /avatar do usuário/i
      });
      expect(avatarUsuario).toBeInTheDocument();

      const nameUsuario = screen.getByRole('heading', { level: 3, name: /Trybe/i });
      expect(nameUsuario).toBeInTheDocument();

      const pontosUsuario = screen.getByRole('heading', { level: 2 });
      expect(pontosUsuario).toBeInTheDocument();

      const feedbackText = screen.getByRole('heading', { name: /feedback/i, level: 1 });
      expect(feedbackText).toBeInTheDocument();

      const acertouText = screen.getByText(/você acertouquestões!/i)
      expect(acertouText).toBeInTheDocument();

      const pontosText = screen.getByText(/um total depontos/i)
      expect(pontosText).toBeInTheDocument();
    });

    test('Testando se ao entrar na página "Feedback", existe  '
    + 'um botao "Ranking".', async () => {

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(tokenResponse)
        .mockResolvedValue(questionsResponse)
      })

      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/feedback');

      const rankingButton = screen.getByRole('button', { name: /ranking/i });
      expect(rankingButton).toBeInTheDocument();
      userEvent.click(rankingButton);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/ranking');
      })
    });

    test('Testando se ao entrar na página "Feedback", existe  '
    + 'um botao "Play again".', async () => {

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(tokenResponse)
        .mockResolvedValue(questionsResponse)
      })

      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/feedback');
      await waitFor(() => {
        expect(history.location.pathname).toBe('/feedback');
      })

      const playAgainButton = screen.getByRole('button', { name: /play again/i });
      expect(playAgainButton).toBeInTheDocument();
      userEvent.click(playAgainButton);
      await waitFor(() => {
        expect(history.location.pathname).toBe('/');
      })
    });
});