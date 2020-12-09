import React, { Component } from 'react';
import { Card, CardContent, Typography } from "@material-ui/core"
import './infobox.css'

const InfoBox = ({ title,active,isred, cases, total,...props }) => {
    return (
        <Card onClick={props.onClick} className={`infobox ${active && "infobox__selected"} ${isred && "infobox--red"}`} >
            <CardContent>
                <Typography className="infobox__title" color='textSecondary'>{title}</Typography>
                <h2 className="infobox__cases">+{cases}</h2>
                <Typography className="infobox__total" color="textSecondary" >{total} Total</Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;