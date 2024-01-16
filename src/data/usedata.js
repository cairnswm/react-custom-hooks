import { useState } from "react";
import useFetch from "./usefetch";
import useFilter from "./usefilter";
import usePagination from "./usepagination";
import useSort from "./usesort";

const useData = (url, defaultFilterFields = ["name"], options = {}) => {
  const { data: rawData, mutate, isLoading, isError, refetch } = useFetch(url, options);

  const {
    data: filteredData,
    filterValue,
    setFilterValue,
  } = useFilter(rawData, defaultFilterFields);

  const {
    data: sortedData,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
  } = useSort(filteredData);

  const {
    data: currentData,
    itemsPerPage,
    setItemsPerPage,
    nextPage,
    prevPage,
    jumpPage,
    page,
    setPage,
    maxPage,
  } = usePagination(sortedData);

  return {
    data: currentData,
    mutate,
    isLoading,
    isError,
    refetch,
    filterValue,
    setFilterValue,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    itemsPerPage,
    setItemsPerPage,
    nextPage,
    prevPage,
    jumpPage,
    page,
    setPage,
    maxPage,
  };
};

export default useData;
