import * as React from "react";
//@ts-ignore
import SidebarStyle from "../../../styles/Sidebar.scss";
import { INodeObject } from '../../interfaces/INode';
import { getNodeDetail } from '../../service/nodeService';
import * as DetailActions from "@actions/DetailActions";
import { connect } from "react-redux";
import { IStore, IDetailState } from "@reducers";

type TitleProps = {
  title: INodeObject;
}

const mapDispatchToProps = {
  setNodeDetail: DetailActions.setNodeDetail
};

const TitlePill: React.FC<TitleProps & IDetailState & typeof mapDispatchToProps> = ({title, setNodeDetail}) => {

  const [isExpanded, setExpanded] = React.useState<boolean>(false)
  
  async function changeNode(id: number, event?: any){
    if(event) event.stopPropagation();
    let nodeDetail =  await getNodeDetail(id);
    setExpanded(!isExpanded);
    setNodeDetail(nodeDetail[0]);
  }

  return(
    <div key={title.id} className={SidebarStyle.eachTitle} onClick={(e) => changeNode(title.id, e)}>
      {title.title}
      {title.connections && title.connections.map((innerTitle: INodeObject) => {
        //@ts-ignore
        return(isExpanded && <TitlePill title={innerTitle} setNodeDetail={setNodeDetail}/>) 
      })
    }
    </div>
  )
};

function mapStateToProps(state: IStore) {
    
  return {
    
  };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TitlePill);