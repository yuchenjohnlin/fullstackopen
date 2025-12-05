import { useQuery } from '@tanstack/react-query';
import userService from '../services/users';

export function useUsers(options = {}) {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    ...options,
  });
}

export default useUsers
