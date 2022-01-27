import React, {useEffect, useState} from 'react';

export const usePagination = <Type extends any>(data: Array<Type>, pageSize: number) => {
	const [page, setPage] = useState(1);
	const [pageData, setPageData] = useState<Type[]>([]);
	const [totalPages, setTotalPages] = useState(0);

	const total = data.length;
	const offsetStart = (page - 1) * pageSize;
	const offsetEnd = page * pageSize;

	useEffect(() => setTotalPages(Math.ceil(total / pageSize)), [total, pageSize]);

	useEffect(() => setPageData(data.slice(offsetStart, offsetEnd)), [data, offsetStart, offsetEnd]);

	const pagination = new Array(totalPages).fill(null).map((_, idx) => {
		return <button key={idx} onClick={() => setPage(idx + 1)}>{idx + 1}</button>
	})

	return {
		page,
		setPage,
		pageData,
		totalPages,
		pagination
	}
};