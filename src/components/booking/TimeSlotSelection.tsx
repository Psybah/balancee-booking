
import { useBooking } from "../../contexts/BookingContext";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export function TimeSlotSelection() {
  const { state, selectTimeSlot } = useBooking();
  const {
    selectedStation,
    timeSlots,
    selectedTimeSlot,
    isLoading,
    errors,
  } = state;

  if (!selectedStation) {
    return null;
  }

  return (
    <Card className="p-6 mt-6 glass-card animate-fade-in animation-delay-400 cosmic-gradient">
      <h2 className="text-2xl font-semibold mb-2">Available Time Slots</h2>
      <p className="text-muted-foreground mb-4">
        {selectedStation.name} • Today
      </p>
      <Separator className="my-4" />

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-12" />
          ))}
        </div>
      ) : timeSlots.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {timeSlots.map((slot) => (
              <Button
                key={slot.id}
                variant={
                  selectedTimeSlot?.id === slot.id ? "default" : "outline"
                }
                disabled={!slot.available}
                className={`h-12 transition-all ${
                  selectedTimeSlot?.id === slot.id
                    ? "bg-balancee-blue text-white dark:bg-balancee-orange"
                    : ""
                } ${
                  !slot.available
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => slot.available && selectTimeSlot(slot)}
              >
                {slot.time}
              </Button>
            ))}
          </div>
          {timeSlots.every((slot) => !slot.available) && (
            <p className="text-center text-muted-foreground mt-4">
              No available slots for today. Please try another station.
            </p>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No time slots available.</p>
        </div>
      )}
      {errors.timeSlot && (
        <p className="text-destructive text-sm mt-4">{errors.timeSlot}</p>
      )}
    </Card>
  );
}
