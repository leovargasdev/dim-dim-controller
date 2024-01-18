import { Toaster } from 'sonner'
import type { AppProps } from 'next/app'

import 'styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{ duration: 3000 }}
        position="top-right"
        expand
        richColors
      />
    </>
  )
}

export default MyApp
