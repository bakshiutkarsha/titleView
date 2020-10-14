import * as React from "react";
//@ts-ignore
import SidebarStyle from "../../../styles/Sidebar.scss";
import { INodeObject } from '../../interfaces/INode';
import { getAllNodesWithConnections, getSearchNodesWithConnections } from '../../service/nodeService';
import TitlePill from '../../components/TitlePill/index';
import * as DetailActions from "@actions/DetailActions";
import { connect } from "react-redux";
import { IStore, IDetailState } from "@reducers";

type SidebarProps = {
  onNodeChange: any;
  onSearchChange: any;
}

const mapDispatchToProps = {
  setSearchTerm: DetailActions.setSearchTerm,
  setNodeDetail: DetailActions.setNodeDetail
};

const Sidebar: React.FC<SidebarProps & IDetailState & typeof mapDispatchToProps> = ({ setSearchTerm, setNodeDetail }) => {

  const [nodesList, setNodes] = React.useState<INodeObject[]>()

  React.useEffect(() => {
    getSidebarData();
  }, [])

  const getSidebarData = async () => {
    setNodes(await getAllNodesWithConnections());
  }

  const handleSearch = async (value) => {
    setSearchTerm(value)
    if (value.length === 0) return;
    const resp = await getSearchNodesWithConnections(value);
    setNodes(resp);
  }


  return <div className={SidebarStyle.sidebarCntr}>
    <div className={SidebarStyle.searchCntr}>
      <input type='text' placeholder='Search Title' onChange={(e) => handleSearch(e.currentTarget.value)} />
      <img src='/search.png' />
    </div>

    {nodesList && nodesList.map((title: INodeObject) => {
      return (<TitlePill setNodeDetail={setNodeDetail} title={title} />)
    })
    }
  </div>
};

function mapStateToProps(state: IStore) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);