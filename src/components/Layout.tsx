import { ThemeToggle } from "./ThemeToggle";
export function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/293a696e-17f4-42c7-8420-bb63c89aa14c.png" alt="Balanceè Logo" className="h-8 w-auto" />
            
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t py-6 md:py-0 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center h-16">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Balanceè. All rights reserved.
          </div>
          <div className="mt-2 md:mt-0 text-sm text-muted-foreground">
            Smartest way to book your car service
          </div>
        </div>
      </footer>
    </div>;
}