export function getPagination (page: number, perPage: number) {
  const limit = perPage ? +perPage : 10
  const from = page ? page * limit : 0
  const to = page ? from + perPage - 1 : perPage - 1

  return { from, to }
}