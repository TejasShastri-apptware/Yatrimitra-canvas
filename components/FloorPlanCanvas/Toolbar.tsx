/**
 * Toolbar component for the Floor Plan Designer
 * Professional redesign with glassmorphism and modern UI/UX
 */

import {
    MousePointer2,
    Minus,
    Square,
    Camera,
    DoorOpen,
    Trash2,
    RotateCcw,
    Layers
} from 'lucide-react';
import type { DrawMode } from '@/lib/types/canvas.types';

interface ToolbarProps {
    drawMode: DrawMode;
    onModeChange: (mode: DrawMode) => void;
    onDeleteSelected: () => void;
    onClearAll: () => void;
}

export default function Toolbar({
    drawMode,
    onModeChange,
    onDeleteSelected,
    onClearAll,
}: ToolbarProps) {
    const isActive = (mode: DrawMode) => drawMode === mode;

    const toolButtonClass = (mode: DrawMode) => `
        group relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium 
        transition-all duration-200 overflow-hidden
        ${isActive(mode)
            ? 'bg-gradient-primary text-white shadow-lg shadow-blue-500/30 scale-105'
            : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow-md border border-slate-200/50'
        }
    `;

    const actionButtonClass = (variant: 'danger' | 'secondary') => `
        flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium 
        transition-all duration-200 hover:scale-105
        ${variant === 'danger'
            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/30'
            : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow-md border border-slate-200/50'
        }
    `;

    return (
        <div className="glass-strong border-b border-white/20 shadow-xl">
            <div className="px-8 py-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-primary rounded-xl shadow-lg">
                            <Layers className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Floor Plan Designer
                            </h1>
                            <p className="text-sm text-slate-500 mt-0.5">
                                Professional floor planning tool
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tools */}
                <div className="flex items-center gap-4 flex-wrap">
                    {/* Drawing Tools Group */}
                    <div className="flex items-center gap-2 p-2 bg-slate-50/50 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
                        <button
                            onClick={() => onModeChange('select')}
                            className={toolButtonClass('select')}
                            title="Select and move objects (V)"
                        >
                            <MousePointer2 size={18} />
                            <span className="font-semibold">Select</span>
                            {isActive('select') && (
                                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse-glow"></div>
                            )}
                        </button>

                        <button
                            onClick={() => onModeChange('wall')}
                            className={toolButtonClass('wall')}
                            title="Draw walls (W)"
                        >
                            <Minus size={18} />
                            <span className="font-semibold">Wall</span>
                            {isActive('wall') && (
                                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse-glow"></div>
                            )}
                        </button>

                        <button
                            onClick={() => onModeChange('room')}
                            className={toolButtonClass('room')}
                            title="Draw rooms (R)"
                        >
                            <Square size={18} />
                            <span className="font-semibold">Room</span>
                            {isActive('room') && (
                                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse-glow"></div>
                            )}
                        </button>

                        <button
                            onClick={() => onModeChange('camera')}
                            className={toolButtonClass('camera')}
                            title="Add security camera (C)"
                        >
                            <Camera size={18} />
                            <span className="font-semibold">Camera</span>
                            {isActive('camera') && (
                                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse-glow"></div>
                            )}
                        </button>

                        <button
                            onClick={() => onModeChange('door')}
                            className={toolButtonClass('door')}
                            title="Draw door (D)"
                        >
                            <DoorOpen size={18} />
                            <span className="font-semibold">Door</span>
                            {isActive('door') && (
                                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse-glow"></div>
                            )}
                        </button>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onDeleteSelected}
                            className={actionButtonClass('danger')}
                            title="Delete selected object (Del)"
                        >
                            <Trash2 size={18} />
                            <span className="font-semibold">Delete</span>
                        </button>

                        <button
                            onClick={onClearAll}
                            className={actionButtonClass('secondary')}
                            title="Clear entire canvas"
                        >
                            <RotateCcw size={18} />
                            <span className="font-semibold">Clear All</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
