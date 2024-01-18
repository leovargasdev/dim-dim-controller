import { Toaster } from 'sonner'
import type { AppProps } from 'next/app'

import 'styles/globals.scss'
import { TransactionsProvider } from 'hooks/useTransactions'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TransactionsProvider>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{ duration: 3000 }}
        position="top-right"
        expand
        richColors
      />
    </TransactionsProvider>
  )
}

export default MyApp
