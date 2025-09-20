import { render } from '@testing-library/react'
import PWAInstaller from '../PWAInstaller'

describe('PWAInstaller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<PWAInstaller />)
  })

  it('registers service worker on mount', async () => {
    render(<PWAInstaller />)
    
    // The service worker registration happens in useEffect
    // Wait for the effect to run
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js')
  })
})
