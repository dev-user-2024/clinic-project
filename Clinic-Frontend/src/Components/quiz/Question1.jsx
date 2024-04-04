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

const Question1 = ({ item, index , answer }) => {
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
  return (
    <div className="mt-3 " >
      <FormControl
      fullWidth
      sx={{
        marginTop: "2rem",
        textAlign: "left",
      }}
      disabled
    >
    { 
     answer && <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
      defaultValue={answer[0].id}
    >
      <Grid container  textAlign='right'>
        <Grid item xs={12} mb={2}>
          <Typography>
            {index + 1}-{item.content}
          </Typography>
        </Grid>
        {item.choices.map((i, index) => (
          <Grid item xs={6} key={index}>
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
    { 
        !answer && <RadioGroup
         aria-labelledby="demo-radio-buttons-group-label"
         name="radio-buttons-group"
       >
         <Grid container  textAlign='right'>
           <Grid item xs={12} mb={2}>
             <Typography>
               {index + 1}-{item.content}
             </Typography>
           </Grid>
           {item.choices.map((i, index) => (
             <Grid item xs={6} key={index}>
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
    </div>
  );
};

export default Question1;
