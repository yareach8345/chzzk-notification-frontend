import { getNumberQuery } from '~/util/QueryUtil'
import type { PagingInfo } from '~/types/PagingInfo'

export const getPageQuery = () => {
  try {
    const page = getNumberQuery('page')
    return page < 1 ? 1 : page
  } catch (_) {
    return 1
  }
}

export const getPageSizeQuery = (defaultSize: number = 10) => {
  try {
    const pageSize = getNumberQuery('pageSize')
    return pageSize < 1 ? 1 : pageSize
  } catch (_) {
    return defaultSize
  }
}

export const getPagingInfoFromQuery = (defaultPageSize: number = 20): PagingInfo => {
  return {
    page: getPageQuery(),
    pageSize: getPageSizeQuery(defaultPageSize)
  }
}

export const calcStartIndexWithPage = (pagingInfo: PagingInfo) => (pagingInfo.page - 1) * pagingInfo.pageSize

export const calcEndIndexWithPage = (pagingInfo: PagingInfo) => (pagingInfo.page) * pagingInfo.pageSize

export const calcStartAndEndIndexWithPage = (pagingInfo: PagingInfo) => ({
  start: calcStartIndexWithPage(pagingInfo),
  end: calcEndIndexWithPage(pagingInfo)
})