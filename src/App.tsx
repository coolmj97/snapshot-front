import Router from './routes';
import GlobalStyle from './GlobalStyle';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';

function App() {
  dayjs.locale('ko');

  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
