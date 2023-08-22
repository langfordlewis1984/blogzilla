import Blogzilla from "../../public/godz12.jpeg";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={handjet.className}>
      <main className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
          style={{
            backgroundImage: `url(${Blogzilla.src})`,
            backgroundSize: "cover",
            backgroundPosition: "top", // Anchoring at top-left
            maxWidth: "100vw", // Full width of the viewport
            height: "100vh", // Full height of the viewport
          }}
        ></div>
        <div className="relative z-10 text-center">
          <h2 className="opacity-20 text-7xl md:text-8xl lg:text-9xl text-white font-bold mb-6 px-4 py-8 animate-ping">
            BlogZILLA Cometh...
          </h2>
        </div>
      </main>
    </div>
  );
}
