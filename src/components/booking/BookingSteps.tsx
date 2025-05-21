
import { useBooking } from "@/contexts/BookingContext";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingSteps() {
  const { state } = useBooking();
  const { carType, service, selectedStation, selectedTimeSlot } = state;

  const steps = [
    { id: 1, name: "Vehicle", completed: !!carType },
    { id: 2, name: "Service", completed: !!service },
    { id: 3, name: "Location", completed: !!selectedStation },
    { id: 4, name: "Time Slot", completed: !!selectedTimeSlot },
    { id: 5, name: "Confirmation", completed: false }
  ];

  // Calculate progress percentage
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = Math.round((completedSteps / (steps.length - 1)) * 100);

  return (
    <div className="mb-8 animate-fade-in">
      <div className="mb-2">
        <Progress value={progress} className="h-2" />
      </div>
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                step.completed 
                  ? "bg-balancee-blue text-white dark:bg-balancee-orange" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step.completed ? <Check className="h-4 w-4" /> : step.id}
            </div>
            <span className="text-xs mt-1 hidden md:block">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
