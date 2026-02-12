import React, { useRef, useEffect, useState } from 'react';

export type Tool = 'select' | 'room' | 'door' | 'window' | 'camera' | 'wall' | 'pencil' | 'pan';

export interface Point {
  x: number;
  y: number;
}

export interface Room {
  id: string;
  type: 'room';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Door {
  id: string;
  type: 'door';
  x: number;
  y: number;
  rotation: number;
}

export interface Window {
  id: string;
  type: 'window';
  x: number;
  y: number;
  rotation: number;
}

export interface Camera {
  id: string;
  type: 'camera';
  x: number;
  y: number;
  rotation: number;
}

export interface Wall {
  id: string;
  type: 'wall';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  thickness: number;
}

export interface PencilPath {
  id: string;
  type: 'pencil';
  points: Point[];
  color: string;
  lineWidth: number;
}

export type FloorPlanElement = Room | Door | Window | Camera | Wall | PencilPath;

interface FloorPlanCanvasProps {
  selectedTool: Tool;
  elements: FloorPlanElement[];
  onElementsChange: (elements: FloorPlanElement[]) => void;
  selectedElementId?: string | null;
  onSelectedElementChange?: (id: string | null) => void;
}

const GRID_SIZE = 20;
const DOOR_SIZE = 40;
const WINDOW_SIZE = 40;
const CAMERA_SIZE = 30;

export function FloorPlanCanvas({ selectedTool, elements, onElementsChange, selectedElementId, onSelectedElementChange }: FloorPlanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentPoint, setCurrentPoint] = useState<Point | null>(null);
  const [pencilPoints, setPencilPoints] = useState<Point[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(selectedElementId || null);
  const [panOffset, setPanOffset] = useState<Point>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = '#0a1929';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#1e3a5f';
    ctx.lineWidth = 1;

    for (let x = panOffset.x % GRID_SIZE; x < canvas.width; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = panOffset.y % GRID_SIZE; y < canvas.height; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw all elements
    elements.forEach((element) => {
      const isSelected = element.id === selectedElement;

      if (element.type === 'room') {
        drawRoom(ctx, element, isSelected);
      } else if (element.type === 'door') {
        drawDoor(ctx, element, isSelected);
      } else if (element.type === 'window') {
        drawWindow(ctx, element, isSelected);
      } else if (element.type === 'camera') {
        drawCamera(ctx, element, isSelected);
      } else if (element.type === 'wall') {
        drawWall(ctx, element, isSelected);
      } else if (element.type === 'pencil') {
        drawPencilPath(ctx, element, isSelected);
      }
    });

    // Draw preview while drawing
    if (isDrawing && startPoint && currentPoint && selectedTool === 'room') {
      const width = currentPoint.x - startPoint.x;
      const height = currentPoint.y - startPoint.y;

      ctx.strokeStyle = '#60a5fa';
      ctx.fillStyle = 'rgba(96, 165, 250, 0.1)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(startPoint.x, startPoint.y, width, height);
      ctx.fillRect(startPoint.x, startPoint.y, width, height);
      ctx.setLineDash([]);
    } else if (isDrawing && startPoint && currentPoint && selectedTool === 'wall') {
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.7;
      ctx.setLineDash([5, 5]);

      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    } else if (isDrawing && selectedTool === 'pencil' && pencilPoints.length > 1) {
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.8;

      ctx.beginPath();
      ctx.moveTo(pencilPoints[0].x, pencilPoints[0].y);

      for (let i = 1; i < pencilPoints.length; i++) {
        ctx.lineTo(pencilPoints[i].x, pencilPoints[i].y);
      }

      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }, [elements, selectedElement, isDrawing, startPoint, currentPoint, selectedTool, panOffset, pencilPoints]);

  const drawRoom = (ctx: CanvasRenderingContext2D, room: Room, isSelected: boolean) => {
    ctx.strokeStyle = isSelected ? '#60a5fa' : '#3b82f6';
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.lineWidth = isSelected ? 3 : 2;

    ctx.fillRect(room.x + panOffset.x, room.y + panOffset.y, room.width, room.height);
    ctx.strokeRect(room.x + panOffset.x, room.y + panOffset.y, room.width, room.height);

    // Add dimension labels
    ctx.fillStyle = '#93c5fd';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    const centerX = room.x + panOffset.x + room.width / 2;
    const centerY = room.y + panOffset.y + room.height / 2;
    ctx.fillText(`${Math.abs(Math.round(room.width / GRID_SIZE))}x${Math.abs(Math.round(room.height / GRID_SIZE))}`, centerX, centerY);
  };

  const drawDoor = (ctx: CanvasRenderingContext2D, door: Door, isSelected: boolean) => {
    ctx.save();
    ctx.translate(door.x + panOffset.x, door.y + panOffset.y);
    ctx.rotate((door.rotation * Math.PI) / 180);

    // Door frame
    ctx.strokeStyle = isSelected ? '#60a5fa' : '#8b5cf6';
    ctx.lineWidth = isSelected ? 3 : 2;
    ctx.beginPath();
    ctx.moveTo(-DOOR_SIZE / 2, 0);
    ctx.lineTo(DOOR_SIZE / 2, 0);
    ctx.stroke();

    // Door arc
    ctx.strokeStyle = isSelected ? 'rgba(96, 165, 250, 0.6)' : 'rgba(139, 92, 246, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(-DOOR_SIZE / 2, 0, DOOR_SIZE, 0, Math.PI / 2);
    ctx.stroke();

    // Selection circle
    if (isSelected) {
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawWindow = (ctx: CanvasRenderingContext2D, window: Window, isSelected: boolean) => {
    ctx.save();
    ctx.translate(window.x + panOffset.x, window.y + panOffset.y);
    ctx.rotate((window.rotation * Math.PI) / 180);

    // Window frame
    ctx.strokeStyle = isSelected ? '#60a5fa' : '#06b6d4';
    ctx.lineWidth = isSelected ? 3 : 2;
    ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';

    ctx.fillRect(-WINDOW_SIZE / 2, -3, WINDOW_SIZE, 6);
    ctx.strokeRect(-WINDOW_SIZE / 2, -3, WINDOW_SIZE, 6);

    // Window divider
    ctx.beginPath();
    ctx.moveTo(0, -3);
    ctx.lineTo(0, 3);
    ctx.stroke();

    // Selection circle
    if (isSelected) {
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawCamera = (ctx: CanvasRenderingContext2D, camera: Camera, isSelected: boolean) => {
    ctx.save();
    ctx.translate(camera.x + panOffset.x, camera.y + panOffset.y);
    ctx.rotate((camera.rotation * Math.PI) / 180);

    // Camera view cone
    ctx.fillStyle = isSelected ? 'rgba(96, 165, 250, 0.15)' : 'rgba(34, 197, 94, 0.1)';
    ctx.strokeStyle = isSelected ? 'rgba(96, 165, 250, 0.4)' : 'rgba(34, 197, 94, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(60, -40);
    ctx.lineTo(60, 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Camera body
    ctx.fillStyle = isSelected ? '#60a5fa' : '#22c55e';
    ctx.beginPath();
    ctx.arc(0, 0, CAMERA_SIZE / 3, 0, Math.PI * 2);
    ctx.fill();

    // Camera lens
    ctx.fillStyle = '#0a1929';
    ctx.beginPath();
    ctx.arc(0, 0, CAMERA_SIZE / 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const drawWall = (ctx: CanvasRenderingContext2D, wall: Wall, isSelected: boolean) => {
    ctx.strokeStyle = isSelected ? '#60a5fa' : '#64748b';
    ctx.lineWidth = wall.thickness;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(wall.x1 + panOffset.x, wall.y1 + panOffset.y);
    ctx.lineTo(wall.x2 + panOffset.x, wall.y2 + panOffset.y);
    ctx.stroke();

    // Draw endpoints for selected wall
    if (isSelected) {
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(wall.x1 + panOffset.x, wall.y1 + panOffset.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(wall.x2 + panOffset.x, wall.y2 + panOffset.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawPencilPath = (ctx: CanvasRenderingContext2D, path: PencilPath, isSelected: boolean) => {
    if (path.points.length < 2) return;

    ctx.strokeStyle = isSelected ? '#60a5fa' : path.color;
    ctx.lineWidth = isSelected ? path.lineWidth + 1 : path.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Add glow effect for selected paths
    if (isSelected) {
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 8;
    }

    ctx.beginPath();
    ctx.moveTo(path.points[0].x + panOffset.x, path.points[0].y + panOffset.y);

    for (let i = 1; i < path.points.length; i++) {
      ctx.lineTo(path.points[i].x + panOffset.x, path.points[i].y + panOffset.y);
    }

    ctx.stroke();

    // Reset shadow
    if (isSelected) {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }
  };

  const snapToGrid = (point: Point): Point => {
    return {
      x: Math.round(point.x / GRID_SIZE) * GRID_SIZE,
      y: Math.round(point.y / GRID_SIZE) * GRID_SIZE,
    };
  };

  const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(e);

    if (selectedTool === 'pan' || e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true);
      setPanStart(point);
      return;
    }

    if (selectedTool === 'select') {
      // Check if clicking on an element
      const clicked = elements.find((el) => {
        if (el.type === 'room') {
          return (
            point.x >= el.x + panOffset.x &&
            point.x <= el.x + panOffset.x + el.width &&
            point.y >= el.y + panOffset.y &&
            point.y <= el.y + panOffset.y + el.height
          );
        } else if (el.type === 'wall') {
          // Point-to-line distance calculation
          const x1 = el.x1 + panOffset.x;
          const y1 = el.y1 + panOffset.y;
          const x2 = el.x2 + panOffset.x;
          const y2 = el.y2 + panOffset.y;

          const A = point.x - x1;
          const B = point.y - y1;
          const C = x2 - x1;
          const D = y2 - y1;

          const dot = A * C + B * D;
          const lenSq = C * C + D * D;
          const param = lenSq !== 0 ? dot / lenSq : -1;

          let xx, yy;

          if (param < 0) {
            xx = x1;
            yy = y1;
          } else if (param > 1) {
            xx = x2;
            yy = y2;
          } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
          }

          const dx = point.x - xx;
          const dy = point.y - yy;
          const distance = Math.sqrt(dx * dx + dy * dy);

          return distance < el.thickness / 2 + 5;
        } else if (el.type === 'pencil') {
          // Check if near any segment of the path
          for (let i = 0; i < el.points.length - 1; i++) {
            const x1 = el.points[i].x + panOffset.x;
            const y1 = el.points[i].y + panOffset.y;
            const x2 = el.points[i + 1].x + panOffset.x;
            const y2 = el.points[i + 1].y + panOffset.y;

            const A = point.x - x1;
            const B = point.y - y1;
            const C = x2 - x1;
            const D = y2 - y1;

            const dot = A * C + B * D;
            const lenSq = C * C + D * D;
            const param = lenSq !== 0 ? dot / lenSq : -1;

            let xx, yy;

            if (param < 0) {
              xx = x1;
              yy = y1;
            } else if (param > 1) {
              xx = x2;
              yy = y2;
            } else {
              xx = x1 + param * C;
              yy = y1 + param * D;
            }

            const dx = point.x - xx;
            const dy = point.y - yy;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < el.lineWidth + 5) {
              return true;
            }
          }
          return false;
        } else {
          // Door, Window, Camera - point-based elements
          const dx = point.x - (el.x + panOffset.x);
          const dy = point.y - (el.y + panOffset.y);
          return Math.sqrt(dx * dx + dy * dy) < 20;
        }
      });
      setSelectedElement(clicked ? clicked.id : null);
      onSelectedElementChange?.(clicked ? clicked.id : null);
      return;
    }

    if (selectedTool === 'room') {
      const snapped = snapToGrid({ x: point.x - panOffset.x, y: point.y - panOffset.y });
      setIsDrawing(true);
      setStartPoint(snapped);
      setCurrentPoint(snapped);
    } else if (selectedTool === 'wall') {
      const snapped = snapToGrid({ x: point.x - panOffset.x, y: point.y - panOffset.y });
      setIsDrawing(true);
      setStartPoint(snapped);
      setCurrentPoint(snapped);
    } else if (selectedTool === 'pencil') {
      const unsnapped = { x: point.x - panOffset.x, y: point.y - panOffset.y };
      setIsDrawing(true);
      setStartPoint(unsnapped);
      setCurrentPoint(unsnapped);
      setPencilPoints([unsnapped]); // Initialize with first point
    } else if (selectedTool === 'door' || selectedTool === 'window' || selectedTool === 'camera') {
      const snapped = snapToGrid({ x: point.x - panOffset.x, y: point.y - panOffset.y });
      const newElement: FloorPlanElement =
        selectedTool === 'door'
          ? { id: Date.now().toString(), type: 'door', x: snapped.x, y: snapped.y, rotation: 0 }
          : selectedTool === 'window'
            ? { id: Date.now().toString(), type: 'window', x: snapped.x, y: snapped.y, rotation: 0 }
            : { id: Date.now().toString(), type: 'camera', x: snapped.x, y: snapped.y, rotation: 0 };

      onElementsChange([...elements, newElement]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(e);

    if (isPanning && panStart) {
      setPanOffset({
        x: panOffset.x + (point.x - panStart.x),
        y: panOffset.y + (point.y - panStart.y),
      });
      setPanStart(point);
      return;
    }

    if (isDrawing && startPoint && selectedTool === 'room') {
      const snapped = snapToGrid({ x: point.x - panOffset.x, y: point.y - panOffset.y });
      setCurrentPoint(snapped);
    } else if (isDrawing && startPoint && selectedTool === 'wall') {
      const snapped = snapToGrid({ x: point.x - panOffset.x, y: point.y - panOffset.y });
      setCurrentPoint(snapped);
    } else if (isDrawing && selectedTool === 'pencil') {
      const unsnapped = { x: point.x - panOffset.x, y: point.y - panOffset.y };
      setPencilPoints((prev) => [...prev, unsnapped]);
      setCurrentPoint(unsnapped);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      setIsPanning(false);
      setPanStart(null);
      return;
    }

    if (isDrawing && startPoint && currentPoint && selectedTool === 'room') {
      const width = currentPoint.x - startPoint.x;
      const height = currentPoint.y - startPoint.y;

      if (Math.abs(width) > GRID_SIZE && Math.abs(height) > GRID_SIZE) {
        const newRoom: Room = {
          id: Date.now().toString(),
          type: 'room',
          x: width > 0 ? startPoint.x : startPoint.x + width,
          y: height > 0 ? startPoint.y : startPoint.y + height,
          width: Math.abs(width),
          height: Math.abs(height),
        };

        onElementsChange([...elements, newRoom]);
      }

      setIsDrawing(false);
      setStartPoint(null);
      setCurrentPoint(null);
    } else if (isDrawing && startPoint && currentPoint && selectedTool === 'wall') {
      const dx = currentPoint.x - startPoint.x;
      const dy = currentPoint.y - startPoint.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      if (length > GRID_SIZE) {
        const newWall: Wall = {
          id: Date.now().toString(),
          type: 'wall',
          x1: startPoint.x,
          y1: startPoint.y,
          x2: currentPoint.x,
          y2: currentPoint.y,
          thickness: 2,
        };

        onElementsChange([...elements, newWall]);
      }

      setIsDrawing(false);
      setStartPoint(null);
      setCurrentPoint(null);
    } else if (isDrawing && selectedTool === 'pencil' && pencilPoints.length > 2) {
      const newPath: PencilPath = {
        id: Date.now().toString(),
        type: 'pencil',
        points: pencilPoints,
        color: '#60a5fa',
        lineWidth: 2,
      };

      onElementsChange([...elements, newPath]);

      setIsDrawing(false);
      setStartPoint(null);
      setCurrentPoint(null);
      setPencilPoints([]);
    } else if (isDrawing) {
      // Reset drawing state if conditions not met
      setIsDrawing(false);
      setStartPoint(null);
      setCurrentPoint(null);
      setPencilPoints([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (selectedElement) {
        onElementsChange(elements.filter((el) => el.id !== selectedElement));
        setSelectedElement(null);
        onSelectedElementChange?.(null);
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ cursor: selectedTool === 'pan' || isPanning ? 'grab' : 'crosshair' }}
    />
  );
}