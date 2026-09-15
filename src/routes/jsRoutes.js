import JSTransition from '../pages/js-pages/JSTransition';
import JavascriptIntro from '../pages/js-pages/JavascriptIntro';
import LinkingJavascript from '../pages/js-pages/LinkingJavascript';
import Alert from '../pages/js-pages/Alert';
import Statements from '../pages/js-pages/Statements';
import Variables from '../pages/js-pages/Variables';
import NamingVariables from '../pages/js-pages/NamingVariables';
import Constant from '../pages/js-pages/Constant';
import DataTypes from '../pages/js-pages/DataTypes';
import Strings from '../pages/js-pages/Strings';
import Numbers from '../pages/js-pages/Numbers';
import BigInt from '../pages/js-pages/BigInt';
import Boolean from '../pages/js-pages/Boolean';
import Null from '../pages/js-pages/Null';
import TypeOf from '../pages/js-pages/TypeOf';
import BrowserUserInteraction from '../pages/js-pages/BrowserUserInteraction';
import StringConversion from '../pages/js-pages/StringConversion';
import NumberConversion from '../pages/js-pages/NumberConversion';
import BooleanConversion from '../pages/js-pages/BooleanConversion';

export const jsRoutes = [
  { path: '/js-transition', component: JSTransition },
  { path: '/js-intro', component: JavascriptIntro },
  { path: '/js-linking', component: LinkingJavascript },
  { path: '/js-alert', component: Alert },
  { path: '/js-statements', component: Statements },
  { path: '/js-variables', component: Variables },
  { path: '/js-naming-variables', component: NamingVariables },
  { path: '/js-constant', component: Constant },
  { path: '/js-data-types', component: DataTypes },
  { path: '/js-strings', component: Strings },
  { path: '/js-numbers', component: Numbers },
  { path: '/js-bigInt', component: BigInt },
  { path: '/js-boolean', component: Boolean },
  { path: '/js-null', component: Null },
  { path: '/js-typeOf', component: TypeOf },
  { path: '/js-browser-user-interaction', component: BrowserUserInteraction },
  { path: '/js-string-conversion', component: StringConversion },
  { path: '/js-number-conversion', component: NumberConversion },
  { path: '/js-boolean-conversion', component: BooleanConversion },
];
