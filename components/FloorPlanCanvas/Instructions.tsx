/**
 * Instructions component for the Floor Plan Designer
 * Professional design with keyboard shortcuts
 */

import { Info, Keyboard } from 'lucide-react';

export default function Instructions() {
    return (
        <div className="glass-strong border-t border-white/20 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-lg">
                    <Info className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                    <p className="text-sm text-slate-700 font-medium">
                        <strong className="text-slate-900">Quick Start:</strong> Select a tool from the toolbar, then click and drag on the canvas to draw. Use Select mode to move and resize objects.
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-slate-500" />
                <div className="flex gap-2">
                    <kbd className="px-2 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded shadow-sm">V</kbd>
                    <kbd className="px-2 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded shadow-sm">W</kbd>
                    <kbd className="px-2 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded shadow-sm">R</kbd>
                    <kbd className="px-2 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded shadow-sm">Del</kbd>
                </div>
            </div>
        </div>
    );
}
