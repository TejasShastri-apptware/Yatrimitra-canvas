/**
 * Custom hook for managing the Fabric.js canvas lifecycle
 */

import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { addGrid, DEFAULT_CANVAS_CONFIG } from '../utils/canvasHelpers';
import type { CanvasConfig } from '../types/canvas.types';

interface UseFloorPlanCanvasOptions {
    config?: Partial<CanvasConfig>;
}

/**
 * Hook to initialize and manage a Fabric.js canvas
 * @param options - Configuration options for the canvas
 * @returns Canvas ref and Fabric canvas instance ref
 */
export const useFloorPlanCanvas = (options: UseFloorPlanCanvasOptions = {}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

    const config = {
        ...DEFAULT_CANVAS_CONFIG,
        ...options.config,
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize Fabric canvas
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: config.width,
            height: config.height,
            backgroundColor: config.backgroundColor,
        });

        fabricCanvasRef.current = canvas;

        // Add grid
        addGrid(canvas, config.gridSize, config.gridColor);

        // Cleanup on unmount
        return () => {
            canvas.dispose();
        };
    }, []); // Empty dependency array - canvas only initialized once

    return {
        canvasRef,
        fabricCanvasRef,
    };
};
