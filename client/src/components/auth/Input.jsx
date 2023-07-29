import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility.js';
import VisibilityOff from '@mui/icons-material/VisibilityOff.js';

const Input = ({
  name,
  half,
  label,
  handleChange,
  handleShowPassword,
  autoFocus,
  type,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "Password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
