import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./globals.css";
// import { Provider } from 'react-redux'
// import { store } from '../store.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import AuthProviderWithnavigate from './auth/AuthProviderWithnavigate.tsx';
import { Toaster } from 'sonner';
const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthProviderWithnavigate >
      <App />
      <Toaster position='top-right' visibleToasts={1} richColors/>
      </AuthProviderWithnavigate>
      </BrowserRouter>
    </QueryClientProvider>
<<<<<<< HEAD
  // </Provider>,
=======
  
  // {/* </Provider>, */}
>>>>>>> frontend
)
