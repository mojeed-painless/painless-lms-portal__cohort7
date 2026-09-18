import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { fetchJson } from './apiClient';

describe('apiClient (fetchJson)', () => {
  it('returns JSON data on successful HTTP request', async () => {
    const data = await fetchJson('/assignments');
    expect(Array.isArray(data)).toBe(true);
  });

  it('throws structured Error object on 400/500 HTTP status', async () => {
    server.use(
      http.get('*/api/error-test', () => {
        return HttpResponse.json({ message: 'Bad Request' }, { status: 400 });
      })
    );

    await expect(fetchJson('/error-test')).rejects.toThrow('Bad Request');
  });
});
