export function formatCategory(category) {
  if (!category) return "Other";
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getProjectIcon(iconName) {
  const iconMap = {
    "map-pin": "MapPin",
    "shield-alert": "ShieldAlert",
    "graduation-cap": "GraduationCap",
    "monitor-smartphone": "MonitorSmartphone",
    baby: "Baby",
    "layout-template": "LayoutTemplate",
    server: "Server",
    users: "Users",
    "folder-closed": "FolderClosed",
    "brain-circuit": "BrainCircuit",
  };
  return iconMap[iconName] ?? "Code";
}
