import Script from "next/script";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-4699585931687069"}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      {children}
    </>
  );
}
