interface IUsePagination {
  page?: number;
  size?: number;
  where?: object;
  relations?: Array<any>;
  select?: object;
  order?: object;
}

export const usePagination = ({
  page = 1,
  size = 10,
  where = {},
  relations = [],
  select = [],
  order = { updateAt: 'DESC' },
}: IUsePagination) => {
  return {
    skip: +((+page - 1) * size),
    take: +size,
    relations,
    select,
    where,
    order,
  };
};
