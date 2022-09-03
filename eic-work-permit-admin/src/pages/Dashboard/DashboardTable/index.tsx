import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
} from "@mui/material/";

const DashboardTable = () => {
  return (
    <>
      <Grid mr={2}>
        <Card>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>PROPERTY</TableCell>
                    <TableCell>CASH</TableCell>
                    <TableCell>Mine</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Pewds</TableCell>
                    <TableCell>Awesome</TableCell>
                    <TableCell>Hello</TableCell>
                    <TableCell>One</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Pewds</TableCell>
                    <TableCell>Awesome</TableCell>
                    <TableCell>Hello</TableCell>
                    <TableCell>One</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Pewds</TableCell>
                    <TableCell>Awesome</TableCell>
                    <TableCell>Hello</TableCell>
                    <TableCell>One</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Pewds</TableCell>
                    <TableCell>Awesome</TableCell>
                    <TableCell>Hello</TableCell>
                    <TableCell>One</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Pewds</TableCell>
                    <TableCell>Awesome</TableCell>
                    <TableCell>Hello</TableCell>
                    <TableCell>One</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Pewds</TableCell>
                    <TableCell>Awesome</TableCell>
                    <TableCell>Hello</TableCell>
                    <TableCell>One</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default DashboardTable;
