
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

export function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useTheme();
  
  return <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Balanceè Logo" 
              className={`h-8 w-auto ${isDarkMode ? 'invert' : ''}`} 
            />
            
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <div className="relative bg-gradient-to-r from-balancee-cream to-white dark:from-gray-900 dark:to-gray-800 py-8 md:py-16">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-gradient animate-fade-in">
            Smart Car Service Booking
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Find and book the perfect service for your vehicle with real-time availability at stations near you in Nigeria.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="border-t py-6 md:py-0 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center h-16">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}{' '}
            <a
              href="https://github.com/psybah"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Cybersmith
            </a>
            . All rights reserved.
          </div>
          <div className="mt-2 md:mt-0 text-sm text-muted-foreground">
            Smartest way to book your car service
          </div>
        </div>
      </footer>
    </div>;
}
