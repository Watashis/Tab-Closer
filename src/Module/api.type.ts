class Tab {
    id!: number;
    windowId!: number;
    url!: string;
    title!: string;
    constructor(tab: any) {
        this.id = tab.id;
        this.windowId = tab.windowId;
        this.url = tab.url;
        this.title = tab.title;
    }
    getHost() {
        return this.url.split('/')[2]
    }
}
type TabGroup = {
    host: string,
    tabs: Tab[]
}
function GroupTab(tabs: Tab[]) {
    let group: TabGroup[] = [];
    tabs.forEach(tab => {
        let host = tab.getHost()
        let item = group.filter(g => g.host == host);
        let id = -1;
        if (item.length == 0) {
            group.push({ host: host, tabs: [] })
            id=group.length-1
        }else{
            id = group.indexOf(item[item.length-1])
        }
        group[id].tabs.push(tab)
    })
    return group;
}
export { Tab, GroupTab };
export type { TabGroup };
