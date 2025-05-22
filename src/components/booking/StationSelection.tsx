import { useState, useEffect } from "react";
import { useBooking } from "../../contexts/BookingContext";
import { getCarTypeLabel, getServiceLabel } from "../../utils/helpers";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { MapView } from "./MapView";
import { MapPin, List } from "lucide-react";

export function StationSelection() {
  const { state, selectStation, fetchTimeSlots } = useBooking();
  const { carType, service, stations, selectedStation, isLoading, errors } = state;
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  useEffect(() => {
    if (selectedStation) {
      fetchTimeSlots(selectedStation.id);
    }
  }, [selectedStation]);

  if (!carType || !service) return null;

  return (
    <Card className="p-3 sm:p-4 animate-fade-in animation-delay-200 cosmic-gradient">
      <div className="flex justify-between items-center gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Available Stations</h2>
          <p className="text-sm text-muted-foreground">
            {getCarTypeLabel(carType)} • {getServiceLabel(service)}
          </p>
        </div>
        <div className="flex border rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            className={viewMode === "list" ? "bg-muted" : ""}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm" 
            className={viewMode === "map" ? "bg-muted" : ""}
            onClick={() => setViewMode("map")}
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Separator className="my-3" />

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : stations.length > 0 ? (
        viewMode === "list" ? (
          <div className="space-y-3">
            {stations.map((station) => (
              <Card
                key={station.id}
                className={`p-3 transition-all cursor-pointer ${
                  selectedStation?.id === station.id
                    ? "border-2 border-balancee-blue dark:border-balancee-orange"
                    : "border border-border"
                }`}
                onClick={() => selectStation(station)}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-base truncate">{station.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{station.address}</p>
                    <div className="flex items-center mt-1 text-xs">
                      <div className="text-balancee-orange">
                        {"★".repeat(Math.floor(station.rating))}
                        {"☆".repeat(5 - Math.floor(station.rating))}
                      </div>
                      <span className="ml-1">{station.rating}</span>
                      <span className="ml-2 text-balancee-blue dark:text-balancee-orange">
                        {station.distance}km
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      selectedStation?.id === station.id
                        ? "bg-balancee-blue text-white hover:bg-balancee-blue/90 dark:bg-balancee-orange dark:hover:bg-balancee-orange/90"
                        : ""
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      selectStation(station);
                    }}
                  >
                    {selectedStation?.id === station.id ? "Selected" : "Select"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <MapView
            stations={stations}
            selectedStation={selectedStation}
            onSelectStation={selectStation}
          />
        )
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">No stations available.</p>
          <p className="text-xs mt-1">Try a different service or car type.</p>
        </div>
      )}
      {errors.station && (
        <p className="text-destructive text-xs mt-2">{errors.station}</p>
      )}
    </Card>
  );
}
