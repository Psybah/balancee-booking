
import { CarType, RepairService, Station, TimeSlot } from "../types/booking";

// Mock stations data
export const fetchStations = async (carType: CarType, service: RepairService): Promise<Station[]> => {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data based on selections with Nigerian locations
  const mockStations: Station[] = [
    {
      id: "station-1",
      name: "Balanceè Ikeja",
      address: "14 Allen Avenue, Ikeja, Lagos",
      distance: 1.9,
      services: ["oilChange", "tireRotation", "brakeService", "batteryReplacement", "acService"],
      rating: 4.8,
    },
    {
      id: "station-2",
      name: "Balanceè Lekki",
      address: "Admiralty Way, Lekki Phase 1, Lagos",
      distance: 4.0,
      services: ["oilChange", "tireRotation", "engineRepair", "suspension", "diagnostics"],
      rating: 4.6,
    },
    {
      id: "station-3",
      name: "Balanceè Victoria Island",
      address: "24 Adeola Odeku Street, Victoria Island, Lagos",
      distance: 6.1,
      services: ["tireRotation", "brakeService", "engineRepair", "batteryReplacement", "carWash"],
      rating: 4.7,
    },
    {
      id: "station-4",
      name: "Balanceè Abuja Central",
      address: "Plot 5, Wuse II, Abuja FCT",
      distance: 6.8,
      services: ["oilChange", "acService", "suspension", "diagnostics", "carWash"],
      rating: 4.9,
    },
    {
      id: "station-5",
      name: "Balanceè Port Harcourt",
      address: "32 Aba Road, GRA Phase 2, Port Harcourt",
      distance: 8.2,
      services: ["engineRepair", "brakeService", "diagnostics", "suspension", "batteryReplacement"],
      rating: 4.5,
    }
  ];

  // Filter by service
  return mockStations.filter((station) => station.services.includes(service));
};

// Mock time slots data
export const fetchTimeSlots = async (stationId: string): Promise<TimeSlot[]> => {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Generate mock time slots with 12-hour format (9 AM to 8 PM)
  const mockTimeSlots: TimeSlot[] = [
    { id: "slot-9", time: "9:00", available: Math.random() > 0.3 },
    { id: "slot-10", time: "10:00", available: Math.random() > 0.3 },
    { id: "slot-11", time: "11:00", available: Math.random() > 0.3 },
    { id: "slot-12", time: "12:00", available: Math.random() > 0.3 },
    { id: "slot-13", time: "13:00", available: Math.random() > 0.3 },
    { id: "slot-14", time: "14:00", available: Math.random() > 0.3 },
    { id: "slot-15", time: "15:00", available: Math.random() > 0.3 },
    { id: "slot-16", time: "16:00", available: Math.random() > 0.3 },
    { id: "slot-17", time: "17:00", available: Math.random() > 0.3 },
    { id: "slot-18", time: "18:00", available: Math.random() > 0.3 },
    { id: "slot-19", time: "19:00", available: Math.random() > 0.3 },
    { id: "slot-20", time: "20:00", available: Math.random() > 0.3 },
  ];

  return mockTimeSlots;
};

// Mock booking API
export const bookAppointment = async (): Promise<boolean> => {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return true;
};
