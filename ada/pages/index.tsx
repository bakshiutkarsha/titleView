import * as React from "react";
import  '../styles/styles.globals.scss';
//@ts-ignore
import Bg from "../styles/Bg.scss";
import Sidebar from "../src/components/Sidebar/index";
import DetailPill from "../src/components/DetailPill/index";

const IndexPage: React.FC = () => {
  return <div className={Bg.bgCntr}>
    <Sidebar></Sidebar>
    <DetailPill ></DetailPill>
  </div>
};

export default IndexPage;