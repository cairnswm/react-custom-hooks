import { useState, useEffect } from "react";

export const loadURLDetails = (valid) => {
  let hash = window.location.hash;
  hash = hash.split("?")[0].replace("#", "");

  const myURL = new URL(window.location.href);
  if (window.location.hash) {
    myURL.search = window.location.hash.substr(
      window.location.hash.indexOf("?")
    );
  }
  const hrefparams = [];
  myURL.searchParams.forEach((value, key) => {
    if (!valid || valid.includes(key)) {
      hrefparams.push({ key, value });
    }
  });

  return {
    href: window.location.href,
    hash: hash,
    params: hrefparams,
    hostname: window.location.hostname,
    port: window.location.port,
    pathname: window.location.pathname,
    path: window.location.pathname.split(/\//).filter((x) => x !== ""),
    protocol: window.location.protocol,
    set: (url) => {},
  };
};

export const useLocation = (valid) => {
  const [details, setDetails] = useState(loadURLDetails(valid));
  const [validParams] = useState(valid);

  const popstate = () => {
    setDetails(loadURLDetails(validParams));
  }
  const locationchange = () => {
    setDetails(loadURLDetails(validParams));
  }

  useEffect(() => {
    window.addEventListener("popstate", popstate);
    window.addEventListener("locationchange", locationchange);
    return () => {
      window.removeEventListener("popstate", popstate);
      window.removeEventListener("locationchange", locationchange);
    }
  }, []);

  const set = (url) => {
    window.history.pushState(null, "", url);
    setDetails(loadURLDetails(validParams));
  };

  useEffect(() => {
    setDetails(loadURLDetails(validParams));
  }, [validParams]);

  return { ...details, set };
};

export default useLocation;
