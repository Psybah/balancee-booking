import { useState } from "react";
import { useBooking } from "../../contexts/BookingContext";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { BookingConfirmationDialog } from "./BookingConfirmationDialog";
import { getCarTypeLabel, getServiceDetails, getServiceLabel } from "@/utils/helpers";

export function BookingSummary() {
  const { state, bookAppointment } = useBooking();
  const {
    carType,
    service,
    selectedStation,
    selectedTimeSlot,
    isLoading,
    isBookingComplete,
  } = state;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBookNow = async () => {
    const success = await bookAppointment();
    if (success) {
      setDialogOpen(true);
    }
  };

  if (!selectedTimeSlot) {
    return null;
  }

  const serviceDetails = service ? getServiceDetails(service) : null;

  return (
    <>
      <Card 
        id="booking-summary"
        className="p-4 sm:p-6 mt-4 sm:mt-6 glass-card animate-fade-in animation-delay-400 cosmic-gradient"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Booking Summary</h2>
        <Separator className="my-2 sm:my-4" />

        <div className="space-y-3 sm:space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Vehicle Type</h3>
              <p className="text-sm sm:text-base font-semibold">{getCarTypeLabel(carType)}</p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Service</h3>
              <p className="text-sm sm:text-base font-semibold">{getServiceLabel(service)}</p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Station</h3>
              <p className="text-sm sm:text-base font-semibold">{selectedStation?.name}</p>
              <p className="text-xs sm:text-sm">{selectedStation?.address}</p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Date & Time</h3>
              <p className="text-sm sm:text-base font-semibold">Today, {selectedTimeSlot?.time}</p>
            </div>
          </div>

          <Button
            onClick={handleBookNow}
            disabled={isLoading}
            className="w-full bg-balancee-orange hover:bg-balancee-orange/90 text-white text-sm sm:text-base py-2 sm:py-3"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
      </Card>

      <BookingConfirmationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
