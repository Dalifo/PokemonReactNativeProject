import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './navigation/Navigation'; // Assurez-vous que le chemin est correct

const queryClient = new QueryClient();

export default function App() {
  return (
  <QueryClientProvider client={queryClient}>

    <AppNavigator />
  
  </QueryClientProvider>);
}
