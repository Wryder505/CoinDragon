import './globals.css'
import { Josefin_Sans } from 'next/font/google'

const josefin_sans = Josefin_Sans({ subsets: ['latin'] })

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'CoinDragon',
  description: 'Your personal crypto portfolio.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={josefin_sans.className}>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  )
}
