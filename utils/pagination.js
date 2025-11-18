export const paginate = async (Model, query = {}, pageLimit = 10, all = false) => {
  if (all) {
    const results = await Model.find(query).sort({ createdAt: -1 });
    return { results, total: results.length };
  }

  const results = await Model.find(query)
    .sort({ createdAt: -1 })
    .limit(pageLimit);

  const total = await Model.countDocuments(query);

  return { results, total };
};
