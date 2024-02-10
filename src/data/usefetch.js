import { useState, useEffect, useCallback } from "react";
import { useUser } from "../context/useuser";

const useFetch = (url, options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { token } = useUser();

  const fetchData = async () => {
    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;
    if (!options) {
      options = { headers: [] };
    }
    if (!options.headers) {
      options.headers = [];
    }
    if (!options?.headers?.token) {
      options.headers.token = token;
    }
    fetch(url, {
      signal,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          setData([data]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    return controller;
  };
  useEffect(() => {
    if (url) {
      const controller = fetchData();

      return () => {
        if (controller && controller.abort) {
          controller.abort();
        }
      };
    } else {
      setData([]);
    }
  }, [url]);

  // mutates in memory record, does not save to database
  const mutate = useCallback((field, value, newrecord) => {
    // console.log("MUTATE", field, value);
    let newData = data.map((row) => {
      if (row[field] === value) {
        return newrecord;
      }
      return row;
    });
    if (data.find((row) => row[field] === value) === undefined) {
      // console.log("Mutate: Record not found, adding", newrecord);
      newData.push(newrecord);
    }
    setData(newData);
  },[data]);

  const remove = useCallback((field, value) => {
    // console.log("DELETE", field, value);
    let newData = data.filter((row) => {
      return row[field] !== value;
    });
    setData(newData);
  },[data]);

  return {
    data,
    mutate,
    remove,
    isLoading: loading,
    isError: error,
    refetch: fetchData,
  };
};

export default useFetch;
