import client from './client'

export interface BlogPost {
  id: number
  title: string | null
  content: string | null
  slug: string | null
  author_id: number | null
  is_published: boolean | null
  created_at: string
  updated_at: string
}

export interface CreatePostPayload {
  title: string
  content: string
  slug: string
  is_published: boolean
}

export const blogApi = {
  list: () => client.get<BlogPost[]>('/blog'),
  getOne: (slug: string) => client.get<BlogPost>(`/blog/${slug}`),
  create: (payload: CreatePostPayload) => client.post<BlogPost>('/blog', payload),
  delete: (id: number) => client.delete(`/blog/delete/${id}`),
}