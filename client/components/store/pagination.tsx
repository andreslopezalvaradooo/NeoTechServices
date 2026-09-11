"use client";

import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  pagination: { perPage: number; page: number; pages: number; total: number };
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { perPage, page, pages, total } = pagination;
  if (!pages || pages <= 1 || !total) return null;

  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, total);

  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;
    onPageChange(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = (): (number | "...")[] => {
    const delta = 2;
    const range: number[] = [];
    for (let i = 1; i <= pages; i++)
      if (i === 1 || i === pages || (i >= page - delta && i <= page + delta))
        range.push(i);

    return range.reduce<(number | "...")[]>((acc, curr, idx) => {
      if (idx > 0) {
        const prev = range[idx - 1];
        if (curr - prev === 2) acc.push(prev + 1);
        else if (curr - prev > 2) acc.push("...");
      }
      acc.push(curr);
      return acc;
    }, []);
  };

  return (
    <div className="absolute bottom-0 z-20 bg-muted/50 w-full py-2 space-y-2 backdrop-blur-sm">
      <PaginationUI>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) handlePageChange(page - 1);
              }}
              className={
                page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>

          {getPageNumbers().map((pageNum, index) => (
            <PaginationItem key={index}>
              {pageNum === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNum);
                  }}
                  isActive={pageNum === page}
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < pages) handlePageChange(page + 1);
              }}
              className={
                page === pages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationUI>

      <p className="text-center text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {total} products
      </p>
    </div>
  );
}
