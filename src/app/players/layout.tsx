export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`w-full md:mx-auto md:max-w-md`}>{children}</div>;
}
