
import React, { createContext, useContext, useReducer } from "react";

export type CarType = "sedan" | "suv" | "truck" | "sports" | "electric";
export type RepairService = "oilChange" | "tireRotation" | "brakeService" | "engineRepair" | "batteryReplacement";

export interface Station {
  id: string;
  name: string;
  address: string;
  distance: number; // in miles
  services: RepairService[];
  rating: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

type BookingState = {
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

type BookingAction =
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

const initialState: BookingState = {
  carType: null,
  service: null,
  selectedStation: null,
  selectedTimeSlot: null,
  isLoading: false,
  stations: [],
  timeSlots: [],
  isBookingComplete: false,
  errors: {},
};

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case "SET_CAR_TYPE":
      return {
        ...state,
        carType: action.payload,
        errors: { ...state.errors, carType: undefined },
      };
    case "SET_SERVICE":
      return {
        ...state,
        service: action.payload,
        errors: { ...state.errors, service: undefined },
        selectedStation: null,
        selectedTimeSlot: null,
      };
    case "SET_SELECTED_STATION":
      return {
        ...state,
        selectedStation: action.payload,
        errors: { ...state.errors, station: undefined },
        selectedTimeSlot: null,
      };
    case "SET_SELECTED_TIME_SLOT":
      return {
        ...state,
        selectedTimeSlot: action.payload,
        errors: { ...state.errors, timeSlot: undefined },
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_STATIONS":
      return {
        ...state,
        stations: action.payload,
      };
    case "SET_TIME_SLOTS":
      return {
        ...state,
        timeSlots: action.payload,
      };
    case "COMPLETE_BOOKING":
      return {
        ...state,
        isBookingComplete: true,
      };
    case "RESET_BOOKING":
      return {
        ...initialState,
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.message,
        },
      };
    default:
      return state;
  }
};

type BookingContextType = {
  state: BookingState;
  setCarType: (carType: CarType) => void;
  setService: (service: RepairService) => void;
  selectStation: (station: Station) => void;
  selectTimeSlot: (timeSlot: TimeSlot) => void;
  fetchStations: () => Promise<void>;
  fetchTimeSlots: (stationId: string) => Promise<void>;
  bookAppointment: () => Promise<void>;
  resetBooking: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const setCarType = (carType: CarType) => {
    dispatch({ type: "SET_CAR_TYPE", payload: carType });
  };

  const setService = (service: RepairService) => {
    dispatch({ type: "SET_SERVICE", payload: service });
  };

  const selectStation = (station: Station) => {
    dispatch({ type: "SET_SELECTED_STATION", payload: station });
  };

  const selectTimeSlot = (timeSlot: TimeSlot) => {
    dispatch({ type: "SET_SELECTED_TIME_SLOT", payload: timeSlot });
  };

  const fetchStations = async () => {
    if (!state.carType || !state.service) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "service", message: "Please select both car type and service" },
      });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data based on selections
      const mockStations: Station[] = [
        {
          id: "station-1",
          name: "Balanceè Downtown",
          address: "123 Main St, City Center",
          distance: 1.2,
          services: ["oilChange", "tireRotation", "brakeService", "batteryReplacement"],
          rating: 4.8,
        },
        {
          id: "station-2",
          name: "Balanceè Eastside",
          address: "456 Oak Ave, East District",
          distance: 2.5,
          services: ["oilChange", "tireRotation", "engineRepair"],
          rating: 4.6,
        },
        {
          id: "station-3",
          name: "Balanceè Westside",
          address: "789 Pine Blvd, West Valley",
          distance: 3.8,
          services: ["tireRotation", "brakeService", "engineRepair", "batteryReplacement"],
          rating: 4.7,
        },
      ];

      // Filter by service
      const filteredStations = mockStations.filter((station) =>
        station.services.includes(state.service as RepairService)
      );

      dispatch({ type: "SET_STATIONS", payload: filteredStations });
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchTimeSlots = async (stationId: string) => {
    if (!stationId) return;

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate mock time slots for today
      const hours = Array.from({ length: 8 }, (_, i) => i + 9); // 9am to 4pm
      const mockTimeSlots: TimeSlot[] = hours.map((hour) => ({
        id: `slot-${hour}`,
        time: `${hour}:00 ${hour < 12 ? "AM" : "PM"}`.replace("12:00 PM", "12:00 PM"),
        available: Math.random() > 0.3, // Randomly make some slots unavailable
      }));

      dispatch({ type: "SET_TIME_SLOTS", payload: mockTimeSlots });
    } catch (error) {
      console.error("Error fetching time slots:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const bookAppointment = async () => {
    if (!state.carType) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "carType", message: "Please select a car type" },
      });
      return;
    }

    if (!state.service) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "service", message: "Please select a service" },
      });
      return;
    }

    if (!state.selectedStation) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "station", message: "Please select a station" },
      });
      return;
    }

    if (!state.selectedTimeSlot) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "timeSlot", message: "Please select a time slot" },
      });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      dispatch({ type: "COMPLETE_BOOKING" });
    } catch (error) {
      console.error("Error booking appointment:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const resetBooking = () => {
    dispatch({ type: "RESET_BOOKING" });
  };

  const value = {
    state,
    setCarType,
    setService,
    selectStation,
    selectTimeSlot,
    fetchStations,
    fetchTimeSlots,
    bookAppointment,
    resetBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
