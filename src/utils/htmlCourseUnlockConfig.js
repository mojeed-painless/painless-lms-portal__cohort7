export const HTML_RELEASE_DAY_KEY = 'htmlReleaseDay';

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

/**
 * Configure the number of content items unlocked per day.
 * Edit this object to customize how many routes are available each day.
 * Example: Day 1 unlocks 5 routes, Day 2 unlocks 4 more, etc.
 */
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

export const getHtmlReleaseCount = (day) => {
  const normalizedDay = Number(day) || 0;
  if (normalizedDay <= 0) return 0;
  
  let totalCount = 0;
  for (let d = 2; d <= normalizedDay; d++) {
    totalCount += dayContentMap[d] || 0;
  }
  
  return Math.min(totalCount, htmlCourseRouteOrder.length);
};

export const getUnlockedHtmlPaths = (day) => {
  const count = getHtmlReleaseCount(day);
  return htmlCourseRouteOrder.slice(0, count);
};

export const getFirstDayRouteIndex = (day) => {
  const normalizedDay = Number(day) || 0;
  if (normalizedDay <= 1) return 0;
  
  let startIndex = 0;
  for (let d = 2; d < normalizedDay; d++) {
    startIndex += dayContentMap[d] || 0;
  }
  
  return startIndex;
};

export const getFirstDayRoute = (day) => {
  const index = getFirstDayRouteIndex(day);
  return htmlCourseRouteOrder[index] || htmlCourseRouteOrder[0];
};

export const getReleaseLabel = (day) => {
  const count = getHtmlReleaseCount(day);
  const dayContent = dayContentMap[day] || 0;
  return `Day ${day} unlocks ${dayContent} more route${dayContent === 1 ? '' : 's'} (${count} total)`;
};
