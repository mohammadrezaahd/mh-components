import { useLayoutEffect, useRef, useState, type ChangeEvent } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const INITIAL_CONFIG = {
  viewNumber: 4,
  slidesToMove: 3,
  gap: 20,
  slideWidth: 0,
  stepDistance: 0,
};

const SLIDES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const SliderComponent = () => {
  const [translateX, setTranslateX] = useState(0);
  const [sliderConfig, setSliderConfig] = useState(INITIAL_CONFIG);

  const trackRef = useRef<HTMLDivElement>(null);

  const { viewNumber, slidesToMove, gap, slideWidth, stepDistance } =
    sliderConfig;

  const maxDistance =
    Math.max(0, SLIDES.length - viewNumber) * (slideWidth + gap);

  const isFirstSlide = translateX === 0;
  const isLastSlide = -translateX >= maxDistance;

  useLayoutEffect(() => {
    const trackElement = trackRef.current;
    if (!trackElement) return;

    const styles = window.getComputedStyle(trackElement);

    const currentGap = parseFloat(styles.columnGap) || 0;
    const currentWidth = parseFloat(styles.width) || 0;

    const currentSlideWidth =
      (currentWidth - (viewNumber - 1) * currentGap) / viewNumber;

    const currentStepDistance = slidesToMove * (currentSlideWidth + currentGap);

    setSliderConfig((prev) => ({
      ...prev,
      gap: currentGap,
      slideWidth: currentSlideWidth,
      stepDistance: currentStepDistance,
    }));

    setTranslateX(0);
  }, [viewNumber, slidesToMove]);

  const navigateSlider = (direction: "next" | "prev") => {
    setTranslateX((currentPosition) => {
      const nextPosition =
        direction === "next"
          ? currentPosition - stepDistance
          : currentPosition + stepDistance;

      return Math.max(-maxDistance, Math.min(0, nextPosition));
    });
  };

  const handleSlidesToMoveChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (!Number.isInteger(value) || value <= 0) return;

    setSliderConfig((prev) => ({
      ...prev,
      slidesToMove: value,
    }));
  };

  const handleViewNumberChange = (value: number) => {
    setSliderConfig((prev) => ({
      ...prev,
      viewNumber: value,
    }));
  };

  const resetSlider = () => {
    setSliderConfig(INITIAL_CONFIG);
    setTranslateX(0);
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

      {/* SLIDER CONFIG */}
      <section className="w-full max-w-6xl rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-slate-200">
              Slides per view
            </span>

            <div className="flex flex-wrap gap-2">
              {[2, 4, 6, 8, 10, 12].map((count) => (
                <button
                  key={count}
                  onClick={() => handleViewNumberChange(count)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${
                    viewNumber === count
                      ? "border-cyan-400 bg-cyan-400 text-slate-950"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700"
                  }`}
                >
                  {count}
                </button>
              ))}
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
              value={slidesToMove}
              onChange={handleSlidesToMoveChange}
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
                className="slider_track flex h-full w-full items-center justify-start gap-5 bg-slate-900"
                style={{
                  transform: `translateX(${translateX}px)`,
                  transition: "transform 0.4s ease",
                }}
              >
                {SLIDES.map((slide) => (
                  <div
                    key={slide}
                    className="slider_slide flex h-full shrink-0 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-blue-500 to-indigo-700 text-3xl font-bold shadow-lg"
                    style={{
                      width: `${slideWidth}px`,
                    }}
                  >
                    <span className="drop-shadow-md">{slide}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Previous slides"
          disabled={isFirstSlide}
          onClick={() => navigateSlider("prev")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <IoIosArrowDropleft size={30} />
        </button>

        <button
          type="button"
          aria-label="Next slides"
          disabled={isLastSlide}
          onClick={() => navigateSlider("next")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <IoIosArrowDropright size={30} />
        </button>

        <button
          type="button"
          onClick={resetSlider}
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
        >
          Reset
        </button>
      </div>
    </main>
  );
};
