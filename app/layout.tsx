import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import { SlideNav } from './components/slide-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Linear and Nonlinear Programming | Optimization Techniques',
  description: 'Learn linear and nonlinear programming, optimization techniques, and their real-world applications. Interactive tutorials, exercises, and visualizations for mathematicians, students, and professionals.',
  keywords: 'linear programming, nonlinear programming, optimization, mathematical programming, simplex method, duality, convex optimization, gradient descent, mathematical education, operations research',
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Linear and Nonlinear Programming',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Linear and Nonlinear Programming | Optimization Techniques',
    description: 'Learn linear and nonlinear programming, optimization techniques, and their real-world applications. Interactive tutorials, exercises, and visualizations.',
    url: 'https://your-domain.com',
    siteName: 'Linear and Nonlinear Programming',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Linear and Nonlinear Programming',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linear and Nonlinear Programming | Optimization Techniques',
    description: 'Learn linear and nonlinear programming, optimization techniques, and their real-world applications.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground flex flex-col`}>
        <ThemeProvider>
          <SlideNav />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
