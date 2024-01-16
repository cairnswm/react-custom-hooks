// import useRawData from "./userawdata"
// import useFilter from "./usefilter"
// import usePagination from "./usepagination";
// import useSorting from "./usesorting";

// const useUsers = () => {
//     const { data: rawData, isLoading, isError, refetch } = useRawData("https://jsonplaceholder.typicode.com/users");

//     const { data: filteredData, filterValue, setFilterValue } = useFilter(rawData, ["name", "email", "username"]);

//     const { data: sortedData, sortField, setSortField, sortDirection, setSortDirection } = useSorting(filteredData);

//     const { data: currentData, itemsPerPage, setItemsPerPage, nextPage, prevPage, jumpPage, page, setPage, maxPage } = usePagination(sortedData, 6);

//     return { data: currentData, isLoading, isError, refetch, 
//         filterValue, setFilterValue,
//         sortField, setSortField, sortDirection, setSortDirection,
//         itemsPerPage, setItemsPerPage, nextPage, prevPage, jumpPage, page, setPage, maxPage,
//     }
// }

// export default useUsers