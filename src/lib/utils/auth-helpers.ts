import { toast } from '@/components/ui/use-toast';

export const handleAuthError = (error: any) => {
  console.error('Auth error:', error);
  if (error.message) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
  } else {
    toast({
      title: 'Error',
      description: 'An unexpected error occurred',
      variant: 'destructive',
    });
  }
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
}; 