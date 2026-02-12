/**
 * Canvas utility functions for the Floor Plan application
 */

import { fabric } from 'fabric';
import type { CanvasConfig } from '../types/canvas.types';

/**
 * Default canvas configuration - Blueprint Style
 */
export const DEFAULT_CANVAS_CONFIG: CanvasConfig = {
    width: 1200,
    height: 700,
    backgroundColor: '#046fa4ff', // Deep blueprint blue
    gridSize: 20,
    gridColor: '#f5f84bff', // Cyan grid dots
};

/**
 * Default wall drawing options - Blueprint Style
 */
export const DEFAULT_WALL_OPTIONS = {
    stroke: '#FFFFFF', // White walls for blueprint aesthetic
    strokeWidth: 3,
    strokeLineCap: 'round' as const,
    strokeLineJoin: 'round' as const,
};

/**
 * Default room drawing options - Blueprint Style
 */
export const DEFAULT_ROOM_OPTIONS = {
    fill: 'rgba(74, 144, 217, 0.15)', // Subtle cyan fill
    stroke: '#6BB6FF', // Bright cyan outline
    strokeWidth: 2,
    rx: 4,
    ry: 4,
};

/**
 * Default camera drawing options - Blueprint Style
 */
export const DEFAULT_CAMERA_OPTIONS = {
    fill: '#FFD700', // Gold/yellow for visibility
    stroke: '#FFA500', // Orange outline
    strokeWidth: 2,
    radius: 20,
};

/**
 * Default door drawing options - Blueprint Style
 */
export const DEFAULT_DOOR_OPTIONS = {
    stroke: '#90EE90', // Light green for doors
    strokeWidth: 3,
    strokeLineCap: 'round' as const,
};

/**
 * Add a professional dot grid to the canvas
 * @param canvas - The Fabric.js canvas instance
 * @param gridSize - Size of each grid cell (default: 20)
 * @param gridColor - Color of grid dots (default: '#d1d5db')
 */
export const addGrid = (
    canvas: fabric.Canvas,
    gridSize: number = DEFAULT_CANVAS_CONFIG.gridSize,
    gridColor: string = DEFAULT_CANVAS_CONFIG.gridColor
): void => {
    const width = canvas.width || DEFAULT_CANVAS_CONFIG.width;
    const height = canvas.height || DEFAULT_CANVAS_CONFIG.height;

    // Add grid dots for blueprint aesthetic
    for (let i = 0; i < width / gridSize; i++) {
        for (let j = 0; j < height / gridSize; j++) {
            const dot = new fabric.Circle({
                left: i * gridSize,
                top: j * gridSize,
                radius: 0.5, // Slightly larger for visibility on blue background
                fill: gridColor,
                selectable: false,
                evented: false,
            });
            canvas.add(dot);
        }
    }
};

/**
 * Clear all objects from the canvas except grid
 * @param canvas - The Fabric.js canvas instance
 */
export const clearCanvas = (canvas: fabric.Canvas): void => {
    const objects = canvas.getObjects();

    // Remove all objects except grid dots
    objects.forEach((obj) => {
        if (obj.type !== 'circle' || (obj as fabric.Circle).radius !== 1.5) {
            canvas.remove(obj);
        }
    });

    canvas.renderAll();
};

/**
 * Delete the currently selected object from the canvas
 * @param canvas - The Fabric.js canvas instance
 */
export const deleteSelected = (canvas: fabric.Canvas): void => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
        canvas.renderAll();
    }
};

/**
 * Check if an object is a grid dot
 * @param obj - The Fabric.js object to check
 * @returns True if the object is a grid dot
 */
export const isGridDot = (obj: fabric.Object): boolean => {
    return obj.type === 'circle' && (obj as fabric.Circle).radius === 1.5;
};
