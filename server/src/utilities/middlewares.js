export const parsePagination = (req, resp, next) => {
  const { page = 1, size = 10 } = req.query;
  req.$pagination = { 
    limit: Math.max(size, 1), 
    offset: Math.max((page - 1) * size, 0)
  };
  next();
}