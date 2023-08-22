const generateSort = (query) => {
  let sort = {};

  const validSort = ["title", "rating", "createdAt"];

  if (query.sortBy && validSort.includes(query.sortBy)) {
    sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
  }

  return sort;
};

export default generateSort;
