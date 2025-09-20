import { render } from '@testing-library/react'
import { Loader } from '../loader'

describe('Loader', () => {
  it('renders with default size', () => {
    const { container } = render(<Loader />)
    const loader = container.firstChild as HTMLElement
    
    expect(loader).toHaveClass('h-6', 'w-6')
    expect(loader).toHaveClass('animate-spin')
  })

  it('renders with small size', () => {
    const { container } = render(<Loader size="sm" />)
    const loader = container.firstChild as HTMLElement
    
    expect(loader).toHaveClass('h-4', 'w-4')
  })

  it('renders with large size', () => {
    const { container } = render(<Loader size="lg" />)
    const loader = container.firstChild as HTMLElement
    
    expect(loader).toHaveClass('h-8', 'w-8')
  })

  it('applies custom className', () => {
    const { container } = render(<Loader className="custom-class" />)
    const loader = container.firstChild as HTMLElement
    
    expect(loader).toHaveClass('custom-class')
  })
})
