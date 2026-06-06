import { useApp } from '@/contexts/AppContext';
import { WifiOff, SearchX, CameraOff, CloudOff, RefreshCw, ArrowLeft } from 'lucide-react';

interface ErrorScreenProps {
  errorType?: 'internet' | 'product' | 'upload' | 'tryon' | 'general';
}

export function ErrorScreen({ errorType = 'general' }: ErrorScreenProps) {
  const { navigateTo } = useApp();

  const errorConfigs = {
    internet: {
      icon: <WifiOff className="w-16 h-16 text-dusty-blue" />,
      title: 'No Internet Connection',
      message: 'It looks like you\'re offline. Please check your Wi-Fi or mobile data settings and retry.',
      code: 'Error: NO_INTERNET',
    },
    product: {
      icon: <SearchX className="w-16 h-16 text-dusty-blue" />,
      title: 'Product Not Found',
      message: 'We couldn\'t find the product you\'re looking for. It might be temporarily unavailable.',
      code: 'Error: PRODUCT_NOT_FOUND',
    },
    upload: {
      icon: <CameraOff className="w-16 h-16 text-dusty-blue" />,
      title: 'Photo Upload Failed',
      message: 'There was an issue uploading your photo. Please make sure the file is in a valid format and try again.',
      code: 'Error: UPLOAD_FAILED',
    },
    tryon: {
      icon: <CloudOff className="w-16 h-16 text-dusty-blue" />,
      title: 'Oops! Something went wrong',
      message: 'We couldn\'t load your try-on result. Please check your connection and try again.',
      code: 'Error: TRY_ON_FAILED',
    },
    general: {
      icon: <CloudOff className="w-16 h-16 text-dusty-blue" />,
      title: 'Oops! Something went wrong',
      message: 'We encountered an unexpected error. Please try again.',
      code: 'Error: UNKNOWN_ERROR',
    },
  };

  const config = errorConfigs[errorType];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Error Icon */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-cream-light rounded-full flex items-center justify-center">
          {config.icon}
        </div>
        {/* X mark */}
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      <h1 className="text-2xl font-display font-semibold text-charcoal text-center mb-3">
        {config.title}
      </h1>
      <p className="text-charcoal/70 text-center max-w-xs mb-2">
        {config.message}
      </p>
      <p className="text-charcoal/40 text-xs mb-8">
        {config.code}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full max-w-xs">
        <button
          onClick={() => window.location.reload()}
          className="flex-1 py-3 bg-gold text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gold-dark active:scale-[0.98] transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
        <button
          onClick={() => navigateTo('home')}
          className="flex-1 py-3 border-2 border-gold text-gold font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gold/5 active:scale-[0.98] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}

// Pre-configured error screens
export function NoInternetScreen() {
  return <ErrorScreen errorType="internet" />;
}

export function ProductNotFoundScreen() {
  return <ErrorScreen errorType="product" />;
}

export function UploadFailedScreen() {
  return <ErrorScreen errorType="upload" />;
}

export function TryOnFailedScreen() {
  return <ErrorScreen errorType="tryon" />;
}
