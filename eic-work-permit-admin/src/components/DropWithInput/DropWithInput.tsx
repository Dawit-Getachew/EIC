import { FC, CSSProperties, ChangeEventHandler } from "react"
import { Grid, Select, MenuItem, TextField } from "@mui/material";
import "./style.css";

const _DropWithInput = ({ dropItems, gridStyle }) => {
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


const DropWithInput: FC<{
  dropItems?: any[];
  gridStyle?: CSSProperties;
  defaultPhoneNumberValue?: string;
  defaultPhoneTypeValue?: string;
  handlePhoneNumberChange?: ChangeEventHandler<HTMLInputElement>;
  registerPhone?: () => any;
  registerPhoneType?: () => any;
  data?: any;
}> = ({
  dropItems, gridStyle, defaultPhoneTypeValue, defaultPhoneNumberValue, handlePhoneNumberChange,
  ...props
}) => {
    const options = dropItems ? dropItems : [
      { dropItem: "Mobile", dropValue: "Mobile" },
      { dropItem: "Fixed Line", dropValue: "Fixed Line" },
    ]
    const defaultPhone = defaultPhoneNumberValue ? defaultPhoneNumberValue : ''
    const defaultType = defaultPhoneTypeValue ?
      defaultPhoneTypeValue : options[0] ?
        options[0].dropValue ? options[0].dropValue : ''
        : ''
    return (
      <Grid display="flex" direction="row" style={gridStyle ? gridStyle : {}}>
        <Select
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          name="phone_number_type"
          defaultValue={defaultType}
          {...(() => {
            return props.registerPhoneType ? props.registerPhoneType() : {}
          })()}
        >
          {options.map((item, index) => (
            <MenuItem key={index} value={item.dropValue}>
              {item.dropItem}
            </MenuItem>
          ))}
        </Select>

        <TextField
          name="phone_number"
          defaultValue={defaultPhone}
          className="default-input drop-input"
          variant="outlined"
          onChange={handlePhoneNumberChange}
          {...(() => {
            return handlePhoneNumberChange ? handlePhoneNumberChange : () => null
          })()}
          {...(() => {
            return props.registerPhone ? props.registerPhone() : {}
          })()}
        />
      </Grid>
    );
  };

export default DropWithInput;

/**
 * 
 * RJ45
 * Switch
 * Modem
 * 
 * 2 Pricings for both systems (the one already implemented and the new one to be built (trello))
 * 
 */