import './globals.css'

export const metadata = {
  title: 'BBUC Exam QA System',
  description: 'Bahamas Baptist University College - Examination Quality Assurance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
