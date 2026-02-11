/**
 * Custom hook for managing drawing tools and interactions
 */

import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { DEFAULT_WALL_OPTIONS, DEFAULT_ROOM_OPTIONS, DEFAULT_CAMERA_OPTIONS, DEFAULT_DOOR_OPTIONS } from '../utils/canvasHelpers';
import type { DrawMode, Point } from '../types/canvas.types';

interface UseDrawingToolsOptions {
    canvas: fabric.Canvas | null;
}

/**
 * Hook to manage drawing tools and mouse interactions
 * @param options - Options including the canvas instance
 * @returns Drawing mode state and handlers
 */
export const useDrawingTools = ({ canvas }: UseDrawingToolsOptions) => {
    const [drawMode, setDrawMode] = useState<DrawMode>('select');
    const [isDrawing, setIsDrawing] = useState(false);

    const drawingObjectRef = useRef<fabric.Line | fabric.Rect | fabric.Circle | fabric.Group | null>(null);
    const startPointRef = useRef<Point | null>(null);

    // Use refs to track current state for event handlers
    const drawModeRef = useRef<DrawMode>(drawMode);
    const isDrawingRef = useRef<boolean>(isDrawing);

    // Keep refs in sync with state
    useEffect(() => {
        drawModeRef.current = drawMode;
    }, [drawMode]);

    useEffect(() => {
        isDrawingRef.current = isDrawing;
    }, [isDrawing]);

    // Handle keyboard shortcuts
    useEffect(() => {
        if (!canvas) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Delete or Backspace key
            if (e.key === 'Delete' || e.key === 'Backspace') {
                const activeObject = canvas.getActiveObject();
                if (activeObject) {
                    canvas.remove(activeObject);
                    canvas.renderAll();
                    e.preventDefault();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [canvas]);

    // Configure canvas selection mode based on drawMode
    useEffect(() => {
        if (!canvas) return;

        if (drawModeRef.current === 'select') {
            // Enable selection mode
            canvas.selection = true;
            canvas.forEachObject((obj) => {
                // Make all objects selectable except grid dots
                if (obj.type !== 'circle' || (obj as fabric.Circle).radius !== 1) {
                    obj.selectable = true;
                    obj.evented = true;
                }
            });
        } else {
            // Disable selection mode when drawing
            canvas.selection = false;
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    }, [canvas, drawMode]);

    // Set up event handlers
    useEffect(() => {
        if (!canvas) return;

        // Mouse down - start drawing
        const handleMouseDown = (options: fabric.IEvent) => {
            if (drawModeRef.current === 'select') return;

            const pointer = canvas.getPointer(options.e);
            startPointRef.current = { x: pointer.x, y: pointer.y };
            setIsDrawing(true);

            if (drawModeRef.current === 'wall') {
                const line = new fabric.Line(
                    [pointer.x, pointer.y, pointer.x, pointer.y],
                    {
                        ...DEFAULT_WALL_OPTIONS,
                        selectable: false,
                    }
                );
                canvas.add(line);
                drawingObjectRef.current = line;
            } else if (drawModeRef.current === 'room') {
                const rect = new fabric.Rect({
                    left: pointer.x,
                    top: pointer.y,
                    width: 0,
                    height: 0,
                    ...DEFAULT_ROOM_OPTIONS,
                    selectable: false,
                });
                canvas.add(rect);
                drawingObjectRef.current = rect;
            } else if (drawModeRef.current === 'camera') {
                fabric.loadSVGFromURL('/assets/camera.svg', (objects, options) => {
                    const camera = fabric.util.groupSVGElements(objects, options);
                    camera.set({
                        left: pointer.x,
                        top: pointer.y,
                        originX: 'center',
                        originY: 'center',
                        scaleX: 0.02, // Initial scale - reduced for better proportions
                        scaleY: 0.02,
                        selectable: true,
                        hasRotatingPoint: true,
                    });
                    canvas.add(camera);
                    canvas.setActiveObject(camera);
                    canvas.renderAll();
                });
                setIsDrawing(false);
            } else if (drawModeRef.current === 'door') {
                fabric.loadSVGFromURL('/assets/door.svg', (objects, options) => {
                    const door = fabric.util.groupSVGElements(objects, options);
                    door.set({
                        left: pointer.x,
                        top: pointer.y,
                        originX: 'center',
                        originY: 'center',
                        scaleX: 0.03, // Initial scale - reduced for better proportions
                        scaleY: 0.03,
                        selectable: true,
                        hasRotatingPoint: true,
                    });
                    canvas.add(door);
                    canvas.setActiveObject(door);
                    canvas.renderAll();
                });
                setIsDrawing(false);
            }
        };

        // Mouse move - continue drawing
        const handleMouseMove = (options: fabric.IEvent) => {
            if (!isDrawingRef.current || !startPointRef.current || !drawingObjectRef.current) return;

            const pointer = canvas.getPointer(options.e);

            if (drawModeRef.current === 'wall' && drawingObjectRef.current instanceof fabric.Line) {
                drawingObjectRef.current.set({
                    x2: pointer.x,
                    y2: pointer.y,
                });
            } else if (drawModeRef.current === 'room' && drawingObjectRef.current instanceof fabric.Rect) {
                const width = pointer.x - startPointRef.current.x;
                const height = pointer.y - startPointRef.current.y;

                if (width < 0) {
                    drawingObjectRef.current.set({ left: pointer.x });
                }
                if (height < 0) {
                    drawingObjectRef.current.set({ top: pointer.y });
                }

                drawingObjectRef.current.set({
                    width: Math.abs(width),
                    height: Math.abs(height),
                });
            }

            canvas.renderAll();
        };

        // Mouse up - finish drawing
        const handleMouseUp = () => {
            if (isDrawingRef.current && drawingObjectRef.current) {
                (drawingObjectRef.current as fabric.Object).set({ selectable: true });
                setIsDrawing(false);
                drawingObjectRef.current = null;
                startPointRef.current = null;
            }
        };

        // Attach event listeners
        canvas.on('mouse:down', handleMouseDown);
        canvas.on('mouse:move', handleMouseMove);
        canvas.on('mouse:up', handleMouseUp);

        // Cleanup
        return () => {
            canvas.off('mouse:down', handleMouseDown);
            canvas.off('mouse:move', handleMouseMove);
            canvas.off('mouse:up', handleMouseUp);
        };
    }, [canvas]); // Only re-run if canvas instance changes

    return {
        drawMode,
        setDrawMode,
        isDrawing,
    };
};
