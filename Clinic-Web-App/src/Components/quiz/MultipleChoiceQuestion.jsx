import React from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
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
const MultipleChoiceQuestion = ({ item, index, setAnswer, answer }) => {
  const [quesAnswer,setQuesAnswer] =useState()
  useEffect(()=>{
    if(answer){
      let x = answer[answer.length-1]
      setQuesAnswer(x.id)
      setAnswer(x.id)
    }
  },[])
  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: "2rem",
        textAlign: "left",
      }}
    >
    { (quesAnswer)&& 
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
    }
    { (!quesAnswer) && 
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
    }
    </FormControl>
  );
};

export default MultipleChoiceQuestion;
