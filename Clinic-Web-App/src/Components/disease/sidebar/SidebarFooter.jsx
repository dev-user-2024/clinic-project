import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logout } from "../../../assests/image/svg";
import { toast } from "react-toastify";
export default function SidebarFooter() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <List sx={{ mt: { xs: 4, lg: 4 }, mb: 2 }}>
        <ListItem
          key="1"
          disablePadding
          sx={{
            display: "block",
            "&:hover": {
              background: "#EFF7FF",
              borderRadius: "50px",
            },
          }}
        >
          <Link to="/">
            <ListItemButton
              sx={{
                minHeight: 40,
                justifyContent: open ? "initial" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  width: 18,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              ></ListItemIcon>
              <ListItemText
                primary="بازگشت به صفحه اصلی"
                sx={{ opacity: open ? 1 : 0, color: "#238BEB" }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </>
  );
}
