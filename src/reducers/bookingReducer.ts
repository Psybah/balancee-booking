
import { BookingState, BookingAction } from "../types/booking";

export const initialState: BookingState = {
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

export const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
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
