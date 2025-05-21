
import { CarType, RepairService } from "../contexts/BookingContext";

export const carTypeOptions = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "truck", label: "Truck" },
  { value: "sports", label: "Sports Car" },
  { value: "electric", label: "Electric Vehicle" },
];

export const serviceOptions = [
  { 
    value: "oilChange", 
    label: "Oil Change",
    description: "Complete oil replacement with filter change",
    duration: "30-45 min",
  },
  { 
    value: "tireRotation", 
    label: "Tire Rotation",
    description: "Rotate and balance all tires for even wear",
    duration: "45-60 min",
  },
  { 
    value: "brakeService", 
    label: "Brake Service",
    description: "Inspect, replace, and adjust brake components",
    duration: "60-90 min",
  },
  { 
    value: "engineRepair", 
    label: "Engine Repair",
    description: "Diagnose and fix engine performance issues",
    duration: "Varies",
  },
  { 
    value: "batteryReplacement", 
    label: "Battery Replacement",
    description: "Install new battery and check charging system",
    duration: "15-30 min",
  },
];

export const getCarTypeLabel = (type: CarType | null): string => {
  return carTypeOptions.find((option) => option.value === type)?.label || "";
};

export const getServiceLabel = (service: RepairService | null): string => {
  return serviceOptions.find((option) => option.value === service)?.label || "";
};

export const getServiceDetails = (service: RepairService | null) => {
  return serviceOptions.find((option) => option.value === service);
};
