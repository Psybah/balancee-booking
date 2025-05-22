
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

  if (!carType || !service) {
    return null;
  }

  return (
    <Card className="p-6 mt-6 glass-card animate-fade-in animation-delay-200 cosmic-gradient">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">Available Repair Stations</h2>
        <div className="flex border rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${
              viewMode === "list" ? "bg-muted" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${
              viewMode === "map" ? "bg-muted" : ""
            }`}
            onClick={() => setViewMode("map")}
          >
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Map</span>
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">
        {getCarTypeLabel(carType)} • {getServiceLabel(service)}
      </p>
      <Separator className="my-4" />

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      ) : stations.length > 0 ? (
        viewMode === "list" ? (
          <div className="space-y-4">
            {stations.map((station) => (
              <Card
                key={station.id}
                className={`p-4 transition-all hover:shadow-md cursor-pointer ${
                  selectedStation?.id === station.id
                    ? "border-2 border-balancee-blue dark:border-balancee-orange"
                    : "border border-border"
                }`}
                onClick={() => selectStation(station)}
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{station.name}</h3>
                    <p className="text-sm text-muted-foreground">{station.address}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-balancee-orange">
                            {i < Math.floor(station.rating) ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <span className="ml-1 text-sm">{station.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 md:ml-4 text-right flex flex-col justify-between">
                    <span className="text-sm font-medium text-balancee-blue dark:text-balancee-orange">
                      {station.distance} km away
                    </span>
                    <Button
                      variant="outline"
                      className={`mt-2 md:mt-0 ${
                        selectedStation?.id === station.id
                          ? "bg-balancee-blue text-white hover:bg-balancee-blue/90 dark:bg-balancee-orange dark:hover:bg-balancee-orange/90"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectStation(station);
                      }}
                    >
                      {selectedStation?.id === station.id
                        ? "Selected"
                        : "Select"}
                    </Button>
                  </div>
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
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">
            No stations available for this selection.
          </p>
          <p className="text-sm mt-2">
            Try selecting a different service or car type.
          </p>
        </div>
      )}
      {errors.station && (
        <p className="text-destructive text-sm mt-4">{errors.station}</p>
      )}
    </Card>
  );
}
