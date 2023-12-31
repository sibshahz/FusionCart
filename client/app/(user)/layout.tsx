import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'
import Header from '@/src/components/user/header/header.component'
import { Footer } from '@/src/components/user/footer/footer.component'
import ReactQueryProvider from '@/src/providers/ReactQueryProvider'
import ClientStoreProvider from '@/src/redux/ClientStoreProvider'

const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Poppins/Poppins-Thin.ttf',
      weight: '100'
    },
    {
      path: '../../public/fonts/Poppins/Poppins-ExtraLight.ttf',
      weight: '200'
    },
    {
      path: '../../public/fonts/Poppins/Poppins-Light.ttf',
      weight: '300'
    },
    {
      path: '../../public/fonts/Poppins/Poppins-Regular.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/Poppins/Poppins-Medium.ttf',
      weight: '500'
    },
    {
      path: '../../public/fonts/Poppins/Poppins-SemiBold.ttf',
      weight: '600'
    },
    {
      path: '../../public/fonts/Poppins/Poppins-Bold.ttf',
      weight: '700'
    },
    {
      path: '../../public/fonts/Poppins/Poppins-ExtraBold.ttf',
      weight: '800'
    },
    {
      path: '../../public/fonts/Poppins/Poppins-Black.ttf',
      weight: '900'
    },
  ],
  variable: '--font-poppins'
})

const montserrat = localFont({
  src: [
    {
      path: '../../public/fonts/Montserrat/Montserrat-Thin.ttf',
      weight: '100'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-ExtraLight.ttf',
      weight: '200'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-Light.ttf',
      weight: '300'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-Regular.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-Medium.ttf',
      weight: '500'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-SemiBold.ttf',
      weight: '600'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-Bold.ttf',
      weight: '700'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-ExtraBold.ttf',
      weight: '800'
    },
    {
      path: '../../public/fonts/Montserrat/Montserrat-Black.ttf',
      weight: '900'
    },
  ],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'Furniro',
  description: 'An elegant furniture store',
}

export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"  className={`${poppins.variable} ${montserrat.variable}`}>
      <body  
      // className={`font-sans`}
      className='min-h-screen'

      >
        <ClientStoreProvider>
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
        </ReactQueryProvider>
        </ClientStoreProvider>
      </body>
    </html>
  )
}