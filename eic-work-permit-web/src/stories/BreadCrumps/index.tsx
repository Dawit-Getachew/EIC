import { FC } from "react"
import SeparatorIcon from "../assets/dropdown.svg"
import VerticalImage from "../assets/vertical.png"
import { NotificationsActive, SearchSharp, KeyboardArrowDownSharp } from "@mui/icons-material"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import './styles.css'

interface Props {
  activeLink: string
}

const CustomBreadcrumbs: FC<Props> = ({ activeLink }) => {
  return (
    <div role="presentation" onClick={() => null} className="breadCrumpsContainer">
      <Breadcrumbs aria-label="breadcrumb" separator={<img src={SeparatorIcon} />}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          href="/"
          style={"/home" === activeLink ? { color: "#000000", fontFamily: "Poppins" } : { color: "#444343", fontFamily: "Poppins" }}
        >
          Home
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          href="/project-implementation"
          style={"/project-implementation" === activeLink ? { color: "#000000", fontFamily: "Poppins" } : { color: "#444343", fontFamily: "Poppins" }}
        >
          Project Implementation
        </Link>
      </Breadcrumbs>
    </div>
  )
}

export default CustomBreadcrumbs