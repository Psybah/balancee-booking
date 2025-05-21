
import { useEffect } from "react";
import { useBooking } from "../../contexts/BookingContext";
import { getCarTypeLabel, getServiceDetails, getServiceLabel } from "../../utils/helpers";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

export function BookingSummary() {
  const { state, bookAppointment, resetBooking } = useBooking();
  const {
    carType,
    service,
    selectedStation,
    selectedTimeSlot,
    isLoading,
    isBookingComplete,
  } = state;

  useEffect(() => {
    if (isBookingComplete) {
      // Scroll to the summary section when booking is complete
      const summary = document.getElementById("booking-summary");
      if (summary) {
        summary.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isBookingComplete]);

  if (!selectedTimeSlot) {
    return null;
  }

  const serviceDetails = getServiceDetails(service);

  return (
    <Card 
      id="booking-summary"
      className="p-6 mt-6 glass-card animate-fade-in animation-delay-400 cosmic-gradient"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {isBookingComplete ? "Booking Confirmed!" : "Booking Summary"}
      </h2>
      <Separator className="my-4" />

      {isBookingComplete ? (
        <div className="space-y-6 animate-scale-in">
          <div className="p-4 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-100 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Your service has been booked!</h3>
            <p>A confirmation email has been sent to your registered email address.</p>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-muted-foreground">Vehicle Type</h3>
              <p className="font-semibold">{getCarTypeLabel(carType)}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Service</h3>
              <p className="font-semibold">{getServiceLabel(service)}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Station</h3>
              <p className="font-semibold">{selectedStation?.name}</p>
              <p className="text-sm">{selectedStation?.address}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Date & Time</h3>
              <p className="font-semibold">Today, {selectedTimeSlot?.time}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Duration</h3>
              <p className="font-semibold">{serviceDetails?.duration || "Varies"}</p>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={resetBooking}
              className="w-full bg-balancee-blue hover:bg-balancee-blue/90 text-white dark:bg-balancee-orange dark:hover:bg-balancee-orange/90"
            >
              Book Another Service
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-muted-foreground">Vehicle Type</h3>
              <p className="font-semibold">{getCarTypeLabel(carType)}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Service</h3>
              <p className="font-semibold">{getServiceLabel(service)}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Station</h3>
              <p className="font-semibold">{selectedStation?.name}</p>
              <p className="text-sm">{selectedStation?.address}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Date & Time</h3>
              <p className="font-semibold">Today, {selectedTimeSlot?.time}</p>
            </div>
          </div>

          <Button
            onClick={bookAppointment}
            disabled={isLoading}
            className="w-full bg-balancee-orange hover:bg-balancee-orange/90 text-white"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </div>
            ) : (
              "Book Now"
            )}
          </Button>
        </div>
      )}
    </Card>
  );
}
