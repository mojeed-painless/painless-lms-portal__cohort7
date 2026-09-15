import CSSTransition from '../pages/css-pages/CSSTransition';
import Animation from '../pages/css-pages/Animation';
import AttributesSelector from '../pages/css-pages/AttributesSelector';
import Background from '../pages/css-pages/Background';
import Borders from '../pages/css-pages/Borders';
import BoxModel from '../pages/css-pages/BoxModel';
import BoxShadow from '../pages/css-pages/BoxShadow';
import Colors from '../pages/css-pages/Colors';
import Combinators from '../pages/css-pages/Combinators';
import CSSIntroduction from '../pages/css-pages/CSSIntroduction';
import CSSSyntax from '../pages/css-pages/CSSSyntax';
import DisplayLayout from '../pages/css-pages/DisplayLayout';
import FlexboxLayout from '../pages/css-pages/FlexboxLayout';
import GridLayout from '../pages/css-pages/GridLayout';
import HeightWidth from '../pages/css-pages/HeightWidth';
import Icons from '../pages/css-pages/Icons';
import InsertingCSS from '../pages/css-pages/InsertingCSS';
import Links from '../pages/css-pages/Links';
import Lists from '../pages/css-pages/Lists';
import MediaQuery from '../pages/css-pages/MediaQuery';
import NavigationBar from '../pages/css-pages/NavigationBar';
import Opacity from '../pages/css-pages/Opacity';
import OverflowLayout from '../pages/css-pages/OverflowLayout';
import PortfolioProject from '../pages/css-pages/PortfolioProject';
import PositionLayout from '../pages/css-pages/PositionLayout';
import PseudoClasses from '../pages/css-pages/PseudoClasses';
import PseudoElements from '../pages/css-pages/PseudoElements';
import Selectors from '../pages/css-pages/Selectors';
import StylingForms from '../pages/css-pages/StylingForms';
import Tables from '../pages/css-pages/Tables';
import TextFormatting from '../pages/css-pages/TextFormatting';
import Transform from '../pages/css-pages/Transform';
import Transition from '../pages/css-pages/Transition';

export const cssRoutes = [
  { path: '/css-transition', component: CSSTransition },
  { path: '/css_animation', component: Animation },
  { path: '/css_attribute', component: AttributesSelector },
  { path: '/css_background', component: Background },
  { path: '/css_border', component: Borders },
  { path: '/css_boxmodel', component: BoxModel },
  { path: '/css_boxshadow', component: BoxShadow },
  { path: '/css_color', component: Colors },
  { path: '/css_conbinator', component: Combinators },
  { path: '/css_introduction', component: CSSIntroduction },
  { path: '/css_syntax', component: CSSSyntax },
  { path: '/css_display', component: DisplayLayout },
  { path: '/css_flexbox', component: FlexboxLayout },
  { path: '/css_grid', component: GridLayout },
  { path: '/css_width', component: HeightWidth },
  { path: '/css_icon', component: Icons },
  { path: '/css_insert', component: InsertingCSS },
  { path: '/css_links', component: Links },
  { path: '/css_lists', component: Lists },
  { path: '/css_mediaquery', component: MediaQuery },
  { path: '/css_navbar', component: NavigationBar },
  { path: '/css_opacity', component: Opacity },
  { path: '/css_overflow', component: OverflowLayout },
  { path: '/css_portfolio', component: PortfolioProject },
  { path: '/css_position', component: PositionLayout },
  { path: '/css_pseudoclass', component: PseudoClasses },
  { path: '/css_pseudoelement', component: PseudoElements },
  { path: '/css_selectors', component: Selectors },
  { path: '/css_form', component: StylingForms },
  { path: '/css_table', component: Tables },
  { path: '/css_formatting', component: TextFormatting },
  { path: '/css_transform', component: Transform },
  { path: '/css_transition', component: Transition },
];
