import Header from "./header";
import Footer from "./Footer";

export default function Layout({ children, fullScreen }) {
  return (
    <div className={`min-h-screen flex flex-col ${fullScreen ? "" : "bg-[#FEFAE0] text-[#0A400C]"}`}>
      <Header />
      <main className={`${fullScreen ? "p-0 mx-0 max-w-full" : "flex-1 container mx-auto px-4 py-6"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

