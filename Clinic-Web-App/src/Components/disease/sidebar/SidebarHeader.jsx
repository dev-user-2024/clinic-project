import { Avatar } from "@mui/material";
import farahoshAvatar from "../../../assests/image/svg/Group.png"
import logo from "../../../assests/logo/logo.png"
const SidebarHeader = ()=>{
    return(
        <>
            <Avatar 
                src={logo}
                variant="rounded"
                sx={{
                    width:150,
                    height:100,
                    mt:2,
                    marginLeft:3
                }}
            />
        </>
    )
}
export default SidebarHeader;
