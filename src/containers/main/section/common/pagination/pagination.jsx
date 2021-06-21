import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
	let i = from;
	const range = [];

	while (i <= to) {
		range.push(i);
		i += step;
	}

	return range;
};

function Pagination(props) {
	const {
		allRecords,
		totalRecords,
		pageLimit,
		pageNeighbours,
		onPageChanged,
	} = props;

	const [totalPages, setTotalPages] = useState();
	useEffect(() => {
		setTotalPages(Math.ceil(totalRecords / pageLimit));
	}, [pageLimit, totalRecords]);

	const [currentPage, setCurrentPage] = useState(1);

	const gotoPage = (page) => {
		const _currentPage = Math.max(0, Math.min(page, totalPages));
		const _offset = (_currentPage - 1) * pageLimit;

		const paginationData = {
			_currentPage,
			totalPages: totalPages,
			pageLimit: pageLimit,
			totalRecords: totalRecords,
			_offset: _offset,
			_currentRecord: allRecords.slice(_offset, _offset + pageLimit),
		};

		onPageChanged(paginationData);
		setCurrentPage(_currentPage);
	};

	useEffect(() => {
		const _currentPage = Math.max(0, Math.min(1, totalPages));
		const _offset = (_currentPage - 1) * pageLimit;

		const paginationData = {
			_currentPage,
			totalPages: totalPages,
			pageLimit: pageLimit,
			totalRecords: totalRecords,
			_offset: _offset,
			_currentRecord: allRecords.slice(_offset, _offset + pageLimit),
		};

		onPageChanged(paginationData);
		setCurrentPage(_currentPage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allRecords, pageLimit, totalPages, totalRecords]);

	const handleClick = (page) => {
		gotoPage(page);
	};

	const handleMoveLeft = () => {
		gotoPage(currentPage - pageNeighbours * 2 - 1);
	};

	const handleMoveRight = () => {
		gotoPage(currentPage + pageNeighbours * 2 + 1);
	};

	const fetchPageNumbers = () => {
		const totalNumbers = pageNeighbours * 2 + 3;
		const totalBlocks = totalNumbers + 2;

		if (totalPages > totalBlocks) {
			const startPage = Math.max(2, currentPage - pageNeighbours);
			const endPage = Math.min(
				totalPages - 1,
				currentPage + pageNeighbours
			);
			let pages = range(startPage, endPage);

			const hasLeftSpill = startPage > 2;
			const hasRightSpill = totalPages - endPage > 1;
			const spillOffset = totalNumbers - (pages.length + 1);

			switch (true) {
				case hasLeftSpill && !hasRightSpill: {
					const extraPages = range(
						startPage - spillOffset,
						startPage - 1
					);
					pages = [LEFT_PAGE, ...extraPages, ...pages];
					break;
				}

				case !hasLeftSpill && hasRightSpill: {
					const extraPages = range(
						endPage + 1,
						endPage + spillOffset
					);
					pages = [...pages, ...extraPages, RIGHT_PAGE];
					break;
				}

				case hasLeftSpill && hasRightSpill:
				default: {
					pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
					break;
				}
			}

			return [1, ...pages, totalPages];
		}

		return range(1, totalPages);
	};

	let contentRendered = null;
	if (!totalRecords || totalPages === 1) contentRendered = null;
	else {
		const pages = fetchPageNumbers();

		contentRendered = (
			<div className="pagination">
				{/*---- On Mobile ----*/}
				{/* <div className="pagination__mobile">
          <span
            aria-label="Previous"
            onClick={handleMoveLeft}
            className="pagination__item pagination__item--left"
          >
            Previous
          </span>
          <span
            aria-label="Next"
            onClick={handleMoveRight}
            className="pagination__item pagination__item--right"
          >
            Next
          </span>
        </div> */}

				<div className="pagination__desktop">
					<div>
						<p className="pagination__info">
							Showing
							<span
								className="text-bold text-medium"
								style={{ fontSize: "15px" }}
							>
								{" "}
								1{" "}
							</span>
							to
							<span
								className="text-bold text-medium"
								style={{ fontSize: "15px" }}
							>
								{" "}
								10{" "}
							</span>
							of
							<span
								className="text-bold text-medium"
								style={{ fontSize: "15px" }}
							>
								{" "}
								{totalRecords}{" "}
							</span>
							results
						</p>
					</div>
				</div>
				<div>
					<nav className="pagination__list" aria-label="Pagination">
						{pages.map((page, index) => {
							if (page === LEFT_PAGE)
								return (
									<span
										key={index}
										aria-label="Previous"
										onClick={handleMoveLeft}
										className="pagination__item pagination__item--left"
									>
										<i className="fas fa-chevron-left icon-arrow icon-arrow__left"></i>
									</span>
								);

							if (page === RIGHT_PAGE)
								return (
									<span
										key={index}
										aria-label="Next"
										onClick={handleMoveRight}
										className="pagination__item pagination__item--right"
									>
										<i className="fas fa-chevron-right icon-arrow icon-arrow__right"></i>
									</span>
								);

							return (
								<span
									key={index}
									onClick={() => handleClick(page)}
									className={`pagination__item${
										currentPage === page
											? " pagination__item--current"
											: ""
									}`}
								>
									{page}
								</span>
							);
						})}
					</nav>
				</div>
			</div>
		);
	}

	return <Fragment>{contentRendered}</Fragment>;
}

Pagination.propTypes = {
	allRecords: PropTypes.array,
	totalRecords: PropTypes.number,
	pageLimit: PropTypes.number,
	pageNeighbours: PropTypes.number,
	onPageChanged: PropTypes.func,
};

Pagination.defaultProps = {
	allRecords: [],
	totalRecords: 0,
	pageLimit: 10,
	pageNeighbours: 1,
	onPageChanged: null,
};

export default Pagination;
