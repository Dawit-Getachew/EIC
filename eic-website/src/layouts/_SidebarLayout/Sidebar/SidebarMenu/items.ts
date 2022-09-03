import { ReactNode } from "react";

import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import StickyNote2 from "@mui/icons-material/StickyNote2";
import BallotTwoToneIcon from "@mui/icons-material/BallotTwoTone";
import RestorePage from "@mui/icons-material/RestorePage";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import routes from "src/constants/routes";

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: "",
    items: [
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: DesignServicesTwoToneIcon,
      },
    ],
  },
  {
    heading: "Investments",
    items: [
      {
        name: "Business Profiles",
        icon: AccountCircleTwoToneIcon,
        link: routes.INVESTMENT.BUSINESS_PROFILE.ROUTE,
      },
      {
        name: "Work Permit",
        icon: StickyNote2,
        link: routes.INVESTMENT.WORK_PERMIT.ROUTE,
      },
      {
        name: "Renew Work Permit",
        icon: RestorePage,
        link: routes.INVESTMENT.RENEW_WORK_PERMIT.ROUTE,
      },
      {
        name: "Managers",
        icon: BallotTwoToneIcon,
        link: routes.INVESTMENT.MANAGER.ROUTE,
      },
      {
        name: "Project Category",
        icon: PlaylistAdd,
        link: routes.INVESTMENT.PROJECT_CATEGORY.ROUTE,
      },
    ],
  },
];

export default menuItems;
