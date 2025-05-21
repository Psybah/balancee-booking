
import { ThemeToggle } from "./ThemeToggle";
export function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/293a696e-17f4-42c7-8420-bb63c89aa14c.png" alt="Balanceè Logo" className="h-8 w-auto" />
            <span className="font-semibold text-lg hidden sm:inline-block">Balanceè</span>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <div className="relative bg-gradient-to-r from-balancee-cream to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient animate-fade-in">
            Smart Car Service Booking
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Find and book the perfect service for your vehicle with real-time availability at stations near you in Nigeria.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="border-t py-6 md:py-0 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center h-16">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Balanceè Nigeria. All rights reserved.
          </div>
          <div className="mt-2 md:mt-0 text-sm text-muted-foreground">
            Smartest way to book your car service
          </div>
        </div>
      </footer>
    </div>;
}
