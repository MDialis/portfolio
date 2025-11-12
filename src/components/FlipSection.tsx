"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface FrontContentProps {
  onToggleClick: () => void;
  title: string;
  imgLink: string;
  imgAlt: string;
  text: string;
  buttonText?: string;
  buttonLink?: string;
}

const FrontContent = ({
  onToggleClick,
  title,
  imgLink,
  imgAlt,
  text,
  buttonText,
  buttonLink,
}: FrontContentProps) => (
  <div className="flex flex-col">
    <h2 className="text-2xl md:text-3xl font-extrabold text-accent text-center mb-6 md:mb-8">
      {title}
    </h2>
    <div className="flex flex-col md:flex-row items-stretch md:gap-12">
      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <img
          src={imgLink}
          alt={imgAlt}
          onClick={onToggleClick}
          role="button"
          tabIndex={0}
          aria-label="Click?"
          className="rounded-4xl shadow-xl w-full aspect-square object-cover cursor-pointer transition-transform duration-300 hover:opacity-90"
        />
      </div>

      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <p className="mt-4 text-xl text-base-content text-left">{text}</p>
        {buttonText && buttonLink && (
          <div className="mt-10 flex justify-end p-5">
            <a
              href={buttonLink}
              className="px-6 py-3 rounded-lg font-semibold text-primary-content bg-primary shadow-lg hover:opacity-80 transition-colors"
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);

interface BackContentProps {
  onToggleClick: () => void;
  children: ReactNode;
  title: string;
  textAlt: string;
  buttonText?: string;
  buttonLink?: string;
}

const BackContent = ({
  onToggleClick,
  title,
  children,
  textAlt,
  buttonText,
  buttonLink,
}: BackContentProps) => (
  <div className="flex flex-col">
    <h2 className="text-2xl md:text-3xl font-extrabold text-accent text-center mb-6 md:mb-8">
      {title}
    </h2>
    <div className="flex flex-col md:flex-row items-stretch md:gap-12">
      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <div
          onClick={onToggleClick}
          role="button"
          tabIndex={0}
          aria-label="Unflip"
          className="
            rounded-4xl w-full aspect-square 
            transition-transform duration-300 hover:opacity-90 
            cursor-pointer flex items-center justify-center overflow-hidden bg-base-dark
            shadow-[inset_0_2px_0_0_var(--color-accent)]
        ">
          {children}
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <p className="mt-4 text-xl text-base-content text-left">{textAlt}</p>
        {buttonText && buttonLink && (
          <div className="mt-10 flex justify-end p-5">
            <a
              href={buttonLink}
              className="px-6 py-3 rounded-lg font-semibold text-primary-content bg-primary shadow-lg hover:opacity-80 transition-colors"
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);

interface FlipSectionProps {
  children: ReactNode;
  textAlt: string;

  title: string;
  imgLink: string;
  imgAlt: string;
  text: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function FlipSection({
  children,
  textAlt,

  title,
  imgLink,
  imgAlt,
  text,
  buttonText,
  buttonLink,
}: FlipSectionProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };

  const transitionClasses = "transition-all duration-700 ease-in-out";

  return (
    <div className="relative z-10 max-w-7xl mx-auto min-h-[400px]"> 
      <div
        className={`
            ${transitionClasses}
            ${
              isFlipped
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }
          `}
      >
        <FrontContent
          onToggleClick={handleToggle}
          title={title}
          imgLink={imgLink}
          imgAlt={imgAlt}
          text={text}
          buttonText={buttonText}
          buttonLink={buttonLink}
        />
      </div>

      <div
        className={`
            absolute top-0 left-0 w-full
            ${transitionClasses}
            ${
              isFlipped
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }
          `}
      >
        <BackContent
          onToggleClick={handleToggle}
          title={title}
          textAlt={textAlt}
          buttonText={buttonText}
          buttonLink={buttonLink}
        >
          {children}
        </BackContent>
      </div>
    </div>
  );
}
