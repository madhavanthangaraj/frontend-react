// Utility functions for Employee components

export function formatEmployeeName(name) {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Add more helpers as needed
