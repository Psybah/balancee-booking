
import { useState } from "react";
import { useBooking } from "../../contexts/BookingContext";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export function TimeSlotSelection() {
  const { state, selectTimeSlot } = useBooking();
  const {
    selectedStation,
    timeSlots,
    selectedTimeSlot,
    isLoading,
    errors,
  } = state;
  const [isOpen, setIsOpen] = useState(true);

  if (!selectedStation) {
    return null;
  }

  // Group time slots by morning, afternoon, evening
  const morningSlots = timeSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour >= 0 && hour < 12;
  });

  const afternoonSlots = timeSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour >= 12 && hour < 17;
  });

  const eveningSlots = timeSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour >= 17 && hour < 24;
  });

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <Card className="p-6 mt-6 glass-card animate-fade-in animation-delay-400 cosmic-gradient">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold">Available Time Slots</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle time slots</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <p className="text-muted-foreground mb-4">
          {selectedStation.name} • Today
        </p>
        <Separator className="my-4" />

        <CollapsibleContent>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : timeSlots.length > 0 ? (
            <div className="space-y-6">
              {morningSlots.length > 0 && (
                <div>
                  <h3 className="text-md font-medium mb-2">Morning</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {morningSlots.map((slot) => (
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
                        } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => slot.available && selectTimeSlot(slot)}
                      >
                        {formatTime(slot.time)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {afternoonSlots.length > 0 && (
                <div>
                  <h3 className="text-md font-medium mb-2">Afternoon</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {afternoonSlots.map((slot) => (
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
                        } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => slot.available && selectTimeSlot(slot)}
                      >
                        {formatTime(slot.time)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {eveningSlots.length > 0 && (
                <div>
                  <h3 className="text-md font-medium mb-2">Evening</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {eveningSlots.map((slot) => (
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
                        } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => slot.available && selectTimeSlot(slot)}
                      >
                        {formatTime(slot.time)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

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
        </CollapsibleContent>
      </Collapsible>

      {!isOpen && selectedTimeSlot && (
        <div className="mt-4 bg-muted/20 p-3 rounded-md flex justify-between items-center">
          <span className="font-medium">Selected: {formatTime(selectedTimeSlot.time)}</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsOpen(true)}
          >
            Change
          </Button>
        </div>
      )}

      {errors.timeSlot && (
        <p className="text-destructive text-sm mt-4">{errors.timeSlot}</p>
      )}
    </Card>
  );
}
