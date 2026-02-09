// setup.ts - Versão corrigida
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi, beforeEach } from "vitest";

// Limpa após cada teste
afterEach(() => {
  cleanup();
});

// Implementação real do localStorage para testes
const localStorageData: Record<string, string> = {};

const localStorageMock = {
  getItem: vi.fn((key: string) => localStorageData[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageData[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageData[key];
  }),
  clear: vi.fn(() => {
    for (const key in localStorageData) {
      delete localStorageData[key];
    }
  }),
  get length() {
    return Object.keys(localStorageData).length;
  },
  key: vi.fn((index: number) => {
    const keys = Object.keys(localStorageData);
    return keys[index] || null;
  }),
};

// Limpa antes de cada teste
beforeEach(() => {
  for (const key in localStorageData) {
    delete localStorageData[key];
  }
});

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Mock do matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
