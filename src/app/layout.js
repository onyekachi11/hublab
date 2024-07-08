import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import PageConnectKit from "@/context/PageConnectKit";
import ReduxProvider from "@/providers/reduxProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavProvider } from "@/context/nav_context";
import DatePickerProvider from "@/providers/datePickerProvider";

const roboto_Slab = Roboto_Slab({ subsets: ["latin"] });

export const metadata = {
  title: "Verxio Protocol",
  description:
    "Verxio is revolutionalizing the way people learn and interact with the blockchain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={roboto_Slab.className}>
        <DatePickerProvider>
          <ReduxProvider>
            <NavProvider>
              <PageConnectKit>{children}</PageConnectKit>
            </NavProvider>
          </ReduxProvider>
          <ToastContainer />
        </DatePickerProvider>
      </body>
    </html>
  );
}
