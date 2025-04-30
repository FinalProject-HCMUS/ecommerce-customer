export interface BlogPost {
  id: number
  title: string
  description: string
  image: string | null
  date: string
  content?: string
  author?: Author
  readingTime?: string
  category?: string
  tags?: string[]
  relatedPosts?: number[]
}

export interface Author {
  name: string
  avatar: string
  bio: string
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface BreadcrumbProps {
  items?: {
    label: string
    path: string
  }[]
}

export interface BlogDetailProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}
