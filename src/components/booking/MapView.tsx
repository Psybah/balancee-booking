import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Station } from "@/contexts/BookingContext";
import { MapPin } from "lucide-react";

interface MapViewProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
}

export function MapView({ stations, selectedStation, onSelectStation }: MapViewProps) {
  // This is a placeholder for an actual map implementation
  // In a real application, you would integrate with a map API like Google Maps or MapBox
  
  return (
    <Card className="relative overflow-hidden h-[250px] sm:h-[400px] w-full">
      {/* Map placeholder with blur effect */}
      <div className="absolute inset-0 bg-muted/30 backdrop-blur-sm flex items-center justify-center">
        <div className="w-full h-full opacity-60 bg-cover bg-center" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')" }}>
        </div>
        
        {stations.map((station, index) => (
          <div
            key={station.id}
            className={`absolute cursor-pointer transform transition-all duration-200 
              ${selectedStation?.id === station.id ? 'scale-125' : 'scale-100'}`}
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${30 + (Math.sin(index) * 30)}%`,
            }}
            onClick={() => onSelectStation(station)}
          >
            <MapPin 
              className={`w-6 h-6 sm:w-8 sm:h-8 ${
                selectedStation?.id === station.id 
                  ? "text-balancee-orange fill-balancee-orange/30"
                  : "text-balancee-blue fill-balancee-blue/30"
              }`} 
            />
          </div>
        ))}
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-background/80 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-center shadow-lg max-w-[90%] sm:max-w-none">
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Map View Coming Soon</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              We're working on an interactive map to help you find the nearest stations.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
