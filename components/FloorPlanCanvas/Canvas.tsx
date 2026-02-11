/**
 * Canvas component wrapper for the Floor Plan Designer
 * Professional design with elevated card and ambient lighting
 */

import { forwardRef } from 'react';

interface CanvasProps {
    // Additional props can be added here as needed
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>((props, ref) => {
    return (
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-page relative overflow-hidden">
            {/* Ambient background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-emerald-50/30 pointer-events-none"></div>

            {/* Canvas container with elevated card design */}
            <div className="relative elevated-card p-8 hover-lift">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-blue-500/20 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-blue-500/20 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-blue-500/20 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-blue-500/20 rounded-br-2xl"></div>

                <canvas ref={ref} className="block" />
            </div>
        </div>
    );
});

Canvas.displayName = 'Canvas';

export default Canvas;
