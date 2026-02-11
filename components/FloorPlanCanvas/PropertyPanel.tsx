/**
 * Property Panel component for editing selected objects
 * Professional design with glassmorphism and categorized sections
 */

'use client';

import { X, Move, Maximize2, RotateCw, FlipHorizontal2, FlipVertical2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PropertyPanelProps {
    selectedObject: any | null;
    onClose: () => void;
    onUpdate: (properties: any) => void;
}

export default function PropertyPanel({ selectedObject, onClose, onUpdate }: PropertyPanelProps) {
    const [properties, setProperties] = useState<any>({});

    useEffect(() => {
        if (selectedObject) {
            setProperties({
                left: Math.round(selectedObject.left || 0),
                top: Math.round(selectedObject.top || 0),
                width: Math.round(selectedObject.width || 0),
                height: Math.round(selectedObject.height || 0),
                angle: Math.round(selectedObject.angle || 0),
            });
        }
    }, [selectedObject]);

    if (!selectedObject) return null;

    const handleChange = (key: string, value: number) => {
        const newProps = { ...properties, [key]: value };
        setProperties(newProps);
        onUpdate({ [key]: value });
    };

    return (
        <div className="absolute right-6 top-24 w-80 glass-strong rounded-2xl shadow-2xl border border-white/30 p-5 z-10 animate-slide-in-right">
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200/50">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-primary rounded-lg">
                        <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900">Properties</h3>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <X size={18} className="text-slate-500" />
                </button>
            </div>

            <div className="space-y-5">
                {/* Position Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        <Move size={14} />
                        <span>Position</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-slate-600 block mb-1.5">
                                X Position
                            </label>
                            <input
                                type="number"
                                value={properties.left}
                                onChange={(e) => handleChange('left', parseFloat(e.target.value))}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-600 block mb-1.5">
                                Y Position
                            </label>
                            <input
                                type="number"
                                value={properties.top}
                                onChange={(e) => handleChange('top', parseFloat(e.target.value))}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Size Section */}
                {(properties.width > 0 || properties.height > 0) && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            <Maximize2 size={14} />
                            <span>Size</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {properties.width > 0 && (
                                <div>
                                    <label className="text-xs font-medium text-slate-600 block mb-1.5">
                                        Width
                                    </label>
                                    <input
                                        type="number"
                                        value={properties.width}
                                        onChange={(e) => handleChange('width', parseFloat(e.target.value))}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            )}
                            {properties.height > 0 && (
                                <div>
                                    <label className="text-xs font-medium text-slate-600 block mb-1.5">
                                        Height
                                    </label>
                                    <input
                                        type="number"
                                        value={properties.height}
                                        onChange={(e) => handleChange('height', parseFloat(e.target.value))}
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Rotation Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        <RotateCw size={14} />
                        <span>Rotation</span>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={properties.angle}
                            onChange={(e) => handleChange('angle', parseFloat(e.target.value))}
                            className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <button
                            onClick={() => handleChange('angle', (properties.angle + 90) % 360)}
                            className="px-4 py-2.5 bg-gradient-primary text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105"
                            title="Rotate 90°"
                        >
                            +90°
                        </button>
                    </div>
                </div>

                {/* Transform Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        <FlipHorizontal2 size={14} />
                        <span>Transform</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => {
                                const newValue = !selectedObject.flipX;
                                onUpdate({ flipX: newValue });
                                setProperties({ ...properties, flipX: newValue });
                            }}
                            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/80 hover:bg-white border border-slate-200 rounded-lg text-xs font-semibold transition-all hover:shadow-md hover:scale-105"
                        >
                            <FlipHorizontal2 size={14} />
                            Flip H
                        </button>
                        <button
                            onClick={() => {
                                const newValue = !selectedObject.flipY;
                                onUpdate({ flipY: newValue });
                                setProperties({ ...properties, flipY: newValue });
                            }}
                            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/80 hover:bg-white border border-slate-200 rounded-lg text-xs font-semibold transition-all hover:shadow-md hover:scale-105"
                        >
                            <FlipVertical2 size={14} />
                            Flip V
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
