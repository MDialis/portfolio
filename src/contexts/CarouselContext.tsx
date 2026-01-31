"use client";

import { createContext, useContext } from "react";

// Default to 'true' so DistanceScaler works normally if used outside a carousel
const CarouselContext = createContext<boolean>(true);

export const useCarouselMoving = () => useContext(CarouselContext);

export const CarouselProvider = CarouselContext.Provider;