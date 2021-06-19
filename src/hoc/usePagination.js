import { useState } from "react";

const usePagination = () => {
	const [currentRecord, setCurrentRecord] = useState([]);

	function onPageChanged(data) {
		const { _currentRecord } = data;

		const currentRecord = _currentRecord;

		setCurrentRecord(currentRecord);
	}

	return { currentRecord, onPageChanged };
};

export default usePagination;
