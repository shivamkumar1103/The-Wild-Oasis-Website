import Header from "@/app/_components/Header";
import "./_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    default: "The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  description:
    "Luxurious cabins,hotel rooms in heart of nature himalayas surrounded by mountains and rivers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <ReservationProvider>
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </ReservationProvider>
        </div>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
