import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';

export function useBlogs(options = {}) {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    ...options,
  });
}

export function useCreateBlog(onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
}

export function useLikeBlog(onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, newObject }) => blogService.update(id, newObject),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
}

export function useDeleteBlog(onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.remove,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
}

export function useCommentBlog(onSuccess, onError) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
}
