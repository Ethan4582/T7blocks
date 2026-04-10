import { DocsInstallationCard } from "@/components/common/DocsInstallationCard";

export default function InstallationPage() {
  return (
    <div className="py-12 max-w-[1400px] mx-auto w-full min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Installation</h1>
        <p className="text-muted-foreground text-lg opacity-60">
          How to install and set up T7blocks in your project.
        </p>
      </div>

      <hr className="border-border/40 mb-12" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DocsInstallationCard title="Next.js" light="/SVG/nextjs_icon_dark.svg" dark="/SVG/nextjs_icon_dark.svg" url="/installation/nextjs" />
        <DocsInstallationCard title="Vite" light="/SVG/vitejs.svg" dark="/SVG/vitejs.svg" url="/installation/vite" />
        <DocsInstallationCard title="React Router" light="/SVG/reactrouter.svg" dark="/SVG/reactrouter.svg" url="/installation/react-router" />
        <DocsInstallationCard title="Remix" light="/SVG/remix_light.svg" dark="/SVG/remix_dark.svg" url="/installation/remix" />
        <DocsInstallationCard title="Astro" light="/SVG/astro.svg" dark="/SVG/astro_dark.svg" url="/installation/astro" />
        <DocsInstallationCard title="TanStack" light="/SVG/tanstack.svg" dark="/SVG/tanstack.svg" url="/installation/tanstack" />
        <DocsInstallationCard title="TanStack Router" light="/SVG/tanstack.svg" dark="/SVG/tanstack.svg" url="/installation/tanstack-router" />
        <DocsInstallationCard title="Manual Installation" light="/SVG/react_light.svg" dark="/SVG/react_dark.svg" url="/installation/manual" />
      </div>
    </div>
  );
}
