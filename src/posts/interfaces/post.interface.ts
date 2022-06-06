import { Comment } from '../../comments/interfaces/comments.interfaces'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
  comments?: Comment[]
  deletedAt?: Date
}
