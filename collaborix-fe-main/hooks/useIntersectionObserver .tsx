import { useCallback, useEffect, useRef } from "react";

export const useIntersectionObserver = (
  callback: (postId: string) => void,
  options?: IntersectionObserverInit
) => {
  const observedElements = useRef(new Set());
  const observer = useRef<IntersectionObserver | null>(null);
  const observe = useCallback((element: HTMLElement | null) => {
    if (element && !observedElements.current.has(element)) {
      observer.current?.observe(element);
      observedElements.current.add(element);
    }
  }, []);
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          const postId = entry.target.getAttribute("data-post-id");
          if (postId) {
            callback(postId);
          }
        }
      });
    }, options);
    return () => {
      observer.current?.disconnect();
    };
  }, [callback, options]);

  return { observe };
};
