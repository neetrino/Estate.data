import { AdminButton } from "@/features/admin/components/ui/AdminButton";

type AdminErrorStateProps = {
  readonly message: string;
  readonly onRetry?: () => void;
};

export function AdminErrorState({ message, onRetry }: AdminErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <p>{message}</p>
      {onRetry ? (
        <div className="mt-3">
          <AdminButton variant="secondary" onClick={onRetry}>
            Retry
          </AdminButton>
        </div>
      ) : null}
    </div>
  );
}
