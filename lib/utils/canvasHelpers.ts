/**
 * Canvas utility functions for the Floor Plan application
 */

import { fabric } from 'fabric';
import type { CanvasConfig } from '../types/canvas.types';

/**
 * Default canvas configuration
 */
export const DEFAULT_CANVAS_CONFIG: CanvasConfig = {
    width: 1200,
    height: 700,
    backgroundColor: '#ffffff',
    gridSize: 20,
    gridColor: '#d1d5db',
};

/**
 * Default wall drawing options
 */
export const DEFAULT_WALL_OPTIONS = {
    stroke: '#1f2937',
    strokeWidth: 3,
    strokeLineCap: 'round' as const,
    strokeLineJoin: 'round' as const,
};

/**
 * Default room drawing options
 */
export const DEFAULT_ROOM_OPTIONS = {
    fill: 'rgba(147, 197, 253, 0.15)',
    stroke: '#3b82f6',
    strokeWidth: 2,
    rx: 4,
    ry: 4,
};

/**
 * Default camera drawing options
 */
export const DEFAULT_CAMERA_OPTIONS = {
    fill: '#ef4444',
    stroke: '#991b1b',
    strokeWidth: 2,
    radius: 20,
};

/**
 * Default door drawing options
 */
export const DEFAULT_DOOR_OPTIONS = {
    stroke: '#8b5cf6',
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

    // Add grid dots instead of lines for a more professional look
    for (let i = 0; i < width / gridSize; i++) {
        for (let j = 0; j < height / gridSize; j++) {
            const dot = new fabric.Circle({
                left: i * gridSize,
                top: j * gridSize,
                radius: 1,
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
        if (obj.type !== 'circle' || (obj as fabric.Circle).radius !== 1) {
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
    return obj.type === 'circle' && (obj as fabric.Circle).radius === 1;
};
