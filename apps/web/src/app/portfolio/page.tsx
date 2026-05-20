import { Navbar } from "@/shared/components/navbar";
import { PAGE_CONTAINER_CLASS, PAGE_GUTTER_CLASS } from "@/shared/lib/constants";

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main
        className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS} py-16 sm:py-20`}
      >
        <h1 className="text-4xl font-bold tracking-tight text-what-we-do-title sm:text-5xl">
          Portfolio
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Full portfolio page coming soon.
        </p>
      </main>
    </>
  );
}
