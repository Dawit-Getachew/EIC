/* eslint-disable */
import { ReactNode } from "react";

import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";
import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone";
import MmsTwoToneIcon from "@mui/icons-material/MmsTwoTone";
import CloseIcon from "@mui/icons-material/CloseRounded";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import StickyNote2 from "@mui/icons-material/StickyNote2";
import BallotTwoToneIcon from "@mui/icons-material/BallotTwoTone";
import BeachAccessTwoToneIcon from "@mui/icons-material/BeachAccessTwoTone";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import FilterVintageTwoToneIcon from "@mui/icons-material/FilterVintageTwoTone";
import HowToVoteTwoToneIcon from "@mui/icons-material/HowToVoteTwoTone";
import LocalPharmacyTwoToneIcon from "@mui/icons-material/LocalPharmacyTwoTone";
import RedeemTwoToneIcon from "@mui/icons-material/RedeemTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import TrafficTwoToneIcon from "@mui/icons-material/TrafficTwoTone";
import RestorePage from "@mui/icons-material/RestorePage";
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import ArchiveOutlined from "@mui/icons-material/ArchiveOutlined";
import AllOutIcon from "@mui/icons-material/AllOut";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
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
    heading: "Work Permits",
    items: [
      // {
      //   name: "Business Profiles",
      //   icon: AccountCircleTwoToneIcon,
      //   link: routes.INVESTMENT.BUSINESS_PROFILE.ROUTE,
      // },
      // {
      //   name: "Work Permit",
      //   icon: StickyNote2,
      //   link: routes.INVESTMENT.WORK_PERMIT.ROUTE,
      // },
      {
        name: "Work Permits",
        icon: StickyNote2,
        link: routes.WORK_PERMIT.WORK_PERMIT.ROUTE,
      },
      // {
      //   name: "Renew Work Permit",
      //   icon: RestorePage,
      //   link: routes.INVESTMENT.RENEW_WORK_PERMIT.ROUTE,
      // },
      {
        name: "Renew Work Permit",
        icon: RestorePage,
        link: routes.WORK_PERMIT.WORK_PERMIT_RENEWAL.ROUTE,
      },
      {
        name: "Replace Work Permit",
        icon: RedeemTwoToneIcon,
        link: routes.WORK_PERMIT.WORK_PERMIT_REPLACEMENT.ROUTE,
      },
      {
        name: "Cancellation",
        icon: CloseIcon,
        link: routes.WORK_PERMIT.WORK_PERMIT_CANCELLATION.ROUTE,
      },
    ],
  },
  {
    heading: "Resources",
    items: [
      {
        name: "Assign Work Permits",
        icon: BallotTwoToneIcon,
        link: routes.DIRECTOR_PAGES.ASSIGN_WORK_PERMIT.ROUTE,
      },
      {
        name: "Manage Accounts",
        icon: SupervisedUserCircleIcon,
        link: routes.WORK_PERMIT.MANAGE_ACCOUNTS.ROUTE,
      },
    ],
  },
  {
    heading: "Reports",
    items: [
      {
        name: "Specific Reports",
        icon: TrafficTwoToneIcon,
        link: routes.REPORTS.SPECIFIC_REPORTS.ROUTE,
      },
      {
        name: "General Reports",
        icon: FilterVintageTwoToneIcon,
        link: routes.REPORTS.GENERAL_REPORTS.ROUTE,
      },
    ],
  },
  //   heading: "Dashboards",
  //   items: [
  //     {
  //       name: "Crypto",
  //       link: "/dashboards/crypto",
  //       icon: BrightnessLowTwoToneIcon,
  //     },
  //     {
  //       name: "Messenger",
  //       icon: MmsTwoToneIcon,
  //       link: "/dashboards/messenger",
  //     },
  //   ],
  // },
  // {
  //   heading: "Management",
  //   items: [
  //     {
  //       name: "Transactions",
  //       icon: TableChartTwoToneIcon,
  //       link: "/management/transactions",
  //     },
  //     {
  //       name: "User Profile",
  //       icon: AccountCircleTwoToneIcon,
  //       link: "/management/profile",
  //       items: [
  //         {
  //           name: "Profile Details",
  //           link: "/management/profile/details",
  //         },
  //         {
  //           name: "User Settings",
  //           link: "/management/profile/settings",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   heading: "Components",
  //   items: [
  //     {
  //       name: "Buttons",
  //       icon: BallotTwoToneIcon,
  //       link: "/components/buttons",
  //     },
  //     {
  //       name: "Modals",
  //       icon: BeachAccessTwoToneIcon,
  //       link: "/components/modals",
  //     },
  //     {
  //       name: "Accordions",
  //       icon: EmojiEventsTwoToneIcon,
  //       link: "/components/accordions",
  //     },
  //     {
  //       name: "Tabs",
  //       icon: FilterVintageTwoToneIcon,
  //       link: "/components/tabs",
  //     },
  //     {
  //       name: "Badges",
  //       icon: HowToVoteTwoToneIcon,
  //       link: "/components/badges",
  //     },
  //     {
  //       name: "Tooltips",
  //       icon: LocalPharmacyTwoToneIcon,
  //       link: "/components/tooltips",
  //     },
  //     {
  //       name: "Avatars",
  //       icon: RedeemTwoToneIcon,
  //       link: "/components/avatars",
  //     },
  //     {
  //       name: "Cards",
  //       icon: SettingsTwoToneIcon,
  //       link: "/components/cards",
  //     },
  //     {
  //       name: "Forms",
  //       icon: TrafficTwoToneIcon,
  //       link: "/components/forms",
  //     },
  //   ],
  // },
  // {
  //   heading: "Extra Pages",
  //   items: [
  //     {
  //       name: "Status",
  //       icon: VerifiedUserTwoToneIcon,
  //       link: "/status",
  //       items: [
  //         {
  //           name: "Error 404",
  //           link: "/status/404",
  //         },
  //         {
  //           name: "Error 500",
  //           link: "/status/500",
  //         },
  //         {
  //           name: "Maintenance",
  //           link: "/status/maintenance",
  //         },
  //         {
  //           name: "Coming Soon",
  //           link: "/status/coming-soon",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default menuItems;
