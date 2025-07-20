import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const Slider = ({slidesArr}) => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  const onSelect = () => {
    if (!embla) return;
    setPrevDisabled(!embla.canScrollPrev());
    setNextDisabled(!embla.canScrollNext());
  };

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla]);

  return (
    <div className="relative w-full h-full">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slidesArr.map((item) => {
            return (
              <div
                key={item}
                className="flex-none w-full h-full flex items-center justify-center bg-gray-900 text-white"
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        disabled={prevDisabled}
        className="
        bg-white/30 backdrop-blur-md hover:bg-white/50
        absolute top-1/2 left-3 transform -translate-y-1/2 bg-opacity-70 hover:bg-opacity-100 text-gray-800 shadow-md rounded-full p-2 disabled:opacity-30 transition-all duration-200 hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        disabled={nextDisabled}
        className="
        bg-white/30 backdrop-blur-md hover:bg-white/50
        absolute top-1/2 right-3 transform -translate-y-1/2 bg-opacity-70 hover:bg-opacity-100 text-gray-800 shadow-md rounded-full p-2 disabled:opacity-30 transition-all duration-200 hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Slider;
