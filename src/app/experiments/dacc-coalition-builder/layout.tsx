import { WalletProvider } from "./WalletProvider";

export default function CoalitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WalletProvider>{children}</WalletProvider>;
}
