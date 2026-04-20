const axios = require('axios');

// Mock axios BEFORE requiring the app
jest.mock('axios', () => {
  const mockAxiosInstance = {
    post: jest.fn(),
    get: jest.fn(),
  };
  return {
    create: jest.fn(() => mockAxiosInstance),
    post: jest.fn(),
    get: jest.fn(),
  };
});

const request = require('supertest');
const app = require('./index');

describe('Server API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/prompt should return responses from AI models', async () => {
    const mockAxiosInstance = axios.create();
    
    // Mocking the responses for OpenAI, Anthropic, Gemini, and then the synthesis OpenAI call
    mockAxiosInstance.post
      .mockResolvedValueOnce({ data: { choices: [{ message: { content: 'ChatGPT response' } }] } }) // ChatGPT
      .mockResolvedValueOnce({ data: { content: [{ text: 'Claude response' }] } }) // Claude
      .mockResolvedValueOnce({ data: { candidates: [{ content: { parts: [{ text: 'Gemini response' }] } }] } }) // Gemini
      .mockResolvedValueOnce({ data: { choices: [{ message: { content: 'Similarities list' } }] } }); // Synthesis

    const response = await request(app)
      .post('/api/prompt')
      .send({ prompt: 'Hello AI' });

    expect(response.status).toBe(200);
    expect(response.body.responses).toEqual({
      chatGPT: 'ChatGPT response',
      claude: 'Claude response',
      gemini: 'Gemini response',
    });
    expect(response.body.similarities).toBe('Similarities list');
  });

  test('POST /api/prompt should handle AI model failures gracefully', async () => {
    const mockAxiosInstance = axios.create();
    
    // ChatGPT succeeds, but others fail
    mockAxiosInstance.post
      .mockResolvedValueOnce({ data: { choices: [{ message: { content: 'ChatGPT response' } }] } }) // ChatGPT
      .mockRejectedValueOnce({ response: { data: { error: { message: 'Claude failed' } } } }) // Claude
      .mockRejectedValueOnce(new Error('Gemini network error')) // Gemini
      .mockResolvedValueOnce({ data: { choices: [{ message: { content: 'Similarities list' } }] } }); // Synthesis - wait, if only 1 succeeds, it shouldn't call synthesis

    const response = await request(app)
      .post('/api/prompt')
      .send({ prompt: 'Hello AI' });

    expect(response.status).toBe(200);
    expect(response.body.responses.chatGPT).toBe('ChatGPT response');
    expect(response.body.responses.claude).toContain('Error: Claude failed');
    expect(response.body.responses.gemini).toContain('Error: Gemini network error');
    expect(response.body.similarities).toBe('Need at least two successful model responses to synthesize similarities.');
  });

  test('GET /api/history without token should return 401', async () => {
    const response = await request(app).get('/api/history');
    expect(response.status).toBe(401);
  });
});
