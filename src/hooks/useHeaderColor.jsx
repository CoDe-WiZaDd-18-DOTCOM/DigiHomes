import { useEffect, useState } from "react";

const useHeaderColor = () => {
  const [headerColor, setHeaderColor] = useState("none"); // Default color

  // Handle header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHeaderColor(window.scrollY > 8 ? "#302e2e" : "none");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return headerColor;
};

export default useHeaderColor;
