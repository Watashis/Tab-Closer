import React, { createRef } from "react";
import { TabGroup } from '../Module/api.type';
import Check from "./check";
import Item from "./Item";
import Cross from "./cross";
type Props = {
    children: TabGroup;
    key: number;
    close:Function
}

type State = {
    checkActive: boolean,
    checkDisplay: boolean,
    active: boolean,

}
export default class ItemGroup extends React.Component<Props, State> {
    items: React.RefObject<any>[]
    constructor(props: Props) {
        super(props)
        this.state = {
            checkDisplay: false,
            checkActive: false,
            active: false
        }
        this.items = [];
        this.showItems = this.showItems.bind(this);
        this.check = this.check.bind(this);
        this.close = this.close.bind(this);
    }
    showItems() {
        this.setState({ checkDisplay: !this.state.checkDisplay, active: !this.state.active })
    }
    check() {
        if (this.state.checkDisplay) {
            this.setState({ checkActive: !this.state.checkActive })
        }
    }
    close() {
        let items:number[] = this.items.map(i =>{
            if(i.current != null){
                if(!this.state.checkDisplay){
                    return i.current.getClose()[1]
                }else{
                    let istate = i.current.getClose();
                    if(istate[0]){
                        return istate[1]
                    }
                }
            }
            return undefined;
        }).filter(i=>i!=undefined);
        this.props.close(items)
    }
    render() {
        return (<div className={`ItemGroup ${this.state.active ? 'active' : ''}`}>
            <div className="titleBlock">
                <Check active={this.state.checkActive} display={this.state.checkDisplay} onClick={this.check}></Check>
                <div className="title" onClick={this.showItems}>
                    {this.props.children.host} [{this.props.children.tabs.length}]
                </div>
                <Cross onClick={this.close}></Cross>
            </div>
            <div className="items">
                {
                    this.props.children.tabs.map(tab => {
                        let ref = createRef();
                        let item = <Item checked={this.state.checkActive} key={tab.id} all={false} ref={ref} close={this.props.close}>{tab}</Item>
                        this.items.push(ref)
                        return item
                    })
                }
            </div>
        </div>)
    }
}