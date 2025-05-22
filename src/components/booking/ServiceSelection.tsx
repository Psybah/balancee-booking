import { useEffect } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { carTypeOptions, serviceOptions } from "@/utils/helpers";
import { Card } from "@/components/ui/card";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Clock, Car } from "lucide-react";
import { 
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious 
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
    <Card className="p-4 sm:p-6 glass-card animate-fade-in cosmic-gradient">
      <h2 className="text-xl sm:text-2xl font-semibold">Vehicle & Service</h2>
      <Separator className="my-3" />
      
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-medium mb-2 flex items-center gap-2">
            <Car className="h-4 w-4 sm:h-5 sm:w-5 text-balancee-blue" /> Vehicle Type
          </h3>
          
          <Carousel className="w-full">
            <CarouselContent>
              {carTypeOptions.map((option) => (
                <CarouselItem key={option.value} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <div 
                    className="cursor-pointer hover:scale-105 transition-all animate-fade-in"
                    onClick={() => setCarType(option.value as any)}
                  >
                    <div className={`rounded-lg overflow-hidden border-2 ${
                      carType === option.value
                        ? "border-balancee-blue dark:border-balancee-orange shadow-md"
                        : "border-transparent"
                    }`}>
                      <div className="relative aspect-video bg-accent/20">
                        <img 
                          src={option.image}
                          alt={option.label} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className={`py-1 px-2 text-center text-xs sm:text-sm font-medium ${
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
            <CarouselPrevious className="-left-2 sm:left-0 h-8 w-8" />
            <CarouselNext className="-right-2 sm:right-0 h-8 w-8" />
          </Carousel>
          
          {errors.carType && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.carType}</p>
          )}
        </div>

        <div className="animate-fade-in animation-delay-200">
          <h3 className="text-base sm:text-lg font-medium mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-balancee-orange" /> Service Type
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div className="w-full sm:w-1/3">
              <Select
                value={service || ""}
                onValueChange={(value) => setService(value as any)}
              >
                <SelectTrigger>
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
                <p className="text-destructive text-xs sm:text-sm mt-1">{errors.service}</p>
              )}
            </div>
            
            <div className="w-full sm:w-2/3 bg-muted rounded-lg p-3">
              {service ? (
                <div className="animate-fade-in">
                  <h4 className="font-medium text-base sm:text-lg">
                    {serviceOptions.find(o => o.value === service)?.label}
                  </h4>
                  <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                    {serviceOptions.find(o => o.value === service)?.description}
                  </p>
                  <div className="mt-2 flex items-center text-xs sm:text-sm text-balancee-blue dark:text-balancee-orange">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {serviceOptions.find(o => o.value === service)?.duration}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center text-sm py-3">
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
