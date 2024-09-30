import React from "react";
import { NavLink } from "react-router-dom";
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  Collapse,
} from "@mui/material";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const NavItem = ({ item, level, pathDirect, onClick }) => {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItem)(() => ({
    // Your existing styling
  }));

  return (
    <>
      <List component="li" disablePadding key={item.id}>
        <ListItemStyled
          button
          component={item.external ? "a" : NavLink}
          to={item.href}
          href={item.external ? item.href : ""}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color: "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            <>{item.title}</>
          </ListItemText>
          {item.children && item.children.length > 0 && (
            <ListItemIcon sx={{ ml: "auto" }}>
              {item.open ? (
                <IconChevronUp stroke={1.5} size="1rem" />
              ) : (
                <IconChevronDown stroke={1.5} size="1rem" />
              )}
            </ListItemIcon>
          )}
        </ListItemStyled>
      </List>
      {item.children && item.children.length > 0 && (
        <Collapse in={item.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <NavItem
                item={child}
                key={child.id}
                level={level + 1}
                pathDirect={pathDirect}
                onClick={onClick}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default NavItem;
