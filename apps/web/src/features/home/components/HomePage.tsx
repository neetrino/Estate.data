import { clientEnv } from "@/config/env";

export function HomePage() {
  const apiMode = clientEnv.NEXT_PUBLIC_USE_MOCK_API
    ? "mock (no backend yet)"
    : "live API";

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <main className="w-full max-w-lg text-center">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
          Estate.data
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Frontend is ready
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Building UI first. The API app will live in{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            apps/api
          </code>{" "}
          (Next.js). Until then, features can use mocks — switch off with{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            NEXT_PUBLIC_USE_MOCK_API=false
          </code>{" "}
          when the backend is up.
        </p>
        <dl className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-left text-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <InfoRow label="API base" value={clientEnv.NEXT_PUBLIC_API_URL} />
          <InfoRow label="Data mode" value={apiMode} />
        </dl>
      </main>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-zinc-200 py-2 last:border-0 sm:flex-row sm:justify-between sm:gap-4 dark:border-zinc-800">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="font-mono text-xs break-all text-zinc-800 dark:text-zinc-200">
        {value}
      </dd>
    </div>
  );
}
