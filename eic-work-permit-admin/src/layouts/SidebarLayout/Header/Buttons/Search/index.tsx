/* eslint-disable */
import { forwardRef, Ref, useState, ReactElement, ChangeEvent } from "react";
import {
  Avatar,
  Link,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Theme,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { Selectors as InvestmentPermitSelectors } from "src/store/States/Investment/InvestmentPermit"
import { Actions as BufferActions } from "src/store/States/Buffer"
import routes from "src/constants/routes"
import { useNavigate } from "react-router";
import React, { useEffect } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`
);

enum SearchTypes {
  "COMPANY_NAME" = "Company Name",
  "REFERECE_NUMBER" = "Reference Number",
  "MANAGER_NAME" = "Manager Name",
}

function HeaderSearch() {
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState<string>(SearchTypes.COMPANY_NAME)
  const [foundValues, setFoundValues] = useState([]);
  const rootState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
    if (event.target.value) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
    } else {
      setOpenSearchResults(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  interface ISearchSuggestion {
    title: string;
    link: string;
    description: string;
    data: any;
  }

  const SearchSuggestion: React.FC<ISearchSuggestion> = ({
    title,
    link,
    description,
    data
  }) => {
    return (
      <ListItem button onClick={() => {
        dispatch(BufferActions.SetNewPermitBuffer(data))
        navigate(routes.WORK_PERMIT.VIEW_INVESTMENT_PERMIT.ROUTE + `/${data._id}`, { replace: true })
        setOpen(false)
      }}>
        <Hidden smDown>
          <ListItemAvatar>
            <Avatar
              sx={{
                background: (theme: Theme) => theme.palette.secondary.main,
              }}
            >
              <FindInPageTwoToneIcon />
            </Avatar>
          </ListItemAvatar>
        </Hidden>
        <Box flex="1">
          <Box display="flex" justifyContent="space-between">
            <Link
              href={link}
              underline="hover"
              sx={{ fontWeight: "bold" }}
              variant="body2"
            >
              {title}
            </Link>
          </Box>
          <Typography
            component="span"
            variant="body2"
            sx={{
              color: (theme: Theme) =>
                lighten(theme.palette.secondary.main, 0.5),
            }}
          >
            {description}
          </Typography>
        </Box>
        <ChevronRightTwoToneIcon />
      </ListItem>
    );
  };
  const investment_permits = useSelector(InvestmentPermitSelectors.selectInvestmentPermits)

  const filterValues = () => {
    if (searchValue.length === 0) return []
    switch(searchType) {
      case SearchTypes.COMPANY_NAME: {
        return investment_permits.filter(permit => {
          const exp = new RegExp(`^${searchValue}`, 'gi')
          return String(permit.company_name).match(exp)
        })
      }

      case SearchTypes.MANAGER_NAME: {
        return investment_permits.filter(permit => {
          const exp = new RegExp(`^${searchValue}`, 'gi')
          return String(permit.manager_full_name).match(exp)
        })
      }

      case SearchTypes.REFERECE_NUMBER: {
        return investment_permits.filter(permit => {
          const exp = new RegExp(`${searchValue}`, 'gi')
          return String(permit.ref_number).match(exp)
        })
      }

      default: {
        return []
      }
    }
  }

  return (
    <>
      <Tooltip arrow title="Search">
        <IconButton color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon />
        </IconButton>
      </Tooltip>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <Grid
            display="flex"
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Grid md={8}>
              <SearchInputWrapper
                value={searchValue}
                autoFocus={true}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search terms here..."
                fullWidth
                label="Search"
              />
            </Grid>

            <Grid md={3}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Search Type"
                style={{ width: "100%", height: "100%" }}
                onChange={({ target: { value } }) => setSearchType(String(value))}
                value={searchType}
              >
                {Object.values(SearchTypes).map(item => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </DialogTitleWrapper>
        <Divider />

        {openSearchResults && (
          <DialogContent>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="body2" component="span">
                Search results for{" "}
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="body1"
                  component="span"
                >
                  {searchValue}
                </Typography>
              </Typography>
              <Link href="#" variant="body2" underline="hover">
                Advanced search
              </Link>
            </Box>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              <Divider sx={{ my: 1 }} component="li" />
              {filterValues().map((item) => (
                <SearchSuggestion
                  title={item.company_name}
                  link={"#"}
                  description={item.investment_activity}
                  key={item}
                  data={item}
                />
              ))}
            </List>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box sx={{ textAlign: "center" }}>
              <Button color="primary">View all search results</Button>
            </Box>
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
