export interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}
export interface PageableDetails {
  paged: boolean
  pageNumber: number
  pageSize: number
  unpaged: boolean
  offset: number
  sort: Sort
}

export interface Pageable<T> {
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
  pageable: PageableDetails
  numberOfElements: number
  size: number
  content: T
  number: number
  sort: Sort
  empty: boolean
}
