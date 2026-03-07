export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        Dashboard layout
        {children}
      </body>
    </html>
  );
}
