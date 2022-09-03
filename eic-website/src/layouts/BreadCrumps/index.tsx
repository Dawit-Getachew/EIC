import { FC, useState, useEffect } from "react";
import SeparatorIcon from "src/assets/dropdown.svg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { selectBreadCrumps } from "src/store/States/Buffer/";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import "./styles.css";

interface Props {}

const CustomBreadcrumbs: FC<Props> = () => {
  const location = useLocation();
  const breadCrumps = useSelector(selectBreadCrumps);

  const [updatedBreadCrups, setUpdatedBreadCrumps] = useState([])

  useEffect(() => {
    if (breadCrumps.length > 0) {
      setUpdatedBreadCrumps(breadCrumps)
    }
  }, [breadCrumps])

  return (
    <div
      role="presentation"
      onClick={() => null}
      className="breadCrumpsContainer"
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<img src={SeparatorIcon} />}
      >
        {updatedBreadCrups.map((item, key) => (
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            href={item.path === location.pathname ? "#" : item.path}
            key={key}
            style={
              item.path === location.pathname
                ? { color: "#000000", fontFamily: "Poppins" }
                : { color: "#444343", fontFamily: "Poppins" }
            }
          >
            {item.title}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default CustomBreadcrumbs;
