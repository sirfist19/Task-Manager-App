// Function to lighten a color
export const lightenColor = (hex, percent) => {
    // Ensure the percent is between 0 and 100
    //console.log("HEX:", hex)

    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
  
    // Parse the hex color to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    // Calculate the new RGB values
    const newR = r + (255 - r) * (percent / 100);
    const newG = g + (255 - g) * (percent / 100);
    const newB = b + (255 - b) * (percent / 100);
  
    // Ensure the new RGB values are within the valid range
    const finalR = Math.min(255, newR);
    const finalG = Math.min(255, newG);
    const finalB = Math.min(255, newB);
  
    // Convert the adjusted RGB values to a hex code
    const finalHex = `#${Math.round(finalR).toString(16).padStart(2, '0')}${Math.round(finalG).toString(16).padStart(2, '0')}${Math.round(finalB).toString(16).padStart(2, '0')}`;
  
    return finalHex;
  }
  /*
  // Example usage:
  const originalColor = "#3498db"; // Replace this with your color
  const lighterColor = lightenColor(originalColor, 20); // Adjust the percent as needed
  
  console.log(lighterColor); // This will print the lighter hex color
  */