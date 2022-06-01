import { FunctionComponent, useEffect, useState } from "react";
import MainMenu from "./components/MainMenu";
import { NavigationItem } from "./types";

const initDefaultItems = () => {
  if (localStorage.getItem("nav")) {
    return;
  }

  const navItems: NavigationItem[] = [
    {
      key: "menuItem1",
      content: "Menu Item 1",
      items: [
        {
          key: "menuItem1-sub-menu-1",
          content: "Sub Item 1 Item 1",
        },
        {
          key: "menuItem1-sub-menu-2",
          content: "Sub Item 1 Item 2",
        },
        {
          key: "menuItem1-sub-menu-3",
          content: "Sub Item 1 Item 3",
        },
      ],
    },
    {
      key: "menuItem2",
      content: "Menu Item 2",
      items: [
        {
          key: "menuItem2-sub-menu-1",
          content: "Sub Item 2 Item 1",
        },
        {
          key: "menuItem2-sub-menu-2",
          content: "Sub Item 2 Item 2",
        },
        {
          key: "menuItem2-sub-menu-3",
          content: "Sub Item 2 Item 3",
        },
      ],
    },
    {
      key: "menuItem3",
      content: "Menu Item 3",
    },
    {
      key: "menuItem4",
      content: "Menu Item 4",
    },
    {
      key: "menuItem5",
      content: "Menu Item 5",
    },
  ];

  localStorage.setItem("nav", JSON.stringify(navItems));
};

const App: FunctionComponent = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initDefaultItems();
    setReady(true);
  }, []);

  return <>{ready && <MainMenu />}</>;
};

export default App;
