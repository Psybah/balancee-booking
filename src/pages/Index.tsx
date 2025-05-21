
import { BookingSummary } from "../components/booking/BookingSummary";
import { ServiceSelection } from "../components/booking/ServiceSelection";
import { StationSelection } from "../components/booking/StationSelection";
import { TimeSlotSelection } from "../components/booking/TimeSlotSelection";
import { BookingSteps } from "../components/booking/BookingSteps";
import { Layout } from "../components/Layout";
import { useBooking } from "../contexts/BookingContext";

const Index = () => {
  const { state } = useBooking();
  const { carType, service, selectedStation } = state;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <BookingSteps />
        
        <div className="space-y-8 mt-8">
          <ServiceSelection />
          
          {carType && service && (
            <StationSelection />
          )}
          
          {carType && service && selectedStation && (
            <TimeSlotSelection />
          )}
          
          <BookingSummary />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
