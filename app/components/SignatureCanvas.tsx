"use client";

import React, { useRef, useState, useEffect } from 'react';

interface SignatureCanvasProps {
  onSignatureChange: (signatureDataUrl: string | null) => void;
  width?: number;
  height?: number;
  className?: string;
}

export default function SignatureCanvas({
  onSignatureChange,
  width = 500,
  height = 200,
  className = '',
}: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#000000';
        setCtx(context);
      }
    }
  }, []);

  // Start drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (ctx) {
      ctx.beginPath();
      
      // Get coordinates
      const coordinates = getCoordinates(e);
      if (coordinates) {
        ctx.moveTo(coordinates.x, coordinates.y);
      }
    }
  };

  // Draw
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    
    // Get coordinates
    const coordinates = getCoordinates(e);
    if (coordinates) {
      ctx.lineTo(coordinates.x, coordinates.y);
      ctx.stroke();
    }
  };

  // Stop drawing
  const stopDrawing = () => {
    if (isDrawing && ctx) {
      ctx.closePath();
      setIsDrawing(false);
      
      // Get signature data URL and pass it to parent component
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        onSignatureChange(dataUrl);
      }
    }
  };

  // Clear canvas
  const clearCanvas = () => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      onSignatureChange(null);
    }
  };

  // Helper function to get coordinates from mouse or touch event
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    
    // Handle both mouse and touch events
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="border border-theme-gray-300 dark:border-theme-dark-700 rounded-md mb-2 bg-white">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={`cursor-crosshair ${className}`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <button
        type="button"
        onClick={clearCanvas}
        className="px-3 py-1 bg-theme-error-600 dark:bg-theme-error-700 text-theme-light rounded-md hover:bg-theme-error-700 dark:hover:bg-theme-error-800 text-sm"
      >
        Clear Signature
      </button>
    </div>
  );
}