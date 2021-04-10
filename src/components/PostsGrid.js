import React, {useEffect, useRef, useState} from "react";
import {GridList, GridListTile, GridListTileBar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {Favorite, QuestionAnswer} from "@material-ui/icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    titleBar: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        background: 'rgba(0,0,0,30%)',
        transition: 'all .3s',
        cursor: "pointer",
        '&:hover':{
            opacity: 1,
        }
    },
    tile: {
        position: "relative"
    }
}));

export default function PostsGrid({items}) {
    const classes = useStyles();
    const img = useRef();
    const [height, setHeight] = useState('100%')
    useEffect(()=>{
        setHeight(img.current.scrollWidth+"px")
        window.addEventListener('resize', setParametres)
        return () => {
            window.removeEventListener('resize', setParametres)
        }
    }, [items])
    useEffect(()=>{
        window.addEventListener('resize', setParametres)
        return () => {
            window.removeEventListener('resize', setParametres)
        }
    }, )

    function setParametres(){
        if(img.current) setHeight(img.current.scrollWidth+"px")
    }
    return (
        <div className={classes.root}>
            <GridList cellHeight={'auto'} cols={3}>
                {items.map((item,i) =>
                    <GridListTile
                        key={item.id}
                        cols={1}
                        classes={{
                            root: classes.tile
                        }}
                        ref={i == 0 ? img : null}
                        style={{height}}
                    >
                        <LazyLoadImage
                            width={height}
                            height={height}
                            effect="opacity"
                            src={`http://api.lc/storage/${item.thumb}`} />
                        {/*<img src={`http://api.lc/storage/${item.thumb}`} style={{objectFit:'cover', width: '100%', height: '100%'}}/>*/}
                        <div className={classes.titleBar}>
                            <Box display="flex" alignItems="center">
                                <Box  display="flex" alignItems="center" mr={2}>
                                    <Favorite/>
                                    <Box ml=".5">
                                        123
                                    </Box>
                                </Box>
                                <Box  display="flex" alignItems="center">
                                    <QuestionAnswer/>
                                    <Box ml=".5">
                                        123
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                    </GridListTile>
                )}
            </GridList>
        </div>
    )
}
