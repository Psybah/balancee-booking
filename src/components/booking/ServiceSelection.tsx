
import { useEffect } from "react";
import { useBooking } from "../../contexts/BookingContext";
import { carTypeOptions, serviceOptions } from "../../utils/helpers";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

export function ServiceSelection() {
  const { state, setCarType, setService, fetchStations } = useBooking();
  const { carType, service, errors } = state;

  useEffect(() => {
    if (carType && service) {
      fetchStations();
    }
  }, [carType, service]);

  return (
    <Card className="p-6 glass-card animate-fade-in cosmic-gradient">
      <h2 className="text-2xl font-semibold mb-4">Select Your Vehicle & Service</h2>
      <Separator className="my-4" />
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Vehicle Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {carTypeOptions.map((option) => (
              <Button
                key={option.value}
                variant={carType === option.value ? "default" : "outline"}
                className={`py-6 transition-all ${
                  carType === option.value
                    ? "bg-balancee-blue text-white"
                    : ""
                }`}
                onClick={() => setCarType(option.value as any)}
              >
                {option.label}
              </Button>
            ))}
          </div>
          {errors.carType && (
            <p className="text-destructive text-sm mt-1">{errors.carType}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Service Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {serviceOptions.map((option) => (
              <Button
                key={option.value}
                variant={service === option.value ? "default" : "outline"}
                className={`justify-start text-left h-auto py-4 transition-all ${
                  service === option.value
                    ? "bg-balancee-orange text-white"
                    : ""
                }`}
                onClick={() => setService(option.value as any)}
              >
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs mt-1 opacity-80">
                    {option.description}
                  </div>
                  <div className="text-xs mt-1">
                    <span className="font-semibold">Duration:</span> {option.duration}
                  </div>
                </div>
              </Button>
            ))}
          </div>
          {errors.service && (
            <p className="text-destructive text-sm mt-1">{errors.service}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
