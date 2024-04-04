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
import { Logout } from "../../assests/image/svg";
import { toast } from "react-toastify";
export default function SidebarFooter() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <List sx={{ mt: { xs: 4, lg: 8 } }}>
        <ListItem
          key="setting"
          disablePadding
          sx={{
            display: "block",
            "&:hover": {
              background: "#ffffff",
            },
          }}
        >
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("token");
              toast.error("با موفقیت از پنل خارج شدین")
            }}
          >
            <ListItemButton
              sx={{
                color: "#1D9BF0",
                minHeight: 40,
                pl: 3,
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
              >
                <Box component="img" src={Logout} />
              </ListItemIcon>
              <ListItemText primary="خروج" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </>
  );
}
