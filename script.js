// Function to convert HSL to HEX
function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) {
      r = c; g = x; b = 0;
    } else if (h < 120) {
      r = x; g = c; b = 0;
    } else if (h < 180) {
      r = 0; g = c; b = x;
    } else if (h < 240) {
      r = 0; g = x; b = c;
    } else if (h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    const toHex = (n) => {
      let hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return ('#' + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
  }
  
  // Configuration for 1,000,000 colors in a smooth gradient.
  // We slightly vary the hue as well (from 55 to 65) so the progression appears in a "rainbow order" even in the yellow range.
  const totalColors = 10000;
  const startSaturation = 50; // in percent
  const endSaturation = 100;  // in percent
  const startLightness = 30;  // in percent
  const endLightness = 70;    // in percent
  const hueStart = 50;        // start slightly off yellow
  const hueEnd = 80;          // end slightly off yellow
  
  const container = document.getElementById("colorContainer");
  const fragment = document.createDocumentFragment();
  
  // Generate 1,000,000 hexagon elements using a single loop so they are in a smooth gradient order.
  for (let i = 0; i < totalColors; i++) {
    // Calculate a normalized value t (0 to 1) for this iteration.
    const t = i / (totalColors - 1);
    const saturation = startSaturation + t * (endSaturation - startSaturation);
    const lightness = startLightness + t * (endLightness - startLightness);
    const hue = hueStart + t * (hueEnd - hueStart);
    const hex = hslToHex(hue, saturation, lightness);
    
    const hexagon = document.createElement("div");
    hexagon.classList.add("hexagon");
    hexagon.style.backgroundColor = hex;
    
    // Create a label that displays the hex code in black when hovered
    const label = document.createElement("div");
    label.classList.add("label");
    label.textContent = hex;
    
    hexagon.appendChild(label);
    fragment.appendChild(hexagon);
    
    // Note: For performance testing, consider limiting the number of elements.
    // if (i > 10000) break;
  }
  
  container.appendChild(fragment);