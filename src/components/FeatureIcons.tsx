// src/components/FeatureIcons.tsx

// A helper type for our icons
type IconProps = {
    className?: string;
};

// Use `currentColor` so we can color it with Tailwind's text colors.
// Example: <IconPrivacyControls className="text-cyan-400" />

export const IconPrivacyControls = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="5" y="11" width="14" height="10" fill="currentColor" opacity="0.4" />
        <path d="M12 2C9.23858 2 7 4.23858 7 7V11H17V7C17 4.23858 14.7614 2 12 2Z" fill="currentColor" />
    </svg>
);

export const IconInstantScale = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="4" y="16" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="10" y="12" width="4" height="8" fill="currentColor" opacity="0.6" />
        <rect x="16" y="8" width="4" height="12" fill="currentColor" />
    </svg>
);

export const IconBuiltInUI = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="6" y="6" width="12" height="2" fill="currentColor" />
        <rect x="6" y="10" width="8" height="2" fill="currentColor" />
        <rect x="6" y="14" width="6" height="2" fill="currentColor" />
    </svg>
);

export const IconLiveMetrics = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="3" y="12" width="2" height="8" fill="currentColor" opacity="0.4" />
        <rect x="7" y="8" width="2" height="12" fill="currentColor" opacity="0.6" />
        <rect x="11" y="4" width="2" height="16" fill="currentColor" />
        <rect x="15" y="10" width="2" height="10" fill="currentColor" opacity="0.8" />
        <rect x="19" y="6" width="2" height="14" fill="currentColor" opacity="0.9" />
    </svg>
);

export const IconCustomWorkflows = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="2" y="6" width="4" height="4" fill="currentColor" />
        <rect x="10" y="2" width="4" height="4" fill="currentColor" opacity="0.8" />
        <rect x="18" y="6" width="4" height="4" fill="currentColor" opacity="0.6" />
        <rect x="10" y="10" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="10" y="18" width="4" height="4" fill="currentColor" opacity="0.7" />
        {/* Connection lines */}
        <rect x="6" y="7" width="4" height="2" fill="currentColor" opacity="0.3" />
        <rect x="11" y="6" width="2" height="4" fill="currentColor" opacity="0.3" />
        <rect x="14" y="7" width="4" height="2" fill="currentColor" opacity="0.3" />
        <rect x="11" y="14" width="2" height="4" fill="currentColor" opacity="0.3" />
    </svg>
);

export const IconModularAPIs = ({ className }: IconProps) => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="2" y="2" width="6" height="6" fill="currentColor" />
        <rect x="16" y="2" width="6" height="6" fill="currentColor" opacity="0.8" />
        <rect x="2" y="16" width="6" height="6" fill="currentColor" opacity="0.6" />
        <rect x="16" y="16" width="6" height="6" fill="currentColor" opacity="0.4" />
        <rect x="9" y="9" width="6" height="6" fill="currentColor" opacity="0.9" />
        {/* Connection lines */}
        <rect x="8" y="4" width="8" height="2" fill="currentColor" opacity="0.3" />
        <rect x="4" y="8" width="2" height="8" fill="currentColor" opacity="0.3" />
        <rect x="18" y="8" width="2" height="8" fill="currentColor" opacity="0.3" />
        <rect x="8" y="18" width="8" height="2" fill="currentColor" opacity="0.3" />
    </svg>
);

export const IconAutoUpdates = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="8" y="2" width="8" height="20" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="10" y="4" width="4" height="2" fill="currentColor" />
        <rect x="10" y="8" width="4" height="2" fill="currentColor" opacity="0.8" />
        <rect x="10" y="12" width="4" height="2" fill="currentColor" opacity="0.6" />
        <rect x="10" y="16" width="4" height="2" fill="currentColor" opacity="0.4" />
        {/* Arrow indicator */}
        <polygon points="12,6 14,8 10,8" fill="currentColor" />
    </svg>
);

export const IconBuiltInStorage = ({ className }: IconProps) => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="3" y="4" width="18" height="4" fill="currentColor" />
        <rect x="3" y="10" width="18" height="4" fill="currentColor" opacity="0.8" />
        <rect x="3" y="16" width="18" height="4" fill="currentColor" opacity="0.6" />
        <circle cx="6" cy="6" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="6" cy="12" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="6" cy="18" r="1" fill="currentColor" opacity="0.4" />
    </svg>
); 