import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'
import { Button } from '../ui/button'

interface PaginationProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Página {currentPage + 1} de {totalPages}
      </p>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setCurrentPage(0)}
            disabled={currentPage === 0}
          >
            <ChevronsLeft className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => setCurrentPage(totalPages - 1)}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
