import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export const SliderComponent = () => {
  const [navigation, setNavigation] = useState<number>(0);
  const [viewNumber, setViewNumber] = useState<number>(4);
  const trackRef = useRef<HTMLDivElement>(null);

  const navigateSlider = (dir: "next" | "prev") => {
    const trackElement = trackRef?.current;
    if (!trackElement) return;
    const styles = window.getComputedStyle(trackElement);
    const gap = parseFloat(styles.columnGap);

    const slides = trackElement.children;
    const slideWidth = slides[0].getBoundingClientRect().width;

    const distance = slideWidth + gap;
    switch (dir) {
      case "next": {
        setNavigation((prev) => prev + distance);
        break;
      }

      case "prev": {
        setNavigation((prev) => prev - distance);
        break;
      }

      default:
        return;
    }
  };

  useEffect(() => {
    console.log(viewNumber);
  }, [viewNumber]);

  return (
    <div className="h-screen w-full bg-amber-300 flex justify-center flex-col gap-10">
      {/* SLIDES COUNT CONTROL */}

      <div className="count_control_container flex gap-3">
        {[...Array(12)].map(
          (_, index) =>
            (index + 1) % 2 === 0 && (
              <button
                onClick={() => setViewNumber(index + 1)}
                className="bg-blue-500 px-3 py-1 cursor-pointer"
                key={index}
              >
                {index + 1}
              </button>
            ),
        )}
      </div>

      {/* SLIDER */}
      <div className="slider_container w-full bg-purple-600 flex justify-center">
        <section className="slider_viewport h-80 w-11/12 rounded-none bg-red-600 flex justify-center overflow-hidden">
          <div
            ref={trackRef}
            className={`slider_track bg-red-600 w-12/12 h-full flex justify-start items-center gap-5 `}
            style={{
              transform: `translateX(${navigation}px)`,
              transition: ".4s",
            }}
          >
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className={`slider_slide bg-blue-600  h-full shrink-0`}
                style={{
                  width: `${100 / viewNumber}%`,
                }}
              >
                asd
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* NAVIGATION CONTROL */}
      <div className="controler_container flex">
        <IoIosArrowDropleft size={35} onClick={() => navigateSlider("prev")} />
        <IoIosArrowDropright size={35} onClick={() => navigateSlider("next")} />
      </div>
    </div>
  );
};
