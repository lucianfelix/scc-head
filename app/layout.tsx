export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'auto' }}>
      <head />
      <body style={{ scrollBehavior: 'auto' }}>
      {children}
      </body>
    </html>
  );
}
