import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
}))

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
})

// Mock window.open
Object.defineProperty(window, 'open', {
  value: jest.fn(),
  writable: true,
})

// Mock Google Maps API
global.google = {
  maps: {
    Map: jest.fn(),
    Marker: jest.fn(),
    places: {
      PlacesService: jest.fn(),
      Autocomplete: jest.fn(),
    },
  },
}

// Mock service worker
const mockRegister = jest.fn(() => Promise.resolve({
  installing: null,
  waiting: null,
  active: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}))

Object.defineProperty(navigator, 'serviceWorker', {
  value: {
    register: mockRegister,
  },
  writable: true,
})
