export const theme = {
  colors: {
    primary: {
      light: "#FF4F59",
      dark: "#FFAD28",
    },
    background: {
      light: "#FFFFFF",
      dark: "#0F172A",
    },
    card: {
      light: "#FFFFFF",
      dark: "#1E293B",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
      muted: "#94A3B8",
    },
  },
  gradients: {
    primary: "from-[#FF4F59] to-[#FFAD28]",
    card: "from-[#FF4F59]/5 to-[#FFAD28]/5",
    hover: "from-[#FF4F59]/10 to-[#FFAD28]/10",
  },
  borders: {
    default: "border border-[#FF4F59]/20",
    hover: "hover:border-[#FF4F59]/40",
    focus: "focus:border-[#FF4F59]/40 focus:ring-1 focus:ring-[#FF4F59]/20",
  },
  transitions: {
    default: "transition-all duration-300",
    hover: "hover:scale-[1.02]",
  },
  shadows: {
    default: "shadow-sm",
    hover: "hover:shadow-md",
  },
  spacing: {
    section: "space-y-8",
    card: "p-6",
  },
} 