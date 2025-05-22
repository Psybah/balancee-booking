
import { CarType, RepairService } from "../contexts/BookingContext";

export const carTypeOptions = [
  { value: "sedan", label: "Sedan", image: "https://sellatease.com/public-blog/wp-content/uploads/2024/06/1998001_2003_Corolla_S-5-1500x900-1-780x470.jpg" },
  { value: "suv", label: "SUV", image: "https://media.cdn-jaguarlandrover.com/api/v2/images/99903/w/1600/h/900.jpg" },
  { value: "truck", label: "Truck", image: "https://www.sinotrucknigeria.com/wp-content/uploads/2024/08/HOWO-Cargo-Truck-1-300x300.jpg" },
  { value: "sports", label: "Sports Car", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80" },
  { value: "electric", label: "Electric Vehicle", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80" },
  { value: "minibus", label: "Minibus", image: "https://nigeriansearchguide.com/wp-content/uploads/2023/10/Cost-Of-Shuttle-Mini-Buses-Korope-In-Nigeria.jpeg" },
  { value: "pickup", label: "Pick-up", image: "https://cdn.businessday.ng/2019/04/Ford-Ranger-Pick-Up.jpg" },
  { value: "tricycle", label: "Tricycle (Keke)", image: "https://cdn.punchng.com/wp-content/uploads/2016/07/24220616/KEKE-MARWA.jpg" },
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
