import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Menuitems from "./MenuItems";
import NavGroup from "./NavGroup";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import {
  Box,
  List,
  Collapse,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

const SidebarItems = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (id) => {
    setOpenMenus((prevOpenMenus) => {
      const newOpenMenus = { ...prevOpenMenus };

      // Close all other menus when opening a new one
      Object.keys(newOpenMenus).forEach((key) => {
        if (key !== id) {
          newOpenMenus[key] = false;
        }
      });

      // Toggle the clicked menu
      newOpenMenus[id] = !prevOpenMenus[id];
      return newOpenMenus;
    });
  };

  const handleItemClick = (href) => {
    navigate(href);
  };

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          }

          if (item.children && item.children.length > 0) {
            return (
              <React.Fragment key={item.id}>
                <ListItemButton
                  onClick={() => handleToggle(item.id)}
                  sx={{
                    px: 2,
                    borderRadius: 2,
                    color: pathname.startsWith(item.href)
                      ? "primary.main"
                      : "text.primary",
                    backgroundColor: openMenus[item.id]
                      ? "action.hover"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "action.selected",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: "medium",
                    }}
                  />
                  {openMenus[item.id] ? <IconChevronUp /> : <IconChevronDown />}
                </ListItemButton>
                <Collapse in={openMenus[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ py: 1 }}>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.id}
                        selected={pathname === child.href}
                        onClick={() => handleItemClick(child.href)}
                        sx={{
                          pl: 5,
                          py: 0.5,
                          fontSize: "0.875rem",
                          borderRadius: 2,  
                          color:
                            pathname === child.href
                              ? "primary.main"
                              : "text.secondary",
                          "&:hover": {
                            backgroundColor: "action.hover",
                          },
                          mb: 0.5,
                        }}
                      >
                        <ListItemText
                          primary={child.title}
                          primaryTypographyProps={{
                            fontWeight:
                              pathname === child.href ? "medium" : "regular",
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          }

          return (
            <ListItemButton
              key={item.id}
              selected={pathname === item.href}
              onClick={() => handleItemClick(item.href)}
              sx={{
                px: 2,
                borderRadius: 2,
                color: pathname === item.href ? "primary.main" : "text.primary",
                backgroundColor:
                  pathname === item.href ? "action.hover" : "transparent",
                "&:hover": {
                  backgroundColor: "action.selected",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 35 }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: pathname === item.href ? "medium" : "regular",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
