import React from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Collapse } from '@mui/material';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { BarChart } from '@mui/x-charts/BarChart';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));

export default function VistaResultados({ content, date, predictions }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <Card sx={{ width:680, maxWidth: 680, boxShadow: 0, borderRadius: 3 }}>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">R</Avatar>}
                title="Anonymous"
                subheader={date}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <BarChart
                  xAxis={[
                    {
                      id: 'barCategories',
                      data: ['Low Risk', 'Medium Risk', 'High Risk', 'No Enough Information'],
                      scaleType: 'band',
                    },
                  ]}
                  series={[
                    {
                      data: predictions,
                    },
                  ]}
                  width={500}
                  height={300}
                />
                <CardContent sx={{ marginBottom: 2 }}>
                    <Typography>
                        Recomendaciones:
                    </Typography>
                </CardContent>
            </Collapse>
        
        </Card>
    );
}