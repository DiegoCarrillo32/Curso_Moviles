export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
