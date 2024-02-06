import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Input() totalItems!: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  visiblePages: number[] = [];

  ngOnChanges(): void {
    this.updateVisiblePages();
  }

  // calculateVisiblePages(): void {
  //   const numberOfPagesToShow = 2; // You can adjust this number based on your preference
  //   let start = this.currentPage - Math.floor(numberOfPagesToShow / 3);
  //   start = Math.max(1, start);
  //   let end = start + numberOfPagesToShow - 1;
  //   end = Math.min(this.totalPages, end);

  //   this.visiblePages = Array.from({ length: end - start + 1 }, (_, index) => index + start);
  // }

  updateVisiblePages(): void {
    const numberOfPagesToShow = 5; // You can adjust this number based on your preference
    const halfNumberOfPages = Math.floor(numberOfPagesToShow / 2);
  
    let startPage = Math.max(1, this.currentPage - halfNumberOfPages);
    let endPage = Math.min(this.totalPages, startPage + numberOfPagesToShow - 1);
  
    if (endPage - startPage < numberOfPagesToShow - 1) {
      startPage = Math.max(1, endPage - numberOfPagesToShow + 1);
    }
  
    this.visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage);
  }
}


