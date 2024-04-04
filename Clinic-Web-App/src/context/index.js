import { createContext } from 'react';

export default createContext({
  handleToggleMode: () => {},
  mode: 'light',
  setDrawerOpen: () => {},
  drawerOpen: false,
  tab : 1,
  setTab : ()=>{}
});
