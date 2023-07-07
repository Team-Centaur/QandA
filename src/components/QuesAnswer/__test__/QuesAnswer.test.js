import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mockCurrContet from '../../../../__mocks__/contextMocks/mockCurrContet';
import QuesAnswer from '../QuesAnswer.jsx';

const currItemMock = {
  "id": 40439,
  "campus": "hr-rfp",
  "name": "Susanna Heels",
  "slogan": "Nobis rerum et quibusdam provident veniam.",
  "description": "Laudantium dolores rem non fugiat in eum rerum quae. Eveniet aut labore aut ut. Quaerat ut debitis velit maxime ut itaque libero rerum. Quaerat suscipit tempore at optio quia ut cum error. Sed et dolorem placeat nihil. Reiciendis est deserunt veritatis provident.",
  "category": "Heels",
  "default_price": "823.00",
  "created_at": "2021-08-13T14:38:44.588Z",
  "updated_at": "2021-08-13T14:38:44.588Z"
};

beforeEach(async () => {
  render(<QuesAnswer product={currItemMock} />);
});

describe('QuesAnswer component', () => {
  test('loads QuesAnswer component', async () => {
    const component = await screen.findByTestId('quesAnswerComponent');
    expect(component).toHaveClass('ques-ans-main');
  });

  test('loads Search component', async () => {
    const component = await screen.findByTestId('qaSearchTest');
    expect(component).toBeInTheDocument();
  });

  test('loads Question component', async () => {
    const component = await screen.findAllByTestId('qaQuestionTest');
    expect(component[0]).toHaveClass('question');
  });

  test('loads Ask a Question button', async () => {
    const component = await screen.findByRole('button', {name: "Ask A Question"});
    expect(component).toBeInTheDocument();
  });
});
