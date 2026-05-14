// Root layout — next-intl 패턴에 따라 html/body는 [locale] layout이 보유.
// 이 layout은 단순 pass-through.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
