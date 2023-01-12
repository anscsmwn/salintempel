export type SalinTempel = {
  content: string;
  title: string;
  _id: string;
  author: string;
  likesBy: string[];
  totalLikes: number;
  createdAt: string;
  isNSFW: boolean;
  tags: string[];
};

export type Tag = {
  name: string;
  _id?: string;
};

export type ResponseData = {
  data: SalinTempel[];
  end_point: string;
  method: string;
  status: string;
  total: number;
  errors: string[];
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

export type ResponseDataGetById = {
  data: SalinTempel;
  end_point: string;
  method: string;
  status: string;
  total: number;
  next: string;
  previous: string;
  count: number;
};

export type ResponseDataTagGetAll = {
  data: Tag[];
  end_point: string;
  method: string;
  status: string;
};
