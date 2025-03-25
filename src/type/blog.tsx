export interface BlogPost {
    id: number
    title: string
    description: string
    image: string | null
    date: string
  }
  
  export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
  
  export interface BlogListProps {
    posts: BlogPost[]
  }
  
  export interface BlogPostProps {
    post: BlogPost
    index: number
  }
  
  
  