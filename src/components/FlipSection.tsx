"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Button from "./Button";
import Image, { StaticImageData } from "next/image";

// --- Front Content ---
// Props for the FrontContent component
interface FrontContentProps {
  onToggleClick: () => void;
  title: string;
  imgLink: string | StaticImageData;
  imgAlt: string;
  text: string;
  buttonText?: string;
  buttonLink?: string;
}

// Renders the "front" side of the flip section
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
    <h2 className="text-2xl md:text-3xl font-extrabold text-base-content text-center mb-6 md:mb-8">
      {title}
    </h2>
    <div className="flex flex-col md:flex-row items-stretch md:gap-12">
      {/* Clickable Image */}
      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <Image
          src={imgLink}
          alt={imgAlt}
          onClick={onToggleClick}
          sizes="(max-width: 768px) 100vw, 384px"
          role="button"
          tabIndex={0}
          aria-label="Click?"
          className="
            rounded-4xl shadow-xl w-full aspect-4/3 md:aspect-square
            object-cover cursor-pointer transition-transform duration-300
            hover:opacity-90"
        />
      </div>

      {/*Text Content */}
      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <p className="mt-4 text-xl text-base-content text-left">{text}</p>

        {/* Optional Button */}
        {buttonText && buttonLink && (
          <Button link={buttonLink} text={buttonText} />
        )}
      </div>
    </div>
  </div>
);

// --- Back Content ---
// Props for the BackContent component
interface BackContentProps {
  onToggleClick: () => void;
  children: ReactNode;
  title: string;
  textAlt: string;
  buttonText?: string;
  buttonLink?: string;
}

// Renders the "back" side of the flip section
const BackContent = ({
  onToggleClick,
  title,
  children,
  textAlt,
  buttonText,
  buttonLink,
}: BackContentProps) => (
  <div className="flex flex-col">
    <h2 className="text-2xl md:text-3xl font-extrabold text-base-content text-center mb-6 md:mb-8">
      {title}
    </h2>
    <div className="flex flex-col md:flex-row items-stretch md:gap-12">
      {/* Clickable Children container (replaces the image) */}
      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <div
          onClick={onToggleClick}
          role="button"
          tabIndex={0}
          aria-label="Unflip"
          className="
            rounded-4xl w-full aspect-4/3 md:aspect-square 
            transition-transform duration-300 hover:opacity-90 
            cursor-pointer flex items-center justify-center overflow-hidden bg-base-dark
            shadow-[inset_0_3px_0_0_var(--color-accent)]
        "
        >
          {children}
        </div>
      </div>

      {/* Alternative Text Content */}
      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <p className="mt-4 text-xl text-base-content text-left">{textAlt}</p>

        {/* Optional Button */}
        {buttonText && buttonLink && (
          <Button link={buttonLink} text={buttonText} />
        )}
      </div>
    </div>
  </div>
);

// --- Main Flip Section ---
/**
 * Props for the main FlipSection component.
 * Combines props from both Front and Back content, plus the children for the back.
 */
interface FlipSectionProps {
  children: ReactNode;
  textAlt: string;

  title: string;
  imgLink: string | StaticImageData;
  imgAlt: string;
  text: string;
  buttonText?: string;
  buttonLink?: string;
}

// Component that displays content and "flips" when clicked.
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

  // Toggles the `isFlipped` state.
  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };

  // Common transition classes for the fade effect
  const transitionClasses = "transition-all duration-700 ease-in-out";

  return (
    // Container to establish positioning context
    <div className="relative z-10 max-w-7xl mx-auto">
      {/* Front Content Wrapper */}
      <div
        className={`
            ${transitionClasses}
            ${isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"}
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

      {/* Back Content Wrapper */}
      <div
        className={`
            absolute top-0 left-0 w-full
            ${transitionClasses}
            ${isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"}
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
