import { IllegalQueryError } from '~/exception/IllegalQueryError'

export const getNumberQuery = (queryName: string) => {
  const route = useRoute()
  const query = route.query[queryName]

  if(typeof query !== 'string') {
    throw new IllegalQueryError(queryName, `${queryName} is not a number`)
  }

  const parsedQuery = parseInt(query, 10)

  if(isNaN(parsedQuery)) {
    throw new IllegalQueryError(queryName, `${queryName} is not a number`)
  }

  return parsedQuery
}