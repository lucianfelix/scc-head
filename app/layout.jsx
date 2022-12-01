export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'auto' }}>
      <head >
          <link rel="preload"
                fetchpriority="high"
                media="(max-width: 840px)"
                as="image"
                href="http://localhost:3000/_next/image?url=https%3A%2F%2Fmain--upm--hlxsites.hlx.live%2Fmedia_1b0a9abb5fd97958342f83943585198d71d7cd0bf.png%3Fwidth%3D750%26format%3Dpng%26optimize%3Dmedium&w=3840&q=75"
              // imageSizes="50vw"
          />
      </head>
      <body style={{ scrollBehavior: 'auto' }}>
      {children}
      </body>
    </html>
  );
}
