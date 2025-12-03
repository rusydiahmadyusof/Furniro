import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        <h1 className="font-bold text-6xl md:text-8xl text-gray-1 mb-4">404</h1>
        <h2 className="font-semibold text-3xl md:text-4xl text-gray-1 mb-4">
          Page Not Found
        </h2>
        <p className="font-normal text-lg text-gray-2 mb-8 text-center max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-primary text-white font-semibold text-base px-8 py-3 rounded hover:bg-primary/90 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
      <Footer />
    </main>
  );
}

