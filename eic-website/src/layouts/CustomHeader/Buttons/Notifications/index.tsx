import {
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
  Card,
} from "@mui/material";
import { useRef, useState } from "react";
import NotificationsActiveTwoToneIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import { styled } from "@mui/material/styles";
import { formatDistance } from "date-fns";
import {
  Selectors as NotificationSector,
  API as NotificationAPI,
  Actions as NotificationAction,
} from "src/store/States/Notification";
import { useSelector, useDispatch } from "react-redux";

const NotificationsBadge = styled(Badge)(
  () => `
    .MuiBadge-badge {
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px 0.3;
            content: "";
        }
    }
`
);

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const readNotification = (item: any) => {
    if (!item.is_read) {
      NotificationAPI.UpdateStatusNotification(item._id, (err, data) => {
        if (err) throw err;
        dispatch(NotificationAction.UpdateNotifications(data));
      });
    }
  };

  const notifications = useSelector(NotificationSector.selectNotifications);
  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={
              notifications.slice(0, 7).filter((item) => !Boolean(item.is_read))
                .length
            }
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {notifications.slice(0, 7).map((item) => (
            <ListItem
              sx={{ p: 2, minWidth: 350, display: { xs: "block", sm: "flex" } }}
              key={item._id}
            >
              <IconButton
                style={{ padding: 0 }}
                onClick={() => readNotification(item)}
              >
                <Card elevation={2} style={{ padding: 10 }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ textTransform: "none" }}
                    >
                      {formatDistance(new Date(item.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </Typography>
                    {Boolean(item.is_read) ? (
                      <></>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#7979f2",
                          width: 10,
                          height: 10,
                          borderRadius: 50,
                        }}
                      ></div>
                    )}
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    style={{
                      width: 465,
                      display: "flex",
                      textAlign: "initial",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Card>
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

export default HeaderNotifications;
