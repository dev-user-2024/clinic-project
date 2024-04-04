import React from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { serverApi } from "../../confing/confing";
import axios from "axios";
import { useEffect } from "react";
import { errorHandeling, refreshToken } from "../../services";
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 5,
  width: 24,
  height: 24,
  border: "1px solid #828282",
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#1D9BF0",
  "&:before": {
    display: "block",
    width: 0,
    height: 0,
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      variant="solid"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const Question = ({ item, index, info }) => {
  const [answer, setAnswer] = useState("");
  const [quesAnswer, setQuesAnswer] = useState();

  const sendAnswer = async () => {
    try {
      if (answer) {
        const token = localStorage.getItem("token");
        const { data } = await axios.post(
          `${serverApi}surveyChoice/pickAnAnswer/${answer}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("پاسخ با موفقیت ثبت شد");
      } else {
        toast.error("لطفا یک گزینه انتخاب کنید");
      }
    } catch (err) {
      console.log(err);
      let status = err?.response?.status;
      if (status === 401) {
        let status = await refreshToken();
        if (status) {
          await sendAnswer();
        }
      } else {
        errorHandeling(err);
      }
    }
  };

  useEffect(() => {
    if (info[item.id]) {
      let x = info[item.id];
      // console.log(x[0].id)
      setQuesAnswer(x[0].id);
      setAnswer(x[0].id);
    }
  }, []);

  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: "2rem",
        textAlign: "left",
      }}
    >
      {quesAnswer && (
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          defaultValue={quesAnswer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        >
          <Grid container>
            <Grid item xs={12} mb={2}>
              <Typography>
                {index + 1}-{item.content}
              </Typography>
            </Grid>
            {item.choices.map((i, index) => (
              <Grid item xs={12} key={index}>
                <FormControlLabel
                  value={i.id}
                  control={<BpRadio />}
                  label={i.content}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      )}
      {!quesAnswer && (
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        >
          <Grid container>
            <Grid item xs={12} mb={2}>
              <Typography>
                {index + 1}-{item.content}
              </Typography>
            </Grid>
            {item.choices.map((i, index) => (
              <Grid item xs={12} key={index}>
                <FormControlLabel
                  value={i.id}
                  control={<BpRadio />}
                  label={i.content}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      )}
      <Box
        onClick={() => {
          sendAnswer();
        }}
      >
        <Button variant="contained">ثبت پاسخ</Button>
      </Box>
    </FormControl>
  );
};

export default Question;
