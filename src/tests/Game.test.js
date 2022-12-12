import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../../src/App';
import { questionsResponse } from './helpers/questions';

const PLAYER_NAME = 'Trybe';
const PLAYER_EMAIL = 'trybe@trybe.com';
const tokenResponse = {
  "response_code": 0,
  "response_message": "Token Generated Successfully!",
  "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
};

describe('Testando o componente Feedback.js', () => {
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

      const ptsText = screen.getByRole('heading', { name: /0/i, level: 5 });
      expect(ptsText).toBeInTheDocument();
      const nameHeader = screen.queryByRole('heading', { name: /jogo/i,level: 1 });
      expect(nameHeader).toBeInTheDocument();
      const jogoText = screen.queryByRole('heading', { name: /Trybe/i, level: 3 });
      expect(jogoText).toBeInTheDocument();

      const questionText = screen.getByText(/Geography/i);
      expect(questionText).toBeInTheDocument();
      const falseButton = screen.getByRole('button', { name: /False/i });
      setTimeout(()=>userEvent.click(falseButton), 1000);

    });

    test('Testando se ao entrar na página "Feedback", estamos '
    + 'no caminho "/feedback"', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/game');
      await waitFor(() => {
        expect(history.location.pathname).toBe('/game');
      })

      const timeText = screen.getByText(/30/i);
      expect(timeText).toBeInTheDocument();
      const ptsText = screen.getByRole('heading', { name: /0/i, level: 5 });
      expect(ptsText).toBeInTheDocument();
      const questionText = screen.getByText(/Geography/i);
      expect(questionText).toBeInTheDocument();
      const falseButton = screen.getByRole('button', { name: /False/i });
      userEvent.click(falseButton);
      const nextButton = screen.getByRole('button', { name: /next/i });
      userEvent.click(nextButton);
      setTimeout(()=>{
        const ptsText2 = screen.getByRole('heading', { name: /30/i, level: 5 });
        expect(ptsText2).toBeInTheDocument();
      }, 1000);
      const questionText2 = screen.getByText(/Science & Nature/i);
      expect(questionText2).toBeInTheDocument();
      const correctButton = screen.getByRole('button', { name: /Graviton/i });
      userEvent.click(correctButton);
      setTimeout(()=>{
        const ptsText3 = screen.getByRole('heading', { name: /100/i, level: 5 });
        expect(ptsText3).toBeInTheDocument();
      }, 1000);
      userEvent.click(nextButton);
      const timeText2 = screen.getByText(/30/i);
      expect(timeText2).toBeInTheDocument();
      setTimeout(()=>{
        const timeText3 = screen.getByText(/10/i);
        expect(timeText3).toBeInTheDocument();
      }, 2000);
    });

});