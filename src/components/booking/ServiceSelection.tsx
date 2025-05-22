
import { useEffect } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { carTypeOptions, serviceOptions } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Clock, Car } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

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
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Car className="h-5 w-5 text-balancee-blue" /> Vehicle Type
          </h3>
          
          <div className="w-full pt-4 pb-4 relative">
            <Carousel className="w-full">
              <CarouselContent>
                {carTypeOptions.map((option) => (
                  <CarouselItem key={option.value} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                    <div 
                      className={`cursor-pointer transition-all transform hover:scale-105 animate-fade-in`}
                      onClick={() => setCarType(option.value as any)}
                    >
                      <div 
                        className={`rounded-lg overflow-hidden border-2 transition-all ${
                          carType === option.value
                            ? "border-balancee-blue dark:border-balancee-orange shadow-lg"
                            : "border-transparent"
                        }`}
                      >
                        <div className="relative aspect-video bg-accent/20 overflow-hidden">
                          <img 
                            src={option.image}
                            alt={option.label} 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className={`py-2 px-3 text-center font-medium text-sm ${
                          carType === option.value
                            ? "bg-balancee-blue text-white dark:bg-balancee-orange"
                            : "bg-muted"
                        }`}>
                          {option.label}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
          
          {errors.carType && (
            <p className="text-destructive text-sm mt-1">{errors.carType}</p>
          )}
        </div>

        <div className="animate-fade-in animation-delay-200">
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5 text-balancee-orange" /> Service Type
          </h3>
          
          <div className="md:flex gap-6">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <Select
                value={service || ""}
                onValueChange={(value) => setService(value as any)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service && (
                <p className="text-destructive text-sm mt-1">{errors.service}</p>
              )}
            </div>
            
            <div className="md:w-2/3 bg-muted rounded-lg p-4">
              {service ? (
                <div className="animate-fade-in">
                  <h4 className="font-medium text-lg">
                    {serviceOptions.find(o => o.value === service)?.label}
                  </h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {serviceOptions.find(o => o.value === service)?.description}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-balancee-blue dark:text-balancee-orange">
                    <Clock className="h-4 w-4 mr-1" />
                    {serviceOptions.find(o => o.value === service)?.duration}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Select a service to see details
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
