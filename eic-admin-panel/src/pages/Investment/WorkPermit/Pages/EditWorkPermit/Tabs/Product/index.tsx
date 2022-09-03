import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  TextField,
  Grid,
  MenuItem,
  Box,
  Container,
  CircularProgress,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material/";
import AddProduct from "./AddProduct";

interface Props {
  goPrev: () => void;
  goNext: (data: any) => void;
  mainData: any;
}

const ProjectProduct: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [error_text, setErrorText] = useState("");
  const onSubmit = () => {
    if (addedProducts.length > 0) {
      setErrorText("");
      props.goNext({ addedProducts });
    } else {
      setErrorText("At least one product needed");
    }
  };

  useEffect(() => {
    if (props.mainData.addedProducts) {
      if (props.mainData.addedProducts.length > 0) {
        setAddedProducts(props.mainData.addedProducts);
      }
    }
  }, [props.mainData]);

  return (
    <>
      <AddProduct
        isVisible={isVisible}
        onClose={(data) => {
          if (data) setAddedProducts(addedProducts.concat(data));
          setIsVisible(false);
        }}
      />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item md={6} style={{ display: "flex", justifyContent: "start" }}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ mb: 3, mt: 2, pl: 2 }}
          >
            Add New Product Or Services
          </Typography>
        </Grid>
        <Grid item md={6} style={{ display: "flex", justifyContent: "end" }}>
          <Button
            sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
            variant="contained"
            color="primary"
            onClick={() => setIsVisible(true)}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>

      <p style={{ color: "red", fontSize: 16 }}>{error_text}</p>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Type</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Domestic Market Share</TableCell>
              <TableCell>Export Market Share</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addedProducts.map((item) => (
              <TableRow hover>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {item.product_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {item.is_service}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {item.unit}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {item.quantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {item.domestic_market_share}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {item.export_market_share}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid
        container
        spacing={3}
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
            variant="contained"
            color="secondary"
            type="button"
            onClick={props.goPrev}
          >
            Previous
          </Button>
        </Grid>
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
            variant="contained"
            color="primary"
            type="button"
            onClick={onSubmit}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectProduct;
