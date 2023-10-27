import { User } from './User'

export interface Diary {
  slug: string
  content: object
  author: User
  html: string
  createdAt: string
  updatedAt: string
}
