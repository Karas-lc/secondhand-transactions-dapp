import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Container, Dialog, DialogActions, DialogTitle} from "@mui/material";


function DetailPage() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url()',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <h1>Picture</h1>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" sx={{ mt: 1 }}>
                            <h1>Name</h1>
                            <h2>Price</h2>
                            <p>Description</p>
                            <Button variant="contained" color="success" onClick={handleClickOpen}>
                                Buy
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle id="alert-dialog-title">
                    {"Ture to buy it?"}
                </DialogTitle>
                <DialogActions>
                    <Button href="/">Yes, I'm ture</Button>
                    <Button>No, I'm not</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
export default DetailPage;