import React from "react";
import ItemGroup from "./ItemGroup";
import { TabGroup } from '../Module/api.type';
import Item from "./Item";
type Props = {
    tabs: TabGroup[],
    all: boolean,
    close:Function
}
export default function ItemGroups(props:Props){
    if(props.all){
        return (<div className="ItemGroups all">
            {
                props.tabs.map((tabs, i) => {
                    return tabs.tabs.map((tab,i2)=>{
                        return <Item key={parseInt(`${i}${i2}`)} checked={false} all={true} close={props.close}>{tab}</Item>
                    })
                })
            }
        </div>)
    }else{
        return (<div className="ItemGroups">
            {
                props.tabs.map((tab, i) => <ItemGroup key={i} close={props.close}>{tab}</ItemGroup>)
            }
        </div>)
    }
}