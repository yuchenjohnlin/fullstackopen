import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  test('calls createBlog with correct details', () => {
    const mockCreate = vi.fn()
    render(<BlogForm createBlog={mockCreate} />)

    fireEvent.change(screen.getByPlaceholderText('title'), { target: { value: 'New Blog' } })
    fireEvent.change(screen.getByPlaceholderText('author'), { target: { value: 'Author Name' } })
    fireEvent.change(screen.getByPlaceholderText('url'), {
      target: { value: 'http://example.com' },
    })

    fireEvent.submit(screen.getByRole('form'))

    expect(mockCreate).toHaveBeenCalledTimes(1)
    expect(mockCreate).toHaveBeenCalledWith({
      title: 'New Blog',
      author: 'Author Name',
      url: 'http://example.com',
      likes: 0,
    })
  })
})
