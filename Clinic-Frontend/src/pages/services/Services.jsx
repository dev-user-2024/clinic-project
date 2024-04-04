import React from "react";
import axios from "axios";
import { serverApi } from "../../confing/confing.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { errorHandeling, refreshToken } from "../../services/index.js";

const Services = () => {
  const [list, setList] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${serverApi}CEOServices` ,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        setList(data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        let status = err?.response?.status;
        if (status === 401) {
          let status = await refreshToken();
          if (status) {
           await fetchData();
          }
        } else {
          errorHandeling(err);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <div className="row mt-4">
        <div className="m-auto text-center mt-4">
          <PulseLoader
            color="#2c7f75"
            loading={loading}
            // cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <h6 style={{ color: "#828282" }}>لیست درخواست ها</h6>
        {list.map((i, index) => (
          <div key={index} className="col-12 mb-3 item-box px-3">
            <strong>{i.full_name}</strong>
            <span>{i.company_name}</span>
            <span>{i.phone_number}</span>
            <span>{i.address}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
