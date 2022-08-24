import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

function TransactionCard() {
    return(
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href="/details">
                    <CardMedia
                        component="img"
                        height="140"
                        image="/client/src/components/Transaction/image1.jpg"
                        alt="Example Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            Title
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Price
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default TransactionCard;