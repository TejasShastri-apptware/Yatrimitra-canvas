/**
 * Type definitions for the Floor Plan Canvas application
 */

import { fabric } from 'fabric';

/**
 * Drawing modes available in the application
 */
export type DrawMode = 'select' | 'wall' | 'room' | 'camera' | 'door';

/**
 * Point coordinates on the canvas
 */
export interface Point {
    x: number;
    y: number;
}

/**
 * Canvas configuration options
 */
export interface CanvasConfig {
    width: number;
    height: number;
    backgroundColor: string;
    gridSize: number;
    gridColor: string;
}

/**
 * Wall drawing options
 */
export interface WallOptions {
    stroke: string;
    strokeWidth: number;
}

/**
 * Room drawing options
 */
export interface RoomOptions {
    fill: string;
    stroke: string;
    strokeWidth: number;
}

/**
 * Drawing state
 */
export interface DrawingState {
    isDrawing: boolean;
    startPoint: Point | null;
    currentObject: fabric.Line | fabric.Rect | null;
}
