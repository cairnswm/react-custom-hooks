import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchData = async () => {
    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url, {
      signal,
      headers: { ...options.headers, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
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
  const mutate = (field, value, newrecord) => {
    let newData = data.map((row) => {
      if (row[field] === value) {
        return newrecord;
      }
      return row;
    });
    setData(newData);
  };

  return {
    data,
    mutate,
    isLoading: loading,
    isError: error,
    refetch: fetchData,
  };
};

export default useFetch;
