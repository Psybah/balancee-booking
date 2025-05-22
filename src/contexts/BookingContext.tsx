
import React, { createContext, useContext, useReducer } from "react";
import { bookingReducer, initialState } from "../reducers/bookingReducer";
import { 
  BookingState,
  BookingContextType,
  Station,
  TimeSlot,
  CarType,
  RepairService
} from "../types/booking";
import * as bookingService from "../services/bookingService";

// Create the context
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
      const stations = await bookingService.fetchStations(state.carType, state.service);
      dispatch({ type: "SET_STATIONS", payload: stations });
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
      const timeSlots = await bookingService.fetchTimeSlots(stationId);
      dispatch({ type: "SET_TIME_SLOTS", payload: timeSlots });
    } catch (error) {
      console.error("Error fetching time slots:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const bookAppointment = async (): Promise<boolean> => {
    if (!state.carType) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "carType", message: "Please select a car type" },
      });
      return false;
    }

    if (!state.service) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "service", message: "Please select a service" },
      });
      return false;
    }

    if (!state.selectedStation) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "station", message: "Please select a station" },
      });
      return false;
    }

    if (!state.selectedTimeSlot) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "timeSlot", message: "Please select a time slot" },
      });
      return false;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const success = await bookingService.bookAppointment();
      if (success) {
        dispatch({ type: "COMPLETE_BOOKING" });
      }
      return success;
    } catch (error) {
      console.error("Error booking appointment:", error);
      return false;
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

// Re-export types from the types file for easier imports
export type { 
  CarType, 
  RepairService, 
  Station, 
  TimeSlot, 
  BookingState,
  BookingContextType
};
