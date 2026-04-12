import Link from "next/link";

export default function NotFound() {
   return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
         <h1 className="text-6xl font-bold tracking-tighter">404</h1>
         <h2 className="mt-4 text-2xl font-semibold opacity-80">Page Not Found</h2>
         <p className="mt-4 max-w-md opacity-60">
            The component or page you are looking for doesn't exist or has been moved to a different gallery.
         </p>
         <Link
            href="/gallery"
            className="mt-10 rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-all hover:bg-white/90 hover:scale-105 active:scale-95"
         >
            Return to Gallery
         </Link>
      </div>
   );
}