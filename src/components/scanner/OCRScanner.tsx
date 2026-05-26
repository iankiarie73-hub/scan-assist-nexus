import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { Camera, Image as ImageIcon, Loader2, Copy, RefreshCw, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface OCRScannerProps {
  onScanned: (text: string) => void;
}

export function OCRScanner({ onScanned }: OCRScannerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        processImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imgData: string) => {
    setIsProcessing(true);
    setProgress(0);
    try {
      const { data: { text } } = await Tesseract.recognize(imgData, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.floor(m.progress * 100));
          }
        },
      });
      setResult(text);
      toast.success('Text extracted successfully!');
    } catch (error) {
      console.error('OCR Error:', error);
      toast.error('Failed to extract text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Scan Study Material</h2>
        <p className="text-slate-500">Take a photo of your textbook, notes, or research papers</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-dashed border-2 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
          {image ? (
            <div className="w-full h-full flex flex-col gap-4">
              <img src={image} alt="Preview" className="max-h-[300px] w-full object-contain rounded-lg" />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setImage(null)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                {!isProcessing && result && (
                  <Button className="flex-1" onClick={() => onScanned(result)}>
                    <Send className="w-4 h-4 mr-2" />
                    Send to Assistant
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-slate-600 mb-4">Use your camera or upload an image</p>
              <div className="flex flex-col gap-2">
                <Button onClick={() => fileInputRef.current?.click()}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Select Image
                </Button>
                {/* Mobile camera input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="font-semibold text-slate-800">Processing Document...</p>
              <div className="w-64 h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">{progress}% completed</p>
            </div>
          )}
        </Card>

        <Card className="p-6 flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Extracted Text</h3>
            {result && (
              <Button size="sm" variant="ghost" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            )}
          </div>
          <div className="flex-1 bg-slate-50 rounded-lg p-4 overflow-y-auto">
            {result ? (
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{result}</p>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-center px-4">
                The extracted text will appear here after scanning.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}