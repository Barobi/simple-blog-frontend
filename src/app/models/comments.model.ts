export interface Comment {
  id: number;
  blogPostId: number;
  parentId: number;
  dateCreated: string;
  content: string;
  user: string;
  children?: Comment[];
  isReplying?: boolean;
}
