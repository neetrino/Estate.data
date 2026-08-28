"use client";

type AppErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Route error boundary — production hides the underlying Server Component message. */
export default function AppError({ reset }: AppErrorProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-studio-fg">Something went wrong</h1>
      <p className="max-w-md text-studio-muted">
        The page failed to load. Try again, or return home.
      </p>
      <button
        type="button"
        className="bg-studio-accent px-6 py-3 text-sm font-semibold text-studio-fg"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
