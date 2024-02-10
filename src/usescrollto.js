const useScrollTo = () => {
    const scrollTo = (ref) => {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      });
    };
  
    return { scrollTo };
  };
  
  export default useScrollTo;