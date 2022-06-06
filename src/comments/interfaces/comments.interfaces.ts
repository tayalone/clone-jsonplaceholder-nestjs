import { Post } from '../../posts/interfaces/post.interface'

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
  post?: Post
  deletedAt?: Date
}
