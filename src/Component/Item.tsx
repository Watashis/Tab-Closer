import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Tab } from '../Module/api.type';
import Check from "./check";
import Cross from "./cross";
type Props = {
    children: Tab,
    checked: boolean,
    key: number,
    all: boolean,
    close: Function
}

const Item = forwardRef((props: Props, ref) => {
    const [checked, setChecked] = useState(props.checked);

    useEffect(() => {
        setChecked(props.checked)
    }, [props]);

    useImperativeHandle(ref, () => ({
        getClose() {
            return [checked, props.children.id]
        }
    }));

    let setCheck = (e: any) => {
        if (e != 'cross') {
            setChecked(!checked)
        } else {
            props.close([props.children.id])
        }
    }
    return (<div title={props.children.url} onClick={(e: any) => setCheck(e.target.classList[0])} key={props.children.id}>
        {
            !props.all ? <Check active={checked} display={true}></Check> : undefined
        }
        <p>{props.children.title}</p>
        <Cross></Cross>
    </div>)
});

export default Item;