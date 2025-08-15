import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    };
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    };
  },
}));

// Mock NextAuth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock Web API globals for Next.js API routes - but don't override if already exists
if (!globalThis.Request) {
  Object.defineProperty(globalThis, 'Request', {
    value: class Request {
      constructor(input, init) {
        this.url = typeof input === 'string' ? input : input.url;
        this.method = init?.method || 'GET';
        this.headers = new Headers(init?.headers);
        this._body = init?.body;
      }
      
      async json() {
        return JSON.parse(this._body);
      }
    },
    configurable: true,
  });
}

Object.defineProperty(globalThis, 'Headers', {
  value: class Headers {
    constructor(init) {
      this._headers = new Map();
      if (init) {
        if (init instanceof Headers) {
          for (const [key, value] of init._headers) {
            this._headers.set(key, value);
          }
        } else if (typeof init === 'object') {
          for (const [key, value] of Object.entries(init)) {
            this._headers.set(key.toLowerCase(), value);
          }
        }
      }
    }
    
    get(name) {
      return this._headers.get(name.toLowerCase());
    }
    
    set(name, value) {
      this._headers.set(name.toLowerCase(), value);
    }
  },
  configurable: true,
});

Object.defineProperty(globalThis, 'Response', {
  value: class Response {
    constructor(body, init) {
      this._body = body;
      this.status = init?.status || 200;
      this.statusText = init?.statusText || 'OK';
      this.headers = new Headers(init?.headers);
      this.ok = this.status >= 200 && this.status < 300;
    }
    
    static json(data, init) {
      return new Response(JSON.stringify(data), {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
        },
      });
    }
    
    async json() {
      return JSON.parse(this._body);
    }
    
    async text() {
      return this._body;
    }
  },
  configurable: true,
});