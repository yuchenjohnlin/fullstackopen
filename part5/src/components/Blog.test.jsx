import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Blog from './Blog'

const sampleBlog = {
  id: '1',
  title: 'Test Title',
  author: 'Test Author',
  url: 'http://example.com',
  likes: 5,
  user: {
    username: 'tester',
    name: 'Test User'
  }
}

describe('Blog', () => {
  test('renders title and author but not url or likes by default', () => {
    render(<Blog blog={sampleBlog} onLike={() => {}} onDelete={() => {}} currentUser={{ username: 'tester' }} />)

    expect(screen.getByText('Test Title', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Test Author', { exact: false })).toBeInTheDocument()
    expect(screen.queryByText('http://example.com')).not.toBeInTheDocument()
    expect(screen.queryByText(/likes/i)).not.toBeInTheDocument()
  })

  test('shows url and likes after clicking view', () => {
    render(<Blog blog={sampleBlog} onLike={() => {}} onDelete={() => {}} currentUser={{ username: 'tester' }} />)

    fireEvent.click(screen.getByText('view'))

    expect(screen.getByText('http://example.com')).toBeInTheDocument()
    expect(screen.getByText(/likes 5/i)).toBeInTheDocument()
  })

  test('calls like handler twice when like button clicked twice', () => {
    const mockLike = vi.fn()
    render(<Blog blog={sampleBlog} onLike={mockLike} onDelete={() => {}} currentUser={{ username: 'tester' }} />)

    fireEvent.click(screen.getByText('view'))
    const likeButton = screen.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLike).toHaveBeenCalledTimes(2)
  })
})
