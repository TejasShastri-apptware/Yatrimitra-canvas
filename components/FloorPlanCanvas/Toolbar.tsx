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
        group relative flex items-center gap-1.5 px-3 py-3 rounded-lg font-semibold text-lg
        transition-all duration-200 overflow-hidden
        ${isActive(mode)
            ? 'bg-gradient-primary text-slate-900 shadow-md shadow-yellow-500/30 scale-105 font-bold'
            : 'bg-secondary-blue-dark text-white hover:bg-secondary-blue hover:shadow-sm border border-blue-400/30'
        }
    `;

    const actionButtonClass = (variant: 'danger' | 'secondary') => `
        flex items-center gap-1.5 px-3 py-2.5 rounded-lg font-semibold text-lg
        transition-all duration-200 hover:scale-105
        ${variant === 'danger'
            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-md hover:shadow-red-500/30'
            : 'bg-dark-navy-lighter text-white hover:bg-dark-navy-light hover:shadow-sm border border-yellow-400/20'
        }
    `;

    return (
        <div className="glass-strong border-b border-yellow-400/20 shadow-lg bg-dark-navy">
            <div className="px-5 py-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gradient-primary rounded-lg shadow-md">
                            <Layers className="w-4 h-4 text-slate-900" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white">
                                Floor Plan Designer
                            </h1>
                            <p className="text-xs text-slate-400 mt-0">
                                Professional floor planning tool
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tools */}
                <div className="flex items-center gap-2.5 mt-6 mb-2 flex-wrap">
                    {/* Drawing Tools Group */}
                    <div className="flex items-center gap-2.5 p-1.5 rounded-xl backdrop-blur-sm">
                        <button
                            onClick={() => onModeChange('select')}
                            className={toolButtonClass('select')}
                            title="Select and move"
                        >
                            <MousePointer2 size={14} />
                            <span className="font-semibold">Select</span>
                            {isActive('select') && (
                                <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse-glow"></div>
                            )}
                        </button>

                        <button
                            onClick={() => onModeChange('wall')}
                            className={toolButtonClass('wall')}
                            title="Draw walls"
                        >
                            <Minus size={14} />
                            <span className="font-semibold">Wall</span>
                            {isActive('wall') && (
                                <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse-glow"></div>
                            )}
                        </button>

                        <button
                            onClick={() => onModeChange('room')}
                            className={toolButtonClass('room')}
                            title="Draw rooms (R)"
                        >
                            <Square size={14} />
                            <span className="font-semibold">Room</span>
                            {isActive('room') && (
                                <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse-glow"></div>
                            )}
                        </button>

                        <button
                            onClick={() => onModeChange('camera')}
                            className={toolButtonClass('camera')}
                            title="Add security camera (C)"
                        >
                            <Camera size={14} />
                            <span className="font-semibold">Camera</span>
                            {isActive('camera') && (
                                <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse-glow"></div>
                            )}
                        </button>

                        <button
                            onClick={() => onModeChange('door')}
                            className={toolButtonClass('door')}
                            title="Draw door (D)"
                        >
                            <DoorOpen size={14} />
                            <span className="font-semibold">Door</span>
                            {isActive('door') && (
                                <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse-glow"></div>
                            )}
                        </button>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 mr-4">
                        <button
                            onClick={onDeleteSelected}
                            className={actionButtonClass('danger')}
                            title="Delete selected object (Del)"
                        >
                            <Trash2 size={26} />
                            <span className="font-semibold text-[17px]">Video Delete!</span>
                        </button>

                        <button
                            onClick={onClearAll}
                            className={actionButtonClass('secondary')}
                            title="Clear entire canvas"
                        >
                            <RotateCcw size={25} />
                            <span className="font-semibold text-[17px]">Clear All</span>
                            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
