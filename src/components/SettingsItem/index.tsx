import React, { useEffect, useState } from "react";
import { Header, Flex, Input, Tree, Button } from "@fluentui/react-northstar";
import { NavigationItem } from "../../types";

import {
  SearchIcon,
  TriangleDownIcon,
  TriangleEndIcon,
} from "@fluentui/react-icons-northstar";

type InputChange = {
  type: React.SyntheticEvent;
  target: { value: string };
};

type ITreeItems = {
  id: string;
  title: string;
  items?: ITreeItems[];
};

const titleRenderer = (
  Component: any,
  { content, expanded, open, hasSubtree, ...restProps }: any
) => (
  <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
    {expanded ? <TriangleDownIcon /> : <TriangleEndIcon />}
    {content}
  </Component>
);

const convertToNavItem: any = (item: NavigationItem) => ({
  id: item.key,
  title: item.content,
  items: item.items ? item.items.map(convertToNavItem) : [],
});

interface ISettingItemProps {
  onUpdate: () => void;
}

const SettingItem = (props: ISettingItemProps) => {
  const [treeItems, setTreeItems] = useState<ITreeItems[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [toggleInput, setToggleInput] = useState(false);

  useEffect(() => {
    handleGetNavItems();
  }, []);

  const handleChange = (e: InputChange) => {
    setNewEntry(e.target.value);
  };

  const handleFilter = (e: InputChange) => {
    let navItems: NavigationItem[] = JSON.parse(
      localStorage.getItem("nav") || "[]"
    );

    let filteredArr = navItems.filter((item: NavigationItem) =>
      item.content.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setTreeItems(filteredArr.map(convertToNavItem));
  };

  const handleGetNavItems = () => {
    let navItems: NavigationItem[] = JSON.parse(
      localStorage.getItem("nav") || "[]"
    );
    setTreeItems(navItems.map(convertToNavItem));
  };

  const handleSave = () => {
    localStorage.setItem(
      "nav",
      JSON.stringify(
        treeItems.map((i) => ({
          key: i.id,
          content: i.title,
          items: i.items
            ? i.items.map((i: any) => ({
                key: i.id,
                content: i.title,
              }))
            : [],
        }))
      )
    );

    props.onUpdate();
  };

  const handleEntrySubmit = () => {
    let newEntryItem: any = {
      id: `menuItem${treeItems.length + 1}`,
      title: newEntry,
    };
    setTreeItems((prevState) => [...prevState, newEntryItem]);
    setNewEntry("");
    setToggleInput(false);
  };

  return (
    <>
      <Header
        className="header"
        as="h2"
        content="Configure Navigation"
        description={{
          className: "header_descr",
          as: "span",
          content: "The Mega Menu can be configured here",
        }}
      />
      <Header
        className="header"
        as="h4"
        content="Add Navigation Entries"
        description={{
          className: "header_descr",
          as: "span",
          content:
            "Here's an example of how a section can be used to group inputs",
        }}
      />
      <Flex gap="gap.smaller" className="settings_entry_container">
        <Button
          content="+ Add Entry"
          primary
          onClick={() => setToggleInput(!toggleInput)}
        />
        <Input
          className="settings_input"
          icon={<SearchIcon />}
          clearable
          onChange={(e: any) => handleFilter(e)}
          placeholder="Search for a navigation entry..."
        />
      </Flex>
      <Flex gap="gap.smaller">
        {toggleInput && (
          <Input
            id="new-entry-name"
            placeholder="Enter New Entry"
            value={newEntry}
            onChange={(e: any) => handleChange(e)}
            autoFocus
          />
        )}
        {newEntry.length >= 3 && (
          <Button content="Add" primary onClick={() => handleEntrySubmit()} />
        )}
      </Flex>
      <Tree
        className="settings_content_tree"
        aria-label="Entry Tree"
        items={treeItems}
        renderItemTitle={titleRenderer}
      />
      <Flex className="settings_action_btns" gap="gap.smaller" hAlign="end">
        <Button content="Discard" secondary />
        <Button content="Save" onClick={handleSave} primary />
      </Flex>
    </>
  );
};

export default SettingItem;
