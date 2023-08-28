const generateFilters = (query) => {
  let filters = {};
  const validFilters = ["status", "author", "genre"];

  for (const filterName of validFilters) {
    if (query[filterName]) {
      filters[filterName] = query[filterName];
    }
  }

  return filters;
};

export default generateFilters;
