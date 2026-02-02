import Link from "next/link";
import BackgroundPattern from "@/components/BackgroundPattern";
import Reaper from "@/components/Reaper";
import Lamp from "@/components/Lamp";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] p-15 md:p-5 overflow-hidden">
      <BackgroundPattern />

      <div className="relative z-10 w-full max-w-4xl p-8 rounded-3xl bg-base-200/50 backdrop-blur-xs border border-base-content/10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 min-h-[400px]">
          <div className="relative flex flex-col justify-center items-center h-full min-h-[300px]">
            <div className="relative w-full h-full flex items-center justify-center scale-90 md:scale-100">
              <div className="absolute pl-60 z-20 move-vertical">
                <div className="move-horizontal">
                  <div className="move-sway">
                    <Lamp sizeMultiplier={0.6} />
                  </div>
                </div>
              </div>

              <div
                className="absolute h-80 md:h-100 z-10 move-vertical"
                style={{ animationDelay: "1s" }}
              >
                <div
                  className="move-horizontal"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="move-sway" style={{ animationDelay: "1.5s" }}>
                    <Reaper sizeMultiplier={0.6} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="grow grid place-items-center relative -mt-10 md:mt-0">
              <h1 className="text-[8rem] md:text-[10rem] lg:text-[12rem] font-extrabold text-primary/50 select-none leading-none">
                404
              </h1>
              <span className="absolute text-2xl font-bold text-base-content uppercase tracking-widest opacity-80">
                Page Not Found
              </span>
            </div>

            <p className="text-xl text-center my-12 text-base-content/80 font-semibold">
              Oops! This page doesn't exist or was moved.
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="
              block w-full py-4 rounded-xl
              font-bold text-xl text-center text-primary-content
              bg-primary shadow-lg
              hover:shadow-xl hover:shadow-primary/20
              hover:brightness-110
              active:scale-[0.99]
              transition-all duration-200 ease-in-out
            "
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
