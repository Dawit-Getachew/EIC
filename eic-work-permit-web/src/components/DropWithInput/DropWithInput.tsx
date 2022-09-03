import { Grid, Select, MenuItem, TextField } from "@mui/material";
import "./style.css";

const DropWithInput = ({ dropItems, gridStyle }) => {
  return (
    <Grid display="flex" direction="row" style={{ ...gridStyle }}>
      <Select
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        defaultValue={dropItems[0].dropValue}
      >
        {dropItems.map((item, index) => (
          <MenuItem key={index} value={item.dropValue}>
            {item.dropItem}
          </MenuItem>
        ))}
      </Select>

      <TextField className="default-input drop-input" variant="outlined" />
    </Grid>
  );
};

export default DropWithInput;
