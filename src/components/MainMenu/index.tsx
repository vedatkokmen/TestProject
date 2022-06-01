import {
  Menu,
  MenuIcon,
  MoreIcon,
  SettingsIcon,
  tabListBehavior,
} from "@fluentui/react-northstar";
import { useState, FunctionComponent, useMemo, useEffect } from "react";
import { NavigationItem } from "../../types";
import MenuItem from "../MenuItem";
import Settings from "../Settings";

const MainMenu: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [subNavItems, setSubNavItems] = useState<NavigationItem[]>([]);

  useEffect(() => {
    loadNavigationItems();
  }, []);

  const loadNavigationItems = () => {
    const navItems: NavigationItem[] = JSON.parse(
      localStorage.getItem("nav") || "[]"
    );

    setNavItems(navItems);
  };

  const items = useMemo(() => {
    return [
      {
        key: "menuIcon",
        content: <MenuIcon />,
      },
      ...(navItems || []).map((item, index) => ({
        ...item,
        onMouseOver: () => setActiveTab(index + 1),
      })),
      {
        key: "moreIcon",
        content: <MoreIcon />,
      },
      {
        key: "settingsIcon",
        content: <SettingsIcon />,
        onClick: () => setActiveTab(navItems ? navItems.length + 2 : 2),
      },
    ];
  }, [navItems]);

  useEffect(() => {
    const activeNavItem: any = items[activeTab];

    setSubNavItems(
      activeNavItem.hasOwnProperty("items") ? activeNavItem.items : []
    );
  }, [activeTab, items]);

  return (
    <div className="menu_container">
      <Menu
        defaultActiveIndex={1}
        items={items}
        className="main_menu"
        accessibility={tabListBehavior}
      />
      <MenuItem items={subNavItems} />
      {activeTab === navItems.length + 2 && (
        <Settings onUpdate={loadNavigationItems} />
      )}
    </div>
  );
};

export default MainMenu;
