import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  return (
    <MUIBreadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {items.map((item, index) =>
        item.link ? (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={item.link}
          >
            {item.label}
          </Link>
        ) : (
          <Typography key={index} color="text.primary">
            {item.label}
          </Typography>
        )
      )}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
