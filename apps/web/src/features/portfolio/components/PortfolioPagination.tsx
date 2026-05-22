import {
  clampPortfolioPage,
  getPortfolioPageCount,
  shouldShowPortfolioPagination,
} from "@/features/portfolio/lib/portfolioPagination";

const PORTFOLIO_PAGINATION_NAV_CLASS =
  "mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3";

const PORTFOLIO_PAGINATION_BUTTON_BASE_CLASS =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:!cursor-auto disabled:hover:border-foreground/15 sm:min-w-[2.75rem] sm:text-base";

const PORTFOLIO_PAGINATION_BUTTON_ACTIVE_CLASS =
  "border-what-we-do-title bg-what-we-do-title text-white";

const PORTFOLIO_PAGINATION_BUTTON_INACTIVE_CLASS =
  "border-foreground/15 bg-white text-what-we-do-title hover:border-what-we-do-subtitle/50";

const PORTFOLIO_PAGINATION_BUTTON_DISABLED_CLASS =
  "disabled:text-muted-foreground";

const PORTFOLIO_PAGINATION_ELLIPSIS_CLASS =
  "px-1 text-sm font-semibold text-what-we-do-subtitle";

type PortfolioPaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export function PortfolioPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PortfolioPaginationProps) {
  if (!shouldShowPortfolioPagination(totalItems, itemsPerPage)) {
    return null;
  }

  const totalPages = getPortfolioPageCount(totalItems, itemsPerPage);

  const safePage = clampPortfolioPage(currentPage, totalPages);
  const pageNumbers = buildPageNumbers(safePage, totalPages);

  return (
    <nav
      className={PORTFOLIO_PAGINATION_NAV_CLASS}
      aria-label="Portfolio pages"
    >
      <PaginationControl
        label="First page"
        disabled={safePage <= 1}
        onClick={() => onPageChange(1)}
      >
        First
      </PaginationControl>

      <ol className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {pageNumbers.map((entry, index) =>
          entry === "ellipsis" ? (
            <li
              key={`ellipsis-${index}`}
              className={PORTFOLIO_PAGINATION_ELLIPSIS_CLASS}
              aria-hidden
            >
              …
            </li>
          ) : (
            <li key={entry}>
              <button
                type="button"
                aria-label={`Page ${entry}`}
                aria-current={entry === safePage ? "page" : undefined}
                className={`${PORTFOLIO_PAGINATION_BUTTON_BASE_CLASS} ${
                  entry === safePage
                    ? PORTFOLIO_PAGINATION_BUTTON_ACTIVE_CLASS
                    : PORTFOLIO_PAGINATION_BUTTON_INACTIVE_CLASS
                }`}
                onClick={() => onPageChange(entry)}
              >
                {entry}
              </button>
            </li>
          ),
        )}
      </ol>

      <PaginationControl
        label="Last page"
        disabled={safePage >= totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </PaginationControl>
    </nav>
  );
}

type PaginationControlProps = {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: string;
};

function PaginationControl({
  label,
  disabled,
  onClick,
  children,
}: PaginationControlProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={`${PORTFOLIO_PAGINATION_BUTTON_BASE_CLASS} ${PORTFOLIO_PAGINATION_BUTTON_INACTIVE_CLASS} ${PORTFOLIO_PAGINATION_BUTTON_DISABLED_CLASS}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type PageEntry = number | "ellipsis";

/** Compact page list with ellipses for long portfolios. */
function buildPageNumbers(currentPage: number, totalPages: number): PageEntry[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);

  const result: PageEntry[] = [];
  let previous = 0;

  for (const page of sorted) {
    if (page - previous > 1) {
      result.push("ellipsis");
    }
    result.push(page);
    previous = page;
  }

  return result;
}
