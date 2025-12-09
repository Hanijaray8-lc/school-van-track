export default function Footer() {
  return (
    <footer className="bg-[#0A400C] text-[#FEFAE0] py-8 mt-10 shadow-inner">
  <div className="container mx-auto text-center px-4 flex flex-col items-center gap-2">

    <p className="text-lg font-semibold">
      © {new Date().getFullYear()}  Aziel
    </p>

    <p className="text-sm opacity-80">
      Designed & Developed by{" "}
      <a
        href="https://lifechangersind.com"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-[#B1AB86] transition-colors duration-200"
      >
        Life Changers IND
      </a>
    </p>

    <p className="text-xs opacity-70 mt-1">
      All rights reserved
    </p>

  </div>
</footer>

  );
}
