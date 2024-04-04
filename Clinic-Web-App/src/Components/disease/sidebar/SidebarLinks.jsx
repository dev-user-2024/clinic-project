import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MainContext from '../../../context/index';
import { useState , useContext } from "react";

function SidebarLinks() {
  const [open, setOpen] = useState(true);
  const { setTab } = useContext(MainContext);
  const list = [
    { label: "داروها", tab: 1 },
    { label: "بازی ها", tab: 2 },
    { label: "آزمون ها", tab: 3 },
    { label: "مهارت های زندگی", tab: 4 },
    { label: "دانستنی ها", tab: 5 },
    { label: "مدیتیشن ها", tab: 6 },
  ];
  return (
    <>
      <List
        sx={{ mt: 2 }}
      >
        {list.map((i, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              pl:4,
              mb:1,
              "&:hover": {
                background: "#EFF7FF",
                borderRadius: "50px",
              },
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 40,
                justifyContent: open ? "initial" : "center",
              }}
              onClick={()=>{setTab(i.tab)}}
            >
              <ListItemText
                primary={`●    ${i.label}`}
                sx={{ opacity: open ? 1 : 0 , color:"#238BEB"}}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
export default SidebarLinks;
