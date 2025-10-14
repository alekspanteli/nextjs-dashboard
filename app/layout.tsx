import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { ReactScan } from '@/app/ui/react-scan'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ReactScan />
        {children}
      </body>
    </html>
  )
}
