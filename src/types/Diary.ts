import { User } from './User'

export interface Diary {
  slug: string
  content: Object
  author: User
  html: string
  createdAt: string
  updatedAt: string
}
