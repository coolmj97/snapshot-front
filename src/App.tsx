import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './routes';
import GlobalStyle from './GlobalStyle';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
