export const globalFont = "Cormorant";

let numberToFontWeight: { [key: string]: string; [key: number]: string } = {
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "SemiBold",
    700: "Bold",
    "light": "Light",
    "regular": "Regular",
    "medium": "Medium",
    "semibold": "SemiBold",
    "bold": "Bold",
}

export const Fonts = (fontWeight: string | number = "regular", italic: boolean = false, fontFamily: string = globalFont, ): string => {
    const weight = numberToFontWeight[fontWeight] || "Regular"; // Default to "Regular" if not found
    return `${fontFamily}${weight}${italic ? "Italic" : ""}`;
}