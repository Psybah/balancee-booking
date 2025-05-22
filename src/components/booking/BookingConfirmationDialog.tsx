
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useBooking } from "@/contexts/BookingContext";
import { getCarTypeLabel, getServiceLabel, getServiceDetails } from "@/utils/helpers";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingConfirmationDialog({ open, onOpenChange }: BookingConfirmationDialogProps) {
  const { state, resetBooking } = useBooking();
  const { carType, service, selectedStation, selectedTimeSlot } = state;
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (open) {
      setShowAnimation(true);
    } else {
      setShowAnimation(false);
    }
  }, [open]);

  const serviceDetails = service ? getServiceDetails(service) : null;

  const handleNewBooking = () => {
    resetBooking();
    onOpenChange(false);
  };

  if (!selectedStation || !selectedTimeSlot || !carType || !service) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card cosmic-gradient">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <div className={`text-green-500 p-2 rounded-full bg-green-100 dark:bg-green-900/30 
              ${showAnimation ? "animate-scale-in" : ""}`}>
              <CheckCircle className="h-12 w-12" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Booking Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Your service has been scheduled successfully.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-2">
          <div className="space-y-3 p-4 bg-background/50 rounded-lg">
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
              <p className="font-semibold">{selectedStation.name}</p>
              <p className="text-sm">{selectedStation.address}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Date & Time</h3>
              <p className="font-semibold">Today, {selectedTimeSlot.time}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Duration</h3>
              <p className="font-semibold">{serviceDetails?.duration || "Varies"}</p>
            </div>
          </div>

          <Button
            onClick={handleNewBooking}
            className="w-full bg-balancee-blue hover:bg-balancee-blue/90 text-white 
            dark:bg-balancee-orange dark:hover:bg-balancee-orange/90"
          >
            Book Another Service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
