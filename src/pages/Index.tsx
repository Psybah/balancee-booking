
import { BookingSummary } from "../components/booking/BookingSummary";
import { ServiceSelection } from "../components/booking/ServiceSelection";
import { StationSelection } from "../components/booking/StationSelection";
import { TimeSlotSelection } from "../components/booking/TimeSlotSelection";
import { Layout } from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Smart Repair Booking</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book your car repair service in minutes. Our system helps you find the nearest stations
            offering the services you need, with real-time availability.
          </p>
        </div>

        <div className="space-y-6">
          <ServiceSelection />
          <StationSelection />
          <TimeSlotSelection />
          <BookingSummary />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
