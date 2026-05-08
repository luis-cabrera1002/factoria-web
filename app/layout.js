import './globals.css';

export const metadata = {
  title: 'Factoría de Ideas – Soluciones Digitales con IA',
  description: 'Desarrollo web, apps móviles y automatización con IA para PyMEs en Guatemala, Centroamérica y España.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Factoría de Ideas – Soluciones Digitales con IA',
    description: 'Hacemos realidad tus ideas digitales.',
    images: ['/uploads/Logo oficial FDI para registrar-de13ff70.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Permanent+Marker&family=Space+Grotesk:wght@400;500;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
