
export type CarType = "sedan" | "suv" | "truck" | "sports" | "electric" | "minibus" | "pickup" | "tricycle" | "commercial";
export type RepairService = "oilChange" | "tireRotation" | "brakeService" | "engineRepair" | "batteryReplacement" | "acService" | "suspension" | "diagnostics" | "carWash";

export interface Station {
  id: string;
  name: string;
  address: string;
  distance: number; // in kilometers
  services: RepairService[];
  rating: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export type BookingState = {
  carType: CarType | null;
  service: RepairService | null;
  selectedStation: Station | null;
  selectedTimeSlot: TimeSlot | null;
  isLoading: boolean;
  stations: Station[];
  timeSlots: TimeSlot[];
  isBookingComplete: boolean;
  errors: {
    carType?: string;
    service?: string;
    station?: string;
    timeSlot?: string;
  };
};

export type BookingAction =
  | { type: "SET_CAR_TYPE"; payload: CarType }
  | { type: "SET_SERVICE"; payload: RepairService }
  | { type: "SET_SELECTED_STATION"; payload: Station }
  | { type: "SET_SELECTED_TIME_SLOT"; payload: TimeSlot }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_STATIONS"; payload: Station[] }
  | { type: "SET_TIME_SLOTS"; payload: TimeSlot[] }
  | { type: "COMPLETE_BOOKING" }
  | { type: "RESET_BOOKING" }
  | { type: "SET_ERROR"; payload: { field: keyof BookingState["errors"]; message: string } };

export type BookingContextType = {
  state: BookingState;
  setCarType: (carType: CarType) => void;
  setService: (service: RepairService) => void;
  selectStation: (station: Station) => void;
  selectTimeSlot: (timeSlot: TimeSlot) => void;
  fetchStations: () => Promise<void>;
  fetchTimeSlots: (stationId: string) => Promise<void>;
  bookAppointment: () => Promise<boolean>;
  resetBooking: () => void;
};
