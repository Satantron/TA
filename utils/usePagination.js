import { useState, useEffect, useCallback } from 'react';

// Hook supports two modes:
// - client-side: pass `items` array and it'll paginate in-memory
// - server-side: pass `fetchPage` async function ({page, pageSize}) => { data, total }
export default function usePagination({ items = null, fetchPage = null, initialPage = 1, initialPageSize = 10 }) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pageData, setPageData] = useState([]);
  const [total, setTotal] = useState(0);
  const totalPages = Math.max(1, Math.ceil((total || (items ? items.length : 0)) / pageSize));

  const load = useCallback(async () => {
    if (typeof fetchPage === 'function') {
      try {
        const res = await fetchPage(page, pageSize);
        if (res) {
          setPageData(res.data || []);
          setTotal(typeof res.total === 'number' ? res.total : (res.data ? res.data.length : 0));
        } else {
          setPageData([]);
          setTotal(0);
        }
      } catch (err) {
        setPageData([]);
        setTotal(0);
      }
    } else if (Array.isArray(items)) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const slice = items.slice(start, end);
      setPageData(slice);
      setTotal(items.length);
    } else {
      setPageData([]);
      setTotal(0);
    }
  }, [items, fetchPage, page, pageSize]);

  useEffect(() => {
    // ensure page is within bounds when pageSize or total changes
    if (page > totalPages) setPage(1);
  }, [pageSize, total, totalPages]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    pageData,
    page,
    setPage,
    pageSize,
    setPageSize,
    total,
    totalPages,
    reload: load
  };
}
