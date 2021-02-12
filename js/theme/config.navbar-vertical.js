const NAVBAR_VERTICAL_CONFIG = {
  isNavbarVerticalCollapsed: false
}
const isNull = key => (JSON.parse(localStorage.getItem(key)) === null);
isNull('isNavbarVerticalCollapsed') && localStorage.setItem('isNavbarVerticalCollapsed', NAVBAR_VERTICAL_CONFIG.isNavbarVerticalCollapsed);

const isNavbarVerticalCollapsed = JSON.parse(localStorage.getItem('isNavbarVerticalCollapsed'));

if(!!isNavbarVerticalCollapsed){
  document.documentElement.className += ' navbar-vertical-collapsed';
}