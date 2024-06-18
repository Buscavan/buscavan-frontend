import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Table } from '@tanstack/react-table'

interface PaginationProps<TData> {
  property: Table<TData>
}

export function Pagination<TData>({ property: table }: PaginationProps<TData>) {
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Total de {table.getFilteredRowModel().rows.length} item(s)
      </p>

      <div className="ml-auto flex items-center gap-4">
        {table.getFilteredRowModel().rows.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </p>
        )}

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
