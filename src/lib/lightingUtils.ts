
export interface LightingSettings {
  brightness: number;
  temperature: number; // In Kelvin (approximate)
  contrast: number;
  shadows: number;
  preset?: string;
}

export const applyLighting = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  settings: LightingSettings
) => {
  const { width, height } = image;
  ctx.clearRect(0, 0, width, height);
  
  // Draw original image
  ctx.filter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%)`;
  ctx.drawImage(image, 0, 0, width, height);

  // Apply color temperature overlay
  const tempColor = getTemperatureColor(settings.temperature);
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillStyle = tempColor;
  ctx.globalAlpha = 0.3; // subtle overlay
  ctx.fillRect(0, 0, width, height);

  // Apply "Shadows" (simulated via dark/light overlay)
  if (settings.shadows !== 100) {
    ctx.globalCompositeOperation = settings.shadows < 100 ? 'multiply' : 'screen';
    ctx.fillStyle = settings.shadows < 100 ? 'black' : 'white';
    ctx.globalAlpha = Math.abs(100 - settings.shadows) / 400;
    ctx.fillRect(0, 0, width, height);
  }

  // Reset context
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1.0;
  ctx.filter = 'none';
};

// Simple utility to convert temperature to color
function getTemperatureColor(kelvin: number): string {
  // Rough approximation for UI purposes
  if (kelvin <= 3000) return 'rgb(255, 147, 41)'; // Warm / Orange
  if (kelvin <= 4500) return 'rgb(255, 197, 143)'; // Neutral / Warmish
  if (kelvin <= 5500) return 'rgb(255, 255, 255)'; // White
  if (kelvin <= 7000) return 'rgb(201, 226, 255)'; // Cool / Bluish
  return 'rgb(64, 156, 255)'; // Very Cool / Deep Blue
}

export const PRESETS: Record<string, LightingSettings> = {
  warm: { brightness: 110, temperature: 2700, contrast: 105, shadows: 90 },
  cool: { brightness: 105, temperature: 5000, contrast: 100, shadows: 100 },
  daylight: { brightness: 120, temperature: 6500, contrast: 110, shadows: 110 },
  sunset: { brightness: 90, temperature: 2500, contrast: 120, shadows: 80 },
  night: { brightness: 60, temperature: 3000, contrast: 90, shadows: 70 },
  studio: { brightness: 130, temperature: 5500, contrast: 115, shadows: 120 },
};
