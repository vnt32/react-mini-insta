import React from "react";
import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Link} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import {makeStyles} from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';
import {NavLink} from "react-router-dom";
import moment from 'moment';
import 'moment/locale/ru';
import Carousel from "react-material-ui-carousel";

moment().locale('ru');

const useStyles = makeStyles((theme) => ({
    root:{
      marginBottom: "10px",
    },
    truncate: {
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
        position: 'relative',
        '& > img' : {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            objectFit: 'cover'
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    link:{
        fontWeight: 600
    },
    indicatorIconButtonProps: {
        padding: '10px',
        color: 'blue'
    },
    activeIndicatorIconButtonProps: {
        backgroundColor: 'red'
    },
    indicatorContainerProps: {
        marginTop: '50px',
        textAligh: 'right'
    }
}));

export default function PostItem({item = null}){
    const classes = useStyles();

    function getFile(avatar){
        return `http://api.lc/storage/${avatar}`
    }

    function getTime(){
        if(item?.created_at) {
            const range = moment().diff(moment(item.created_at),  'days')
            if(range < 1){
                return 'Сегодня'
            }else if(range > 1 && range < 5){
                return moment(item.created_at).fromNow()
            } else {
                return moment(item.created_at).format ('LL')
            }
        }
        return ''
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    !item ? (
                        <Skeleton animation="wave" variant="circle" width={40} height={40} />
                    ) : (
                        <Avatar alt={item.user.username} src={getFile(item.user.avatar)}/>
                    )
                }
                title={
                    !item ? (
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                    ) : (
                        <Link component={NavLink} color="inherit" className={classes.link} to={`/${item.user.username}`}>
                            {item.user.username}
                        </Link>
                    )
                }
                subheader={
                    !item ? (
                        <Skeleton animation="wave" height={10} width="40%" />
                    ) : (
                        getTime()
                    )
                }
            />
            {
                !item?.attachments ? (
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                ) : (
                    // <CardMedia
                    //     className={classes.media}
                    //     image="https://material-ui.com/static/images/cards/paella.jpg"
                    //     title="Paella dish"
                    // />
                    <Carousel
                        className="SecondExample"
                        autoPlay={false}
                        cycleNavigation={false}
                        animation="slide"
                        timeout={100}
                        indicators={item?.attachments.length > 1}
                        navButtonsAlwaysInvisible={item?.attachments.length == 1}
                        activeIndicatorIconButtonProps={{
                            style: {
                                backgroundColor: '#3f51b5'
                            }
                        }}
                    >
                        {
                            item.attachments.map((attach) =>
                                <div className={classes.media}>
                                    <img
                                        onDragStart={(e) => e.preventDefault()}
                                        src={getFile(attach.path)}
                                        key={`${attach.id}_${attach.post_id}_attach_${attach.name}`}
                                    />
                                </div>
                            )
                        }
                    </Carousel>
                )
            }
            <CardContent>
                {
                    !item ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                            <Skeleton animation="wave" height={10} width="80%"/>
                        </React.Fragment>
                    ) : (
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Link component={NavLink} color="inherit" className={classes.link} to={`/${item.user.username}`}>
                                {item.user.username}
                            </Link>
                            &nbsp;
                            {item.description}
                        </Typography>
                    )
                }
            </CardContent>
            <CardActions disableSpacing>
                {
                    !item ? (
                        <>
                            <Skeleton animation="wave" variant="circle" width={24} height={24} style={{margin: '24px', marginLeft: '10px'}}/>
                            <Skeleton animation="wave" variant="circle" width={24} height={24} style={{margin: '24px', marginLeft: '10px'}}/>
                        </>
                    ) : (
                        <>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon/>
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon/>
                            </IconButton>
                        </>
                    )
                }
            </CardActions>
        </Card>
    )
}
