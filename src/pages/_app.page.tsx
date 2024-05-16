import { Toaster } from 'sonner'
import { Layout } from 'components'
import type { AppProps } from 'next/app'
import { TransactionsProvider } from 'hooks/useTransactions'

import 'styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TransactionsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
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
