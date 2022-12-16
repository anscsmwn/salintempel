export type SalinTempel = {
  content: string;
  title: string;
  _id: string;
  author: string;
  likesBy: string[];
  totalLikes: number;
  createdAt: string;
};

export type ResponseData = {
  data: SalinTempel[];
  end_point: string;
  method: string;
  status: string;
  total: number;
};

export type ResponseDataGetAll = {
  data: SalinTempel[];
  end_point: string;
  method: string;
  status: string;
  total: number;
  next: string;
  previous: string;
  count: number;
};
