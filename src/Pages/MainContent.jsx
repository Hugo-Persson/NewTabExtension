/*global chrome*/
import React, { useState, useCallback } from 'react'
import { Route, Switch } from "react-router-dom"
import { Flipper, Flipped } from "react-flip-toolkit"
import AddOption from "../Components/AddOptions"
import InsideFolder from "./InsideFolder"
import QuickAccessGrid from './QuickAccessGrid'

export default function MainContent(props) {
    const { quickAccessLinks, asignSelectedQuickAccessItem } = props;

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const ReRender = () => {
        forceUpdate();
    }
    function RightClick(e, history, link) {
        e.preventDefault();
        history.push("/EditQuickAccessItem");
        link.reRender = ReRender;
        asignSelectedQuickAccessItem(link);
    }
    //react-flip-toolkit is a library that handle animations for items changing order in a grid.
    // I use two components in this library Flipper and Flipped. 
    // Flipper is the container for all items and Flipped is the container for each individual item
    // When the flipKey changes in flipper the animation gets rendered
    return (
        <React.Fragment>
            <Switch>
                <Route path="/folder/:index" children={<InsideFolder {...props} />} />
                <Route path="/" render={({ history }) => (

                    <QuickAccessGrid quickAccessLinks={quickAccessLinks} />


                )} />
            </Switch>
        </React.Fragment>
    )
}