import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TransactionCard from "./TransactionCard";


function Transactions() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
                <Grid item xs={4}>
                    <TransactionCard />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Transactions;
