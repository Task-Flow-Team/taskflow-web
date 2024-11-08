// Interface for the icon colors
export interface IconColors {
  stroke: string;
  fill: string;
  strokeHover: string;
  fillHover: string;
  strokeActive: string;
  fillActive: string;
}

/* 
    
  Colors Index:
    lightest: 100
    lighter: 200
    light: 300
    base: 500
    dark: 600

*/

// Colors taken from Tailwind CSS theme
const colors: { [key: string]: { [key: string]: string } } = {
  indigo: {
    lightest: '#e0e7ff',
    lighter: '#c7d2fe',
    light: '#a5b4fc',
    base: '#6366f1',
    dark: '#4f46e5',
  },
  orange: {
    lightest: '#fff7ed',
    lighter: '#ffedd5',
    light: '#fdba74',
    base: '#f97316',
    dark: '#ea580c',
  },
  green: {
    lightest: '#f0fdf4',
    lighter: '#dcfce7',
    light: '#86efac',
    base: '#22c55e',
    dark: '#16a34a',
  },
  yellow: {
    lightest: '#fefce8',
    lighter: '#fef9c3',
    light: '#fdf08a',
    base: '#f59e0b',
    dark: '#d97706',
  },
  red: {
    lightest: '#fef2f2',
    lighter: '#fee2e2',
    light: '#fecaca',
    base: '#fe1f2f',
    dark: '#e11d48',
  },
  purple: {
    lightest: '#f5f3ff',
    lighter: '#e7e5ff',
    light: '#d6bcfa',
    base: '#9f7aea',
    dark: '#805ad5',
  },
  pink: {
    lightest: '#fdf2f8',
    lighter: '#fce7f3',
    light: '#fbcfe8',
    base: '#f56391',
    dark: '#e53e8b',
  },
  blue: {
    lightest: '#e8f0fe',
    lighter: '#c3ddfd',
    light: '#a4cafe',
    base: '#3730a3',
    dark: '#1c199d',
  },
  teal: {
    lightest: '#e6fffa',
    lighter: '#b2f5ea',
    light: '#81e6d9',
    base: '#319795',
    dark: '#116464',
  },
  cyan: {
    lightest: '#e3fafc',
    lighter: '#c5f6fa',
    light: '#a5f3fc',
    base: '#06b6d4',
    dark: '#0891b2',
  },
  gray: {
    lightest: '#f3f4f6',
    lighter: '#e5e7eb',
    light: '#d1d5db',
    base: '#9ca3af',
    dark: '#6b7280',
  },
  zinc: {
    lightest: '#fafafa',
    lighter: '#f4f4f5',
    light: '#e4e4e7',
    base: '#d4d4d8',
    dark: '#a1a1aa',
  },
  neutral: {
    lightest: '#fafafa',
    lighter: '#f5f5f5',
    light: '#e5e5e5',
    base: '#d4d4d8',
    dark: '#a1a1aa',
  },
  stone: {
    lightest: '#fafaf9',
    lighter: '#f5f5f4',
    light: '#e7e5e4',
    base: '#d6d3d1',
    dark: '#a8a29e',
  },
  violet: {
    lightest: '#f5f3ff',
    lighter: '#ede9fe',
    light: '#ddd6fe',
    base: '#c4b5fd',
    dark: '#a78bfa',
  },
};

/**
 * Method to get the colors for an icon based on the stroke color.
 *
 * The colors are taken from the Tailwind CSS theme.
 *
 * @param item - The configuration of the icon to get the colors for.
 *
 * @returns An object with the colors for the icon.
 */
export function getIconColors(item: Pick<IconColors, 'stroke' | 'fill'>): IconColors {
  // Set the color palette based on the stroke color or default to indigo
  const colorPalette = colors[item.stroke] || colors['indigo'];

  // Return the colors object based on the item configuration
  return {
    stroke: colorPalette['base'],
    fill: item.fill !== 'none' ? colorPalette['lighter'] : 'none',
    strokeHover: colorPalette['dark'],
    fillHover: item.fill !== 'none' ? colorPalette['light'] : 'none',
    strokeActive: colorPalette['dark'],
    fillActive: item.fill !== 'none' ? colorPalette['lightest'] : 'none',
  };
}
