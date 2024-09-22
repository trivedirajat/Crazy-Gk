import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Breadcrumbs,
  Link,
  Avatar,
  Box,
} from "@mui/material";
import {
  IconHome,
  IconTag,
  IconShoppingCart,
  IconSun,
} from "@tabler/icons-react";

const Dashboard = () => {
  return (
    <Box sx={{ padding: "24px" }}>
      <Container>
        {/* Page Header */}
        <Box sx={{ marginBottom: "24px" }}>
          <Typography variant="h3" gutterBottom>
            Dashboard
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" color="inherit">
              <IconHome className="theme-fa-icon" size={18} />
            </Link>
            <Typography color="textPrimary">Dashboard</Typography>
          </Breadcrumbs>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item>
                    <IconTag size={40} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="div" fontWeight="bold">
                      Categories
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      50
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item>
                    <IconShoppingCart size={40} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="div" fontWeight="bold">
                      Study Material
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      20
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item>
                    <IconSun size={40} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="div" fontWeight="bold">
                      Current Affairs
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      10
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* User and Master Sections */}
        <Grid container spacing={3} sx={{ marginTop: "24px" }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  fontWeight="bold"
                  gutterBottom
                >
                  Role
                </Typography>
                <Grid container spacing={2}>
                  {[1, 2, 3, 4].map((_, index) => (
                    <Grid item xs={12} key={index}>
                      <Grid container alignItems="center">
                        <Avatar
                          alt={`User ${index + 1}`}
                          src="../../assets/gktricks/gktricks.jpg"
                          sx={{ marginRight: "16px" }}
                        />
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            User {index + 1}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Visual Designer, Github Inc
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  fontWeight="bold"
                  gutterBottom
                >
                  Master
                </Typography>
                <Grid container spacing={2}>
                  {["09:00", "10:50", "01:00", "05:00", "12:00", "08:20"].map(
                    (time, index) => (
                      <Grid item xs={12} key={index}>
                        <Grid container alignItems="center">
                          <Typography variant="h6" sx={{ marginRight: "16px" }}>
                            {time}
                          </Typography>
                          <Box>
                            <Typography variant="body1">
                              Lorem ipsum dolor sit amet, consectetur.
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              By User {index + 1}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    )
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
