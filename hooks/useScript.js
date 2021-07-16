import { useState, useEffect } from "react";
import { isServer } from "../utils/environment";


export default function useScript({
  src,
  checkForExisting = false,
  pending,
  ...attributes
}) {
  const [loading, setLoading] = useState(Boolean(src));
  const [error, setError] = useState(null);

  useEffect(() => {
    //src  return
    if (isServer || !src) {
      return;
    }

    // pending true  return;
    if (pending) {
      return;
    }

   
    if (checkForExisting) {
      const existing = document.querySelectorAll(`script[src="${src}"]`);
      if (existing.length > 0) {
        setLoading(false);
        return;
      }
    }

    // script src attribute 
    const scriptEl = document.createElement("script");

    scriptEl.setAttribute("src", src);

    Object.keys(attributes).forEach((key) => {
      scriptEl.setAttribute(key, attributes[key]);
    });

    // load, error 
    const handleLoad = () => {
      setLoading(false);
    };

    const handleError = (error) => {
      console.error(error);
      setError(error);
    };

    scriptEl.addEventListener("load", handleLoad);
    scriptEl.addEventListener("error", handleError);

    // script tag  document  attach 
    document.body.appendChild(scriptEl);

    return () => {
      scriptEl.removeEventListener("load", handleLoad);
      scriptEl.removeEventListener("error", handleError);
      scriptEl.remove();
    };
    // src 
  }, [src, pending]);

  return { loading, error };
}