import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavElement({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  return (
    <Link
      to={path}
      style={{
        textDecoration: "none",
      }}
    >
      <Box>
        <Typography color="black">{title}</Typography>
      </Box>
    </Link>
  );
}
