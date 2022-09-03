import { Grid, Select, MenuItem, TextField } from "@mui/material";
import "./style.css";

interface Props {
  dropItems: Array<{
    dropValue: string;
    dropItem: string;
  }>;
  gridStyle: object;
  data?: any;
  defaultValue?: any;
  required?: boolean;
  label?: string;
}

const DropWithInput = ({
  dropItems,
  gridStyle,
  data,
  defaultValue,
  required = false,
  label,
}: Props) => {
  return (
    <Grid
      display="flex"
      direction="row"
      style={{ ...gridStyle }}
      className="dropInputWrapper"
    >
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

      <TextField
        className="default-input drop-input"
        variant="outlined"
        style={{ flex: 1 }}
        {...data}
        defaultValue={defaultValue}
        required={required}
        label={label}
      />
    </Grid>
  );
};

export default DropWithInput;
