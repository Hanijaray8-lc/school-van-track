import { Link } from "react-router-dom";

export default function Header() {
  return (
  <header className="bg-[#0A400C] text-[#FEFAE0] py-4 shadow-lg">
  <div className="container mx-auto flex justify-between items-center px-4">

    {/* Logo / Title */}
    <h1 className="text-2xl font-bold tracking-wider drop-shadow-md">
      AZIEL
    </h1>

    {/* Back Button on Right */}
    <button
      onClick={() => window.history.back()}
      className="bg-[#819067] hover:bg-[#136014] transition-colors duration-200 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>

  </div>
</header>


  );
}
