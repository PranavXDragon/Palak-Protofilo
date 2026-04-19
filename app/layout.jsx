import './globals.css';

export const metadata = {
  title: 'Palak Urkude - Portfolio',
  description: 'Personal portfolio of Palak Urkude',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
