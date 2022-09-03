import { Grid, Tooltip, IconButton, useTheme } from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import routes from "src/constants/routes";
import { Actions as BufferActions } from "src/store/States/Buffer"
import { InvestmentPermitStatus } from "src/store/States/Investment/InvestmentPermit/types"
import ViewTwoToneIcon from '@mui/icons-material/RemoveRedEyeSharp';

export const SeeInvestmentPermitPayload: FC<{
  investmentPermit: any;
}> = ({
  investmentPermit
}) => {
    const theme = useTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid md={5} item>
          <Tooltip title="View Permit" arrow>
            <IconButton
              sx={{
                '&:hover': {
                  background: theme.colors.primary.lighter
                },
                color: theme.palette.primary.main
              }}
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(BufferActions.SetNewPermitBuffer(investmentPermit))
                navigate(routes.INVESTMENT.VIEW_INVESTMENT_PERMIT.ROUTE + `/${investmentPermit._id}`, { replace: true })
              }}
            >
              <ViewTwoToneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    )
  }