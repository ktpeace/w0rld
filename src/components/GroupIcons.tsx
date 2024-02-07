import { ReactElement } from "react";
import {
  AcademicCapIcon,
  MapIcon,
  PaintBrushIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  ScaleIcon,
} from "@heroicons/react/24/solid";

// Map icons to groups
interface GroupIconMapper {
  [key: number]: ReactElement | undefined;
}

export const iconClass = "h-5 w-5 text-gray-500 dark:text-parchment-300";

const groupIconMapper: GroupIconMapper = {
  1: <PaintBrushIcon key="1" className={iconClass} />, // University of Aesthematics
  2: <AcademicCapIcon key="2" className={iconClass} />, // UA Masters Course
  3: <PaperAirplaneIcon key="3" className={iconClass} />, // S.N.I.D.E.
  4: <MapIcon key="4" className={iconClass} />, // Journeymen
  5: <PhotoIcon key="5" className={iconClass} />, // Analog
  6: <ScaleIcon key="6" className={iconClass} />, // Gestalt
};

export default groupIconMapper;
