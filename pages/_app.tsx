import { AppProps } from 'next/app';
import '../styles/globals.css';
import { ToastProvider } from '../components/ui/use-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </ToastProvider>
  );
}
