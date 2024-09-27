import { server } from './mock-handlers';
import { afterAll, beforeAll, afterEach } from 'vitest';
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
