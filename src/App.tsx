import { useEffect, useState } from 'react';
import './App.css';
import ItemGroups from './Component/ItemGroups';
import { GroupTab, TabGroup } from './Module/api.type';
import { GetAllTabs, Close, CoutTabs } from './Module/api';

function App() {
  let empty:TabGroup[] = [];
  let [tabs, setTabs] = useState(empty)
  let [count, setCount] = useState(0)
  let [bydomain, setBydomain] = useState('active')
  let [all, setall] = useState('')
  useEffect(()=>{
    loading()
  }, [])
  let clickSetList = (domain: boolean) => {
    if (domain) {
      setBydomain('active');
      setall('');
    } else {
      setBydomain('');
      setall('active');
    }
  }
  let close = async (i: number[]) => {
    await Promise.all(i.map(async id => await Close(id)));
    loading();
  }
  let loading = async () =>{
    let newTabs = GroupTab(await GetAllTabs())
    setTabs(newTabs)
    setCount(CoutTabs(newTabs))
  }
  return (
    <div className="App">
      <div className='head'>
        <div className='title'>Number of Tabs: {count}</div>
        <div className='headBtn'>
          <div className='headBtnTitle'>Tab List Of</div>
          <div className='btns'>
            <div className={bydomain} onClick={() => clickSetList(true)}>by domain</div>
            <div className={all} onClick={() => clickSetList(false)}>all tabs</div>
          </div>
        </div>
      </div>
      <ItemGroups tabs={tabs} all={all == 'active'} close={close}></ItemGroups>
    </div>
  );
}

export default App;
