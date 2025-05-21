
import { CarType, RepairService } from "../contexts/BookingContext";

export const carTypeOptions = [
  { value: "sedan", label: "Sedan", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" },
  { value: "suv", label: "SUV", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80" },
  { value: "truck", label: "Truck", image: "https://images.unsplash.com/photo-1541899408-e12486dcc5bf?auto=format&fit=crop&q=80" },
  { value: "sports", label: "Sports Car", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80" },
  { value: "electric", label: "Electric Vehicle", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80" },
  { value: "minibus", label: "Minibus", image: "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?auto=format&fit=crop&q=80" },
  { value: "pickup", label: "Pick-up", image: "https://images.unsplash.com/photo-1604605801370-3e6d2fbdf482?auto=format&fit=crop&q=80" },
  { value: "tricycle", label: "Tricycle (Keke)", image: "https://images.unsplash.com/photo-1630146406290-7cef8e7fb49f?auto=format&fit=crop&q=80" },
  { value: "commercial", label: "Commercial Bus", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80" },
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
  { 
    value: "acService", 
    label: "AC Servicing",
    description: "Full air conditioning system check and recharge",
    duration: "60-90 min",
  },
  { 
    value: "suspension", 
    label: "Suspension Repair",
    description: "Check and repair suspension system components",
    duration: "90-120 min",
  },
  { 
    value: "diagnostics", 
    label: "Computer Diagnostics",
    description: "Full electronic system scan and troubleshooting",
    duration: "30-45 min",
  },
  { 
    value: "carWash", 
    label: "Executive Car Wash",
    description: "Complete interior and exterior cleaning",
    duration: "45-60 min",
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

export const getCarTypeImage = (type: CarType | null): string => {
  return carTypeOptions.find((option) => option.value === type)?.image || "";
};
