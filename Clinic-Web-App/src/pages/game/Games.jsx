import React from "react";
import { Box, Typography,CircularProgress, Pagination, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import {toast} from "react-toastify";
import { Link } from "react-router-dom";
const Games = () => {
  const [list,setList] = useState([])
  const [pageTotal,setPageTotl] = useState(0)
  const [pageNumber,setPageNumber] = useState(1)
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${serverApi}entertainment?page=${pageNumber}`);
        const page = Math.ceil(data.total/data.per_page)
        setPageTotl(page)
        setList(data.data)
        setLoading(false)
      } catch (err) {
        console.log(err);
        setLoading(false)
        toast.error("خطایی رخ داده است مجدد تلاش کنید")
      }
    };
    fetchData();
  }, [pageNumber]);
    return (
        <Box>
        {
          loading && <Box mt={3} sx={{ display: 'flex', justifyContent:"center" }}>
          <CircularProgress />
        </Box>
        }
        <Grid container mt={3} spacing={3}>
          {list.map((i, index) => (
            <Grid item xs={6} sm={4} lg={3} key={index}>
              <Link to={`${i.id}`}>
                <Box
                  sx={{
                    boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)",
                    backgroundColor: "#fff",
                    borderRadius: "25px",
                  }}
                  className="card-hover3"
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "80px",
                      backgroundColor: "#238BEB",
                      borderTopLeftRadius: "25px",
                      borderTopRightRadius: "25px",
                      overflow: "hidden",
                    }}
                    className="card-hover3"
                  >
                    <img
                      width="100%"
                      height="100%"
                      style={{
                        borderTopLeftRadius: "25px",
                        borderTopRightRadius: "25px",
                      }}
                      alt=""
                      src={i.image}
                    />
                  </Box>
                  <Box py={3}>
                    <Typography>{i.title}</Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Box mt={2} display='flex' justifyContent='center'>
       {
        pageTotal > 1 &&       
        <Pagination count={pageTotal} onChange={(e,value)=>{setPageNumber(value)}} />

       }
      </Box>
      </Box>
    );
};

export default Games;