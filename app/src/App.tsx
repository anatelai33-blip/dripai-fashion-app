import { AppProvider, useApp } from '@/contexts/AppContext';
import {
  SplashScreen,
  LoginScreen,
  SignupScreen,
  HomeScreen,
  ProductDetailScreen,
  TryOnUploadScreen,
  TryOnProcessingScreen,
  TryOnResultScreen,
  CategoriesScreen,
  FiltersScreen,
  MeasurementsScreen,
  FavoritesScreen,
  NotificationsScreen,
  CartScreen,
  ErrorScreen,
  // New features
  AIStylistScreen,
  WardrobeScreen,
  DripScoreScreen,
  SocialFeedScreen,
  ArtisanConnectScreen,
  AIDesignerScreen,
  DripLiveScreen,
  // Company website pages
  HomePage,
  AboutPage,
  ServicesPage,
  PortfolioPage,
  TeamPage,
  ContactPage,
} from '@/screens';

function AppContent() {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      // App screens
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'signup':
        return <SignupScreen />;
      case 'home':
        return <HomeScreen />;
      case 'product':
        return <ProductDetailScreen />;
      case 'tryon-upload':
        return <TryOnUploadScreen />;
      case 'tryon-processing':
        return <TryOnProcessingScreen />;
      case 'tryon-result':
        return <TryOnResultScreen />;
      case 'categories':
        return <CategoriesScreen />;
      case 'filters':
        return <FiltersScreen />;
      case 'measurements':
        return <MeasurementsScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'cart':
        return <CartScreen />;
      case 'error':
        return <ErrorScreen />;
      
      // New features
      case 'ai-stylist':
        return <AIStylistScreen />;
      case 'wardrobe':
        return <WardrobeScreen />;
      case 'drip-score':
        return <DripScoreScreen />;
      case 'social':
        return <SocialFeedScreen />;
      case 'artisan-connect':
        return <ArtisanConnectScreen />;
      case 'ai-designer':
        return <AIDesignerScreen />;
      case 'drip-live':
        return <DripLiveScreen />;
      
      // Company website pages
      case 'homepage':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'team':
        return <TeamPage />;
      case 'contact':
        return <ContactPage />;
      
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-cream-light">
      {renderScreen()}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
