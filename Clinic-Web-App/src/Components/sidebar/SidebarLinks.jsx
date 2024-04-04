import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  ListItemText,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Dot } from "../../assests/image/svg/dot.svg";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import dashBoard from "../../assests/icons/element-3.svg";
import user from "../../assests/icons/user-square.svg";
import note from "../../assests/icons/note.svg";
import info from "../../assests/icons/info-circle.svg";
import call from "../../assests/icons/call-calling.svg";
import setting from "../../assests/icons/setting-2.svg";

function SidebarLinks() {
  const [open, setOpen] = useState(true);
  const [openList, setOpenList] = useState(false);
  const [openList2, setOpenList2] = useState(false);
  const [openList3, setOpenList3] = useState(false);
  const [openList4, setOpenList4] = useState(false);

  const handleClick = () => {
    setOpenList(!openList);
  };
  const handleClick2 = () => {
    setOpenList2(!openList2);
  };

  const handleClick3 = () => {
    setOpenList3(!openList3);
  };
  const handleClick4 = () => {
    setOpenList4(!openList4);
  };
  return (
    <>
      <List sx={{ mt: 2 }}>
        <ListItem
          key="1"
          disablePadding
          sx={{
            display: "block",
            "&:hover": {
              background: "#0d99ff",
            },
          }}
        >
          <Link to="/">
            <ListItemButton
              sx={{
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
                <Box component="img" src={dashBoard} />
              </ListItemIcon>
              <ListItemText primary="داشبورد" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem
          key="2"
          disablePadding
          sx={{
            display: "block",
            "&:hover": {
              background: "#0d99ff",
            },
          }}
        >
          <Link to="/my-visit">
            <ListItemButton
              sx={{
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
                <Box component="img" src={user} />
              </ListItemIcon>
              <ListItemText
                primary="نوبت های من"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem
          key="3"
          disablePadding
          sx={{
            display: "block",
            "&:hover": {
              background: "#0d99ff",
            },
          }}
        >
          <ListItemButton
            onClick={handleClick}
            sx={{
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
              <Box component="img" src={note} />
            </ListItemIcon>
            <ListItemText primary="خدمات ما" sx={{ opacity: open ? 1 : 0 }} />
            {openList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <List component="div" disablePadding>
          <Link to="/mental-health">
            <ListItemButton sx={{ pl: 1 }}>
              <ListItemIcon sx={{ pl: 3 }}>
                <Dot />
              </ListItemIcon>
              <ListItemText primary="سلامت روان" />
            </ListItemButton>
          </Link>
        </List>
            <List component="div" disablePadding onClick={handleClick2}>
              <Link >
                <ListItemButton sx={{ pl: 1 }}>
                  <ListItemIcon sx={{ pl: 3 }}>
                    <Dot />
                  </ListItemIcon>
                  <ListItemText primary="مدیتیشن" />
                  {openList2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </Link>
            </List>
            <Collapse in={openList2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <List component="div" disablePadding onClick={handleClick2}>
                <Link to="/meditation/simple">
                  <ListItemButton sx={{ pl: 1 }}>
                    <ListItemIcon sx={{ pl: 3 }}>
                      <Dot />
                    </ListItemIcon>
                    <ListItemText primary="مبتدی" />
                  </ListItemButton>
                </Link>
              </List>
              <List component="div" disablePadding>
                <Link to="/meditation/hard">
                  <ListItemButton sx={{ pl: 1 }}>
                    <ListItemIcon sx={{ pl: 3 }}>
                      <Dot />
                    </ListItemIcon>
                    <ListItemText primary="پیشرفته" />
                  </ListItemButton>
                </Link>
              </List>
            </List>
          </Collapse>
            <List component="div" disablePadding onClick={handleClick3}>
              <Link >
                <ListItemButton sx={{ pl: 1 }}>
                  <ListItemIcon sx={{ pl: 3 }}>
                    <Dot />
                  </ListItemIcon>
                  <ListItemText primary="آزمون ها" />
                  {openList3 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </Link>
            </List>
            <Collapse in={openList3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <List component="div" disablePadding onClick={handleClick2}>
                <Link to="/new-quiz">
                  <ListItemButton sx={{ pl: 1 }}>
                    <ListItemIcon sx={{ pl: 3 }}>
                      <Dot />
                    </ListItemIcon>
                    <ListItemText primary="آزمون های جدید" />
                  </ListItemButton>
                </Link>
              </List>
              <List component="div" disablePadding>
                <Link to="/old-quiz">
                  <ListItemButton sx={{ pl: 1 }}>
                    <ListItemIcon sx={{ pl: 3 }}>
                      <Dot />
                    </ListItemIcon>
                    <ListItemText primary="آزمون های قدیمی" />
                  </ListItemButton>
                </Link>
              </List>
            </List>
          </Collapse>
          <List component="div" disablePadding onClick={handleClick4}>
          <Link >
            <ListItemButton sx={{ pl: 1 }}>
              <ListItemIcon sx={{ pl: 3 }}>
                <Dot />
              </ListItemIcon>
              <ListItemText primary="نظر سنجی" />
              {openList4 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </Link>
        </List>
        <Collapse in={openList4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <List component="div" disablePadding onClick={handleClick2}>
            <Link to="/new-survey">
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon sx={{ pl: 3 }}>
                  <Dot />
                </ListItemIcon>
                <ListItemText primary="نظر سنجی جدید" />
              </ListItemButton>
            </Link>
          </List>
          <List component="div" disablePadding>
            <Link to="/old-survey">
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon sx={{ pl: 3 }}>
                  <Dot />
                </ListItemIcon>
                <ListItemText primary="نظر سنجی قدیمی" />
              </ListItemButton>
            </Link>
          </List>
        </List>
      </Collapse>
            <List component="div" disablePadding>
              <Link to="/drug-store">
                <ListItemButton sx={{ pl: 1 }}>
                  <ListItemIcon sx={{ pl: 3 }}>
                    <Dot />
                  </ListItemIcon>
                  <ListItemText primary="داروخانه" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link to="/game">
                <ListItemButton sx={{ pl: 1 }}>
                  <ListItemIcon sx={{ pl: 3 }}>
                    <Dot />
                  </ListItemIcon>
                  <ListItemText primary="بازی" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
            <Link to="/Information">
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon sx={{ pl: 3 }}>
                  <Dot />
                </ListItemIcon>
                <ListItemText primary="دانستنی ها" />
              </ListItemButton>
            </Link>
          </List>
          <List component="div" disablePadding>
          <Link to="/support">
            <ListItemButton sx={{ pl: 1 }}>
              <ListItemIcon sx={{ pl: 3 }}>
                <Dot />
              </ListItemIcon>
              <ListItemText primary="پشتیبانی" />
            </ListItemButton>
          </Link>
        </List>
       {
        /*
         <List component="div" disablePadding>
        <Link to="/consultant">
          <ListItemButton sx={{ pl: 1 }}>
            <ListItemIcon sx={{ pl: 3 }}>
              <Dot />
            </ListItemIcon>
            <ListItemText primary="مشاور آنلاین" />
          </ListItemButton>
        </Link>
      </List>
        */
       }
          </List>
        </Collapse>

      

        <ListItem
          key="4"
          disablePadding
          sx={{
            display: "block",
            "&:hover": {
              background: "#0d99ff",
            },
          }}
        >
          <Link to="/contact-us">
            <ListItemButton
              sx={{
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
                <Box component="img" src={call} />
              </ListItemIcon>
              <ListItemText
                primary="تماس با ما"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem
          key={6}
          disablePadding
          sx={{
            display: "block",
            "&:hover": {
              background: "#0d99ff",
            },
          }}
        >
          <Link to="/about-us">
            <ListItemButton
              sx={{
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
                <Box component="img" src={info} />
              </ListItemIcon>
              <ListItemText
                primary="درباره ما"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem
          key="66"
          disablePadding
          sx={{
            display: "block",
            "&:hover": {
              background: "#0d99ff",
            },
          }}
        >
          <Link to="/setting">
            <ListItemButton
              sx={{
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
                <Box component="img" src={setting} />
              </ListItemIcon>
              <ListItemText primary="تنظیمات" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </>
  );
}
export default SidebarLinks;
