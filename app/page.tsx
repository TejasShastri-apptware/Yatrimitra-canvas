'use client';

/**
 * Floor Plan Designer - Main Page Component
 * Refactored to use modular architecture with custom hooks and components
 */

import { useEffect, useState } from 'react';
import { useFloorPlanCanvas } from '@/lib/hooks/useFloorPlanCanvas';
import { useDrawingTools } from '@/lib/hooks/useDrawingTools';
import { clearCanvas, deleteSelected } from '@/lib/utils/canvasHelpers';
import { Toolbar, Canvas, Instructions, PropertyPanel, ZoomControls } from '@/components/FloorPlanCanvas';

export default function FloorPlanCanvas() {
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Initialize canvas
  const { canvasRef, fabricCanvasRef } = useFloorPlanCanvas();

  // Initialize drawing tools
  const { drawMode, setDrawMode } = useDrawingTools({
    canvas: fabricCanvasRef.current,
  });

  // Listen for object selection
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const handleSelection = (e: any) => {
      setSelectedObject(e.selected?.[0] || null);
    };

    const handleDeselection = () => {
      setSelectedObject(null);
    };

    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', handleDeselection);

    return () => {
      canvas.off('selection:created', handleSelection);
      canvas.off('selection:updated', handleSelection);
      canvas.off('selection:cleared', handleDeselection);
    };
  }, [fabricCanvasRef.current]);

  // Action handlers
  const handleClearAll = () => {
    if (fabricCanvasRef.current) {
      clearCanvas(fabricCanvasRef.current);
    }
  };

  const handleDeleteSelected = () => {
    if (fabricCanvasRef.current) {
      deleteSelected(fabricCanvasRef.current);
      setSelectedObject(null);
    }
  };

  const handlePropertyUpdate = (properties: any) => {
    if (selectedObject && fabricCanvasRef.current) {
      selectedObject.set(properties);
      fabricCanvasRef.current.renderAll();
    }
  };

  const handleZoomIn = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const newZoom = Math.min(zoomLevel + 10, 200);
    const zoom = newZoom / 100;
    canvas.setZoom(zoom);
    setZoomLevel(newZoom);
    canvas.renderAll();
  };

  const handleZoomOut = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const newZoom = Math.max(zoomLevel - 10, 50);
    const zoom = newZoom / 100;
    canvas.setZoom(zoom);
    setZoomLevel(newZoom);
    canvas.renderAll();
  };

  const handleFitToScreen = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.setZoom(1);
    setZoomLevel(100);
    canvas.renderAll();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-page overflow-hidden">
      <div className='w-full flex-shrink-0 z-30'>
        <Toolbar
          drawMode={drawMode}
          onModeChange={setDrawMode}
          onDeleteSelected={handleDeleteSelected}
          onClearAll={handleClearAll}
        />
      </div>

      <div className="relative flex-1 overflow-x-auto">
        <Canvas ref={canvasRef} />

        <PropertyPanel
          selectedObject={selectedObject}
          onClose={() => setSelectedObject(null)}
          onUpdate={handlePropertyUpdate}
        />

        <ZoomControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFitToScreen={handleFitToScreen}
          zoomLevel={zoomLevel}
        />
      </div>

      {/* <Instructions /> */}
    </div>
  );
}
