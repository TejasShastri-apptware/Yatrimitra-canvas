/**
 * Professional theme constants for the Floor Plan application
 */

export const COLORS = {
    // Primary palette
    primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
    },

    // Neutral palette
    neutral: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
    },

    // Canvas colors
    canvas: {
        background: '#ffffff',
        grid: '#e5e7eb',
        gridDot: '#d1d5db',
    },

    // Drawing colors
    wall: {
        stroke: '#1f2937',
        fill: '#374151',
        selected: '#3b82f6',
    },

    room: {
        fill: 'rgba(147, 197, 253, 0.15)',
        stroke: '#3b82f6',
        strokeWidth: 2,
        label: '#1f2937',
    },

    camera: {
        fill: '#ef4444',
        stroke: '#991b1b',
        fov: 'rgba(239, 68, 68, 0.1)',
        strokeWidth: 2,
    },

    door: {
        stroke: '#8b5cf6',
        fill: 'rgba(139, 92, 246, 0.1)',
        arc: 'rgba(139, 92, 246, 0.2)',
        strokeWidth: 2,
    },
};

export const DRAWING_STYLES = {
    wall: {
        thickness: 8,
        stroke: COLORS.wall.stroke,
        strokeWidth: 8,
        fill: COLORS.wall.fill,
        selectionColor: COLORS.wall.selected,
    },

    room: {
        fill: COLORS.room.fill,
        stroke: COLORS.room.stroke,
        strokeWidth: COLORS.room.strokeWidth,
        cornerRadius: 4,
    },

    camera: {
        radius: 20,
        fill: COLORS.camera.fill,
        stroke: COLORS.camera.stroke,
        strokeWidth: COLORS.camera.strokeWidth,
        fovAngle: 90, // degrees
        fovDistance: 150, // pixels
    },

    door: {
        width: 80,
        stroke: COLORS.door.stroke,
        strokeWidth: COLORS.door.strokeWidth,
        arcRadius: 80,
    },
};

export const TYPOGRAPHY = {
    fontFamily: {
        sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
    },

    fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
    },
};

export const GRID = {
    size: 20,
    color: COLORS.canvas.grid,
    dotColor: COLORS.canvas.gridDot,
    style: 'dots' as 'lines' | 'dots',
};
