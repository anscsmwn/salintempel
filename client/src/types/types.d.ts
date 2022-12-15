export type SalinTempel = {
  content: string;
  like: number;
  title: string;
  _id: string;
  author: string;
  likes: string[];
};

export type ResponseData = {
  data: SalinTempel[];
  end_point: string;
  method: string;
  status: string;
  total: number;
};
