import { Inter } from 'next/font/google'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })
import HomePage from '@/components/HomePage.tsx/HomePage';


export default function Home() {
  return (
    <>
     <Head>
        {/* Preconnect 366666666666666666666666666666666666666666666666666666666666666*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Font stylesheets */}
        <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Baskervville&display=swap" rel="stylesheet" />
      </Head>
      <HomePage />
    </>
  )
}
