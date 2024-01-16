const useScrollTo = () => {
    const scrollTo = (ref) => {
        console.log("**** ScrollTo", ref.current.offsetTop);
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      });
    };
  
    return { scrollTo };
  };
  
  export default useScrollTo;