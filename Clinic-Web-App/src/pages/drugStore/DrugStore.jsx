import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Pagination,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing";
import { toast } from "react-toastify";
import Zoom from "react-reveal/Zoom";
import { Search } from "@mui/icons-material";
import { errorHandeling, refreshToken } from "../../services";
const DrugStore = () => {
  const [list, setList] = useState([]);
  const [pageTotal, setPageTotl] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${serverApi}drug?page=${pageNumber}`);
        const page = Math.ceil(data.total / data.per_page);
        setPageTotl(page);
        setList(data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error("خطایی رخ داده است مجدد تلاش کنید");
      }
    };
    fetchData();
  }, [pageNumber]);

  const searchDrug = async () => {
    try {
      if (search) {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${serverApi}drug/searchName/${search}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(data);
        if (data.length > 0) {
          setList(data);
        } else {
          toast.error(
            "نتیجه ای یافت نشد، لطفا نام دارو رو به طور کامل وارد کنید"
          );
        }
        const page = Math.ceil(data.total / data.per_page);
        setPageTotl(page);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          searchDrug();
        }
      } else {
        errorHandeling(err);
      }
      setLoading(false);
    }
  };
  return (
    <Box mt={3}>
      <Box display="flex">
        <input
          placeholder="نام دارو را جستجو کنید ..."
          className="profile-input-style"
          style={{ width: "90%" }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => {
            searchDrug();
          }}
        >
          <Search />
        </Button>
      </Box>
      {loading && (
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <Box mt={3}>
        <Zoom bottom cascade>
          <div>
            {list.map((i, index) => (
              <div className="card-hover2" key={index}>
                <Box
                  sx={{
                    borderRadius: "15px",
                    boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.09)",
                    backgroundColor: "#fff",
                  }}
                  display="flex"
                  justifyContent="space-between"
                  p={2}
                  mt={2}
                >
                  <Typography color="#238BEB">{i.name}</Typography>
                  <Box>
                    {i.drug_stores.map((d, index2) => (
                      <Typography key={index2} color="#238BEB">
                        {d.name}
                      </Typography>
                    ))}
                  </Box>
                  <Box>
                    {i.drug_stores.map((d, index2) => (
                      <Typography key={index2} color="#238BEB">
                        {d.address}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </div>
            ))}
          </div>
        </Zoom>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        {pageTotal > 1 && (
          <Pagination
            count={pageTotal}
            onChange={(e, value) => {
              setPageNumber(value);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DrugStore;
