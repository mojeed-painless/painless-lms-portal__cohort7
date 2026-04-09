// Server-stored HTML course release configuration
// Routes are unlocked progressively based on the release day stored on the backend

export const htmlCourseRouteOrder = [
  '/html-transition',
  '/html-structure',
  '/html-list',
  '/html-table',
  '/html-image',
  '/html-hyperlinks',
  '/html-block-element',
  '/html-form',
  '/html-style',
  '/css-transition',
  '/css_introduction',
  '/css_syntax',
  '/css_insert',
  '/css_selectors',
  '/css_color',
  '/css_background',
  '/css_border',
  '/css_boxmodel',
  '/css_width',
  '/css_formatting',
  '/css_links',
  '/css_lists',
  '/css_table',
  '/css_icon',
  '/css_display',
  '/css_overflow',
  '/css_position',
  '/css_flexbox',
  '/css_grid',
  '/css_conbinator',
  '/css_pseudoclass',
  '/css_pseudoelement',
  '/css_attribute',
  '/css_boxshadow',
  '/css_opacity',
  '/css_transform',
  '/css_transition',
  '/css_animation',
  '/css_form',
  '/css_mediaquery',
  '/css_navbar',
  '/css_portfolio',
  '/js-transition',
  '/js-intro',
  '/js-linking',
  '/js-alert',
  '/js-statements',
  '/js-variables',
  '/js-naming-variables',
  '/js-constant',
  '/js-data-types',
  '/js-strings',
  '/js-numbers',
  '/js-bigInt',
  '/js-boolean',
  '/js-null',
  '/js-typeOf',
  '/js-browser-user-interaction',
  '/js-string-conversion',
  '/js-number-conversion',
  '/js-boolean-conversion',
];

// Number of routes unlocked each day
export const dayContentMap = {
  1: 0,
  2: 5,
  3: 2,
  4: 2,
  5: 0,
  6: 4,
  7: 3,
  8: 3,
  9: 2,
  10: 3,
  11: 0,
  12: 2,
  13: 1,
  14: 1,
  15: 1,
  16: 3,
  17: 3,
  18: 3,
  19: 2,
  20: 1,
  21: 1,
  22: 4,
  23: 4,
  24: 4,
  25: 4,
  26: 4,
  27: 4,
  28: 4,
  29: 4,
};

// Calculate total unlocked routes up to given day
export const getTotalUnlockedRoutes = (releaseDay) => {
  const day = Number(releaseDay) || 0;
  if (day <= 0) return 0;

  let total = 0;
  for (let d = 1; d <= day; d++) {
    total += dayContentMap[d] || 0;
  }
  return Math.min(total, htmlCourseRouteOrder.length);
};

// Get list of unlocked paths based on release day
export const getUnlockedPaths = (releaseDay) => {
  const count = getTotalUnlockedRoutes(releaseDay);
  return htmlCourseRouteOrder.slice(0, count);
};

// Check if a specific path is unlocked
export const isPathUnlocked = (path, releaseDay) => {
  const unlockedPaths = getUnlockedPaths(releaseDay);
  return unlockedPaths.includes(path);
};

// Get the first route unlocked on a specific day
export const getFirstRouteForDay = (day) => {
  const dayNum = Number(day) || 0;
  if (dayNum <= 1) return htmlCourseRouteOrder[0];

  let startIndex = 0;
  for (let d = 1; d < dayNum; d++) {
    startIndex += dayContentMap[d] || 0;
  }
  return htmlCourseRouteOrder[startIndex] || htmlCourseRouteOrder[0];
};

// Get display label for a day
export const getDayLabel = (day) => {
  const dayNum = Number(day) || 0;
  const routesToday = dayContentMap[dayNum] || 0;
  const totalRoutes = getTotalUnlockedRoutes(dayNum);
  return `Day ${dayNum}: ${routesToday} new routes (${totalRoutes} total)`;
};
