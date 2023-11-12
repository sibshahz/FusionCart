import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'

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

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"  className={`${poppins.variable} font-sans`}>
      <body  className={`${poppins.className} font-sans`}>
        <h1>User layout</h1>
        {children}
      </body>
    </html>
  )
}