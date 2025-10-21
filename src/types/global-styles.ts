/**
 * WordPress Global Styles Types (FSE - Full Site Editing)
 * Based on WordPress REST API /wp/v2/global-styles endpoints
 * Uses theme.json structure for settings and styles
 */

/**
 * Global Styles object (wp_global_styles custom post type)
 * Represents the customized global styles for a theme
 */
export interface GlobalStyles {
    /** Global styles ID */
    id: string | number;
    
    /** Title of the global styles */
    title?: {
        raw?: string;
        rendered?: string;
    };
    
    /** Global styles (CSS-like structure following theme.json spec) */
    styles?: GlobalStylesStyles;
    
    /** Global settings (theme.json settings) */
    settings?: GlobalStylesSettings;
    
    /** Theme stylesheet name */
    theme?: string;
    
    /** Author ID */
    author?: number;
    
    /** Modified date */
    modified?: string;
    
    /** Status */
    status?: string;
}

/**
 * Global Styles - Styles object
 * CSS-like structure for styling blocks and elements
 */
export interface GlobalStylesStyles {
    /** Root/global styles */
    color?: {
        background?: string;
        text?: string;
        link?: string;
    };
    
    /** Typography styles */
    typography?: {
        fontFamily?: string;
        fontSize?: string;
        fontStyle?: string;
        fontWeight?: string;
        letterSpacing?: string;
        lineHeight?: string;
        textDecoration?: string;
        textTransform?: string;
    };
    
    /** Spacing styles */
    spacing?: {
        margin?: SpacingValue;
        padding?: SpacingValue;
        blockGap?: string;
    };
    
    /** Border styles */
    border?: {
        color?: string;
        radius?: string;
        style?: string;
        width?: string;
    };
    
    /** Element-specific styles */
    elements?: {
        link?: GlobalStylesStyles;
        button?: GlobalStylesStyles;
        heading?: GlobalStylesStyles;
        h1?: GlobalStylesStyles;
        h2?: GlobalStylesStyles;
        h3?: GlobalStylesStyles;
        h4?: GlobalStylesStyles;
        h5?: GlobalStylesStyles;
        h6?: GlobalStylesStyles;
        [key: string]: GlobalStylesStyles | undefined;
    };
    
    /** Block-specific styles */
    blocks?: {
        [blockName: string]: GlobalStylesStyles;
    };
    
    /** Index signature for extensibility */
    [key: string]: any;
}

/**
 * Spacing value (can be string or object with top/right/bottom/left)
 */
export type SpacingValue = string | {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
};

/**
 * Global Styles - Settings object
 * Theme.json settings structure
 */
export interface GlobalStylesSettings {
    /** Appearance tools */
    appearanceTools?: boolean;
    
    /** Color settings */
    color?: {
        custom?: boolean;
        customDuotone?: boolean;
        customGradient?: boolean;
        defaultDuotone?: boolean;
        defaultGradients?: boolean;
        defaultPalette?: boolean;
        duotone?: ColorPalette[];
        gradients?: ColorPalette[];
        palette?: ColorPalette[];
        link?: boolean;
    };
    
    /** Typography settings */
    typography?: {
        customFontSize?: boolean;
        fontSizes?: FontSize[];
        fontFamilies?: FontFamily[];
        lineHeight?: boolean;
        dropCap?: boolean;
        fontStyle?: boolean;
        fontWeight?: boolean;
        letterSpacing?: boolean;
        textDecoration?: boolean;
        textTransform?: boolean;
    };
    
    /** Spacing settings */
    spacing?: {
        blockGap?: boolean;
        margin?: boolean;
        padding?: boolean;
        units?: string[];
        customSpacingSize?: boolean;
        spacingSizes?: SpacingSize[];
    };
    
    /** Border settings */
    border?: {
        color?: boolean;
        radius?: boolean;
        style?: boolean;
        width?: boolean;
    };
    
    /** Layout settings */
    layout?: {
        contentSize?: string;
        wideSize?: string;
    };
    
    /** Custom settings */
    custom?: Record<string, any>;
    
    /** Block-specific settings */
    blocks?: {
        [blockName: string]: GlobalStylesSettings;
    };
    
    /** Index signature for extensibility */
    [key: string]: any;
}

/**
 * Color palette entry
 */
export interface ColorPalette {
    slug: string;
    color: string;
    name: string;
}

/**
 * Font size entry
 */
export interface FontSize {
    slug: string;
    size: string;
    name: string;
}

/**
 * Font family entry
 */
export interface FontFamily {
    slug: string;
    fontFamily: string;
    name: string;
    fontFace?: FontFace[];
}

/**
 * Font face entry
 */
export interface FontFace {
    fontFamily: string;
    fontWeight?: string;
    fontStyle?: string;
    fontDisplay?: string;
    src?: string[];
}

/**
 * Spacing size entry
 */
export interface SpacingSize {
    slug: string;
    size: string;
    name: string;
}

/**
 * Global Styles Variation
 * Represents a style variation for a theme
 */
export interface GlobalStylesVariation {
    /** Variation slug */
    slug: string;
    
    /** Variation title */
    title: string;
    
    /** Variation description */
    description?: string;
    
    /** Variation styles */
    styles?: GlobalStylesStyles;
    
    /** Variation settings */
    settings?: GlobalStylesSettings;
}

/**
 * Data for creating/updating global styles
 */
export interface GlobalStylesData {
    /** Title */
    title?: string | { raw: string };
    
    /** Styles object */
    styles?: GlobalStylesStyles | Record<string, any>;
    
    /** Settings object */
    settings?: GlobalStylesSettings | Record<string, any>;
    
    /** Index signature for compatibility */
    [key: string]: any;
}

