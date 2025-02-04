import React from "react";

export type TLoadingProps = {
    color:
        | 'text-primary'
        | 'text-accent'
        | 'text-neutral'
        | 'text-info'
        | 'text-success'
        | 'text-warning'
        | 'text-error';
    type: 'loading-spinner' | 'loading-bars' | 'loading-infinity' | 'loading-ball' | 'loading-ring' | 'loading-dots';
    size: 'loading-xs' | 'loading-sm' | 'loading-md' | 'loading-lg';
};

export const Loading: React.FC<TLoadingProps> = ({ color, type, size }) => {
    return (
        <div>
            <span
                className={`loading  ${type} ${size} ${color}`}
            ></span>
        </div>
    );
};
