"use client";

import { useEffect, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { AdminBadge } from "@/features/admin/components/ui/AdminBadge";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { isSameIdOrder, moveItemToIndex } from "@/features/admin/lib/move-item-to-index";
import {
  PORTFOLIO_LIST_ACTIONS_CLASS,
  PORTFOLIO_LIST_BODY_CLASS,
  PORTFOLIO_LIST_CLASS,
  PORTFOLIO_LIST_HANDLE_CLASS,
  PORTFOLIO_LIST_HINT_CLASS,
  PORTFOLIO_LIST_META_CLASS,
  PORTFOLIO_LIST_ROW_CLASS,
  PORTFOLIO_LIST_ROW_DRAGGING_CLASS,
  PORTFOLIO_LIST_TITLE_CLASS,
} from "@/features/admin/styles/admin-portfolio-list-classes";
import { ADMIN_TABLE_THUMB_IMG_CLASS } from "@/features/admin/styles/admin-panel-classes";
import type { AdminPortfolioProject } from "@/features/admin/types/admin-data";
import { parseRecentWorkAlt } from "@/features/home/content/parseRecentWorkAlt";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const REORDER_HINT = "Hold the dots on the left and drag to change the order on the website.";

type AdminPortfolioSortableListProps = {
  readonly items: readonly AdminPortfolioProject[];
  readonly onEdit: (item: AdminPortfolioProject) => void;
  readonly onDelete: (id: string) => void;
  readonly onReorder: (ids: readonly string[]) => Promise<void>;
};

function indexFromPointerY(list: HTMLElement, clientY: number): number {
  const rows = [...list.querySelectorAll<HTMLElement>("[data-project-id]")];
  const found = rows.findIndex((row) => {
    const rect = row.getBoundingClientRect();
    return clientY < rect.top + rect.height / 2;
  });
  return found === -1 ? Math.max(rows.length - 1, 0) : found;
}

function usePortfolioListDrag(
  items: readonly AdminPortfolioProject[],
  onReorder: (ids: readonly string[]) => Promise<void>,
) {
  const listRef = useRef<HTMLUListElement>(null);
  const dragIdRef = useRef<string | null>(null);
  const itemsRef = useRef(items);
  const [ordered, setOrdered] = useState<AdminPortfolioProject[]>(() => [...items]);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    itemsRef.current = ordered;
  }, [ordered]);

  useEffect(() => {
    if (dragIdRef.current) {
      return;
    }
    setOrdered([...items]);
  }, [items]);

  function startDrag(pointerId: number, target: HTMLElement, id: string) {
    target.setPointerCapture(pointerId);
    dragIdRef.current = id;
    setDraggingId(id);
  }

  function moveDrag(clientY: number) {
    const list = listRef.current;
    const dragId = dragIdRef.current;
    if (!list || !dragId) {
      return;
    }
    setOrdered((current) => moveItemToIndex(current, dragId, indexFromPointerY(list, clientY)));
  }

  async function endDrag() {
    const dragId = dragIdRef.current;
    dragIdRef.current = null;
    setDraggingId(null);
    if (!dragId || isSameIdOrder(itemsRef.current, items)) {
      return;
    }
    await onReorder(itemsRef.current.map((item) => item.id));
  }

  return { listRef, ordered, draggingId, startDrag, moveDrag, endDrag };
}

export function AdminPortfolioSortableList({
  items,
  onEdit,
  onDelete,
  onReorder,
}: AdminPortfolioSortableListProps) {
  const { listRef, ordered, draggingId, startDrag, moveDrag, endDrag } = usePortfolioListDrag(
    items,
    onReorder,
  );

  return (
    <div>
      <p className={PORTFOLIO_LIST_HINT_CLASS}>{REORDER_HINT}</p>
      <ul ref={listRef} className={PORTFOLIO_LIST_CLASS}>
        {ordered.map((item) => (
          <PortfolioSortableRow
            key={item.id}
            item={item}
            dragging={draggingId === item.id}
            onPointerDown={(event) => {
              event.preventDefault();
              startDrag(event.pointerId, event.currentTarget, item.id);
            }}
            onPointerMove={(event) => moveDrag(event.clientY)}
            onPointerUp={() => void endDrag()}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function PortfolioSortableRow({
  item,
  dragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onEdit,
  onDelete,
}: {
  readonly item: AdminPortfolioProject;
  readonly dragging: boolean;
  readonly onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
  readonly onPointerMove: (event: React.PointerEvent<HTMLButtonElement>) => void;
  readonly onPointerUp: () => void;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}) {
  const parsed = parseRecentWorkAlt(item.imageAlt);
  const rowClass = dragging
    ? `${PORTFOLIO_LIST_ROW_CLASS} ${PORTFOLIO_LIST_ROW_DRAGGING_CLASS}`
    : PORTFOLIO_LIST_ROW_CLASS;

  return (
    <li data-project-id={item.id} className={rowClass}>
      <button
        type="button"
        aria-label="Drag to reorder"
        className={PORTFOLIO_LIST_HANDLE_CLASS}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <GripVertical className="h-5 w-5" aria-hidden />
      </button>
      <PortfolioSortableRowBody item={item} parsed={parsed} onEdit={onEdit} onDelete={onDelete} />
    </li>
  );
}

function PortfolioSortableRowBody({
  item,
  parsed,
  onEdit,
  onDelete,
}: {
  readonly item: AdminPortfolioProject;
  readonly parsed: ReturnType<typeof parseRecentWorkAlt>;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}) {
  return (
    <>
      <div className={PORTFOLIO_LIST_BODY_CLASS}>
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin thumbnail
          <img
            src={normalizePublicAssetUrl(item.imageUrl)}
            alt=""
            draggable={false}
            className={ADMIN_TABLE_THUMB_IMG_CLASS}
          />
        ) : null}
        <div className="min-w-0">
          <p className={PORTFOLIO_LIST_TITLE_CLASS}>{parsed.title}</p>
          <p className={PORTFOLIO_LIST_META_CLASS}>
            {parsed.location ? `${parsed.location} · ` : ""}
            {item.category}
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {item.published ? (
            <AdminBadge label="Visible" tone="success" />
          ) : (
            <AdminBadge label="Draft" tone="muted" />
          )}
          {item.featuredOnHome ? <AdminBadge label="On homepage" /> : null}
        </div>
      </div>
      <div className={PORTFOLIO_LIST_ACTIONS_CLASS}>
        <AdminButton variant="secondary" onClick={onEdit}>
          Edit
        </AdminButton>
        <AdminButton variant="danger" onClick={onDelete}>
          Delete
        </AdminButton>
      </div>
    </>
  );
}
