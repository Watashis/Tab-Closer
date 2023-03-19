export default function Check(props:any){
    let style = {
        'opacity': (props.display as boolean)?1:0
    }
    return <i onClick={props.onClick} className={`check ${(props.active as boolean)?'active':''}`} style={style}></i>
}