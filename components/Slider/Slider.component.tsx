import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export const SliderComponent = () => {
  const [navigation, setNavigation] = useState<number>(0);
  const [viewNumber, setViewNumber] = useState<number>(4);
  const [slideToNavigate, setSlideToNavigate] = useState<number>(3);
  const [sliderConfigs, setSliderConfigs] = useState({
    distance: 0,
    slideWidth: 0,
  });
  const trackRef = useRef<HTMLDivElement>(null);

  const slides = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const firstSlide = navigation === 0; //initial value of navigation
  const lastSlide = navigation / sliderConfigs.slideWidth === slides.length;

  useEffect(() => {
    console.log("FIRST SLIDE", firstSlide);
    console.log("LAST SLIDE", lastSlide);
    console.log(navigation / sliderConfigs.slideWidth);
  }, [firstSlide, lastSlide]);

  useLayoutEffect(() => {
    const trackElement = trackRef?.current;
    if (!trackElement) return;

    const styles = window.getComputedStyle(trackElement);
    const gap = parseFloat(styles.columnGap);

    const slides = trackElement.children;
    const slideWidth = slides[0].getBoundingClientRect().width;

    const distance = slideToNavigate * (slideWidth + gap);

    setSliderConfigs({ distance, slideWidth });
  }, [slideToNavigate]);

  const navigateSlider = (dir: "next" | "prev") => {
    const { distance } = sliderConfigs;

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

  const changeSlidesToNavigate = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target?.value;

    if (!val || Number(val) <= 0) return;

    setSlideToNavigate(Number(val));
  };

  return (
    <main className="min-h-screen w-full bg-slate-950 text-white flex flex-col items-center justify-center gap-12 px-6 py-12">
      {/* HEADER */}
      <header className="w-full max-w-6xl flex flex-col gap-2">
        <span className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
          Slider Builder
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Interactive Slider
        </h1>
        <p className="text-sm text-slate-400">
          Customize your slide layout and navigation.
        </p>
      </header>

      {/* SLIDES COUNT CONTROL */}
      <section className="w-full max-w-6xl rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-slate-200">
              Slides per view
            </span>

            <div className="flex flex-wrap gap-2">
              {[...Array(12)].map(
                (_, index) =>
                  (index + 1) % 2 === 0 && (
                    <button
                      onClick={() => setViewNumber(index + 1)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${
                        viewNumber === index + 1
                          ? "border-cyan-400 bg-cyan-400 text-slate-950"
                          : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700"
                      }`}
                      key={index}
                    >
                      {index + 1}
                    </button>
                  ),
              )}
            </div>
          </div>

          <div className="h-px w-full bg-slate-800 sm:h-12 sm:w-px" />

          <div className="flex flex-col gap-3">
            <label
              htmlFor="slide-navigation"
              className="text-sm font-semibold text-slate-200"
            >
              Slides to move
            </label>

            <input
              id="slide-navigation"
              type="number"
              min={1}
              value={slideToNavigate}
              onChange={changeSlidesToNavigate}
              className="h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 sm:w-40"
            />
          </div>
        </div>
      </section>

      {/* SLIDER */}
      <section className="w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-2xl sm:p-5">
          <div className="slider_container flex w-full justify-center">
            <div className="slider_viewport h-72 w-full overflow-hidden rounded-xl sm:h-96">
              <div
                ref={trackRef}
                className="slider_track flex h-full w-12/12 items-center justify-start gap-5 bg-slate-900"
                style={{
                  transform: `translateX(${navigation}px)`,
                  transition: ".4s",
                }}
              >
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className="slider_slide flex h-full shrink-0 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-blue-500 to-indigo-700 text-3xl font-bold shadow-lg"
                    style={{
                      width: `${100 / viewNumber}%`,
                    }}
                  >
                    <span className="drop-shadow-md">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION CONTROL */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Previous slides"
          onClick={() => navigateSlider("prev")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-400 hover:text-slate-950"
        >
          <IoIosArrowDropleft size={30} />
        </button>

        <button
          type="button"
          aria-label="Next slides"
          onClick={() => navigateSlider("next")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-400 hover:text-slate-950"
        >
          <IoIosArrowDropright size={30} />
        </button>
      </div>
    </main>
  );
};
