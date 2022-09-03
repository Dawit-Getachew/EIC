import React, { useState, FC } from "react"
import {
  Card, Tab, Tabs
} from "@mui/material"
import UnAssignedWorkPermits from './UnAssignedWorkPermits'
import AssignedWorkPermits from './AssignedWorkPermits'

const AssignWork = () => {
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const TabPanel: FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <>
            {children}
          </>
        )}
      </div>
    );
  }

  return (
    <Card sx={{ pl: 2, pb: 2, pt: 2 }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="UnAssigned Work Permits" {...a11yProps(0)} />
        <Tab label="Assigned Work Permits" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UnAssignedWorkPermits />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AssignedWorkPermits />
      </TabPanel>
    </Card>
  )
}

export default AssignWork