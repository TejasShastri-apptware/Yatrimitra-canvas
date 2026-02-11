/**
 * Zoom Controls component for canvas navigation
 * Professional pill design with gradient styling
 */

'use client';

import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ZoomControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onFitToScreen: () => void;
    zoomLevel?: number;
}

export default function ZoomControls({
    onZoomIn,
    onZoomOut,
    onFitToScreen,
    zoomLevel = 100
}: ZoomControlsProps) {
    return (
        <div className="absolute right-6 bottom-6 glass-strong rounded-2xl shadow-2xl border border-white/30 p-3 z-10 animate-fade-in">
            <div className="flex flex-col gap-2">
                <button
                    onClick={onZoomIn}
                    className="p-3 hover:bg-gradient-primary hover:text-white rounded-xl transition-all duration-200 hover:scale-110 group"
                    title="Zoom In (+)"
                >
                    <ZoomIn size={20} className="text-slate-700 group-hover:text-white transition-colors" />
                </button>

                <div className="px-3 py-2 text-xs font-bold text-slate-900 text-center bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-slate-200/50">
                    {Math.round(zoomLevel)}%
                </div>

                <button
                    onClick={onZoomOut}
                    className="p-3 hover:bg-gradient-primary hover:text-white rounded-xl transition-all duration-200 hover:scale-110 group"
                    title="Zoom Out (-)"
                >
                    <ZoomOut size={20} className="text-slate-700 group-hover:text-white transition-colors" />
                </button>

                <div className="h-px bg-slate-200/50 my-1"></div>

                <button
                    onClick={onFitToScreen}
                    className="p-3 hover:bg-gradient-primary hover:text-white rounded-xl transition-all duration-200 hover:scale-110 group"
                    title="Fit to Screen (0)"
                >
                    <Maximize2 size={20} className="text-slate-700 group-hover:text-white transition-colors" />
                </button>
            </div>
        </div>
    );
}
