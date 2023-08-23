import Link from "next/link";
import { Teko, Handjet } from "next/font/google";
import { UserButton } from "@clerk/nextjs";

const teko = Teko({ subsets: ["latin"], weight: ["300", "400", "700"] });
const handjet = Handjet({ subsets: ["latin"] });

export default function Header() {
  return (
    <header className="p-4 lg:p-6 flex flex-col lg:flex-row justify-between items-center mx-auto max-w-screen-full">
      <div className="flex items-center gap-6">
        <div className={teko.className + " text-center lg:text-left"}>
          <h1 className="text-8xl text-white lg:text-9xl lg:hover:text-green-500 transition-colors duration-300 hover:cursor-crosshair">
            blog<span className="text-red-500 font-black">ZILLA</span>
          </h1>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
      <nav className="text-4xl lg:text-4xl lg:pr-20 text-center lg:text-right mt-4 lg:mt-0">
        <ul className="flex space-x-8">
          <li>
            <Link
              href="/"
              className="text-white hover:text-red-500 hover:font-black hover:tracking-wide transition-all duration-300 animate-pulse"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-white hover:text-red-500 hover:font-black hover:tracking-wide transition-all duration-300 animate-pulse"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/blog/categories"
              className="text-white hover:text-red-500 hover:font-black hover:tracking-wide transition-all duration-300 animate-pulse"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-white hover:text-red-500 hover:font-black hover:tracking-wide transition-all duration-300 animate-pulse"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
