
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode, Camera, X, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (qrData: string) => void;
  totalAmount: number;
}

const QRScanner: React.FC<QRScannerProps> = ({ isOpen, onClose, onSuccess, totalAmount }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setHasPermission(false);
      toast.error('Camera access required for QR scanning');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const simulateQRScan = () => {
    // Simulate a successful QR code scan for demo purposes
    const mockQRData = `payment_${Date.now()}`;
    setScanResult(mockQRData);
    
    setTimeout(() => {
      onSuccess(mockQRData);
      toast.success('QR Code scanned successfully!');
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    stopCamera();
    setScanResult(null);
    setHasPermission(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen && !isScanning) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-orange-500" />
            <span>Scan & Pay</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Payment Amount */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
              <p className="text-2xl font-bold text-orange-600">₹{totalAmount}</p>
            </CardContent>
          </Card>

          {/* Scanner Interface */}
          <div className="relative">
            {hasPermission === null && (
              <Card className="bg-gray-50">
                <CardContent className="p-8 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Requesting camera permission...</p>
                </CardContent>
              </Card>
            )}

            {hasPermission === false && (
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600 mb-4">Camera access denied</p>
                  <Button onClick={startCamera} variant="outline" size="sm">
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            )}

            {hasPermission && !scanResult && (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover rounded-lg bg-black"
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-orange-500 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-orange-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-orange-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-orange-500 rounded-br-lg"></div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <p className="text-white text-sm bg-black/70 px-3 py-1 rounded-full">
                    Align QR code within the frame
                  </p>
                </div>
              </div>
            )}

            {scanResult && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-green-600 font-medium">QR Code Detected!</p>
                  <p className="text-sm text-gray-600 mt-2">Processing payment...</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            
            {hasPermission && !scanResult && (
              <Button 
                onClick={simulateQRScan}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Demo Scan
              </Button>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Point your camera at the QR code on the payment terminal
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
