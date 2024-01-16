import { useState, useEffect } from "react";

const SplashScreen = ({color, children}) => {
  return <div style={{ backgroundColor: color, position: "absolute", top: "0px", bottom:"0px", left: "0px", right:"0px" }} >
    {children}
  </div>
}

const useSplash = (delay = 2500) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, delay);
  }, [delay]);

  return { showSplash, SplashScreen };
};

export default useSplash;
