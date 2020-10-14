import * as React from "react";
//@ts-ignore
import DetailStyle from "../../../styles/Detail.scss";
import Highlighter from "react-highlight-words";
import { IStore, IDetailState } from "@reducers";
import { getAllVariables } from '../../service/nodeService';
import { connect } from "react-redux";

const mapDispatchToProps = {
};

const DetailPill: React.FC<IDetailState & typeof mapDispatchToProps> = ({ nodeDetail, searchTerm }) => {
  let [variableArr, setVariableArr] = React.useState<string[]>([])
  let [variableList, setVariableList] = React.useState<any[]>([])


  React.useEffect(() => {
    getVariableData();
    console.log('SEARCH TERm', searchTerm)
  }, [searchTerm])

  const getVariableData = async () => {
    let variables = await getAllVariables()

    setVariableList(variables);
    let variableStringList = []

    variables.map(ele => {
      variableStringList.push(ele.name);
    });

    variableStringList.push(searchTerm)
    setVariableArr(variableStringList);
  }

  const matchVariable = (text) => {
    const regExp = /\{.*?\}/g;
    let matches = text.match(regExp);
    if (!matches) {
      return text;
    }

    for (let i = 0; i < matches.length; i++) {
      let id = matches[i].split('|')[0].replace('{', '');
      let element = variableList.filter(ele => {
        if (id === ele.id) return ele;
      })

      if (element.length > 0) {
        text = text.replace(matches[i], element[0].name)
      } else {
        text = text.replace(matches[i], matches[i].split('|')[1].replace('}', ''));
      }
    }

    return text;
  }

  const getString = (strArr): string => {
    let resultStr = '';
    strArr.map(el => {
      if (typeof (el) === 'string') {
        resultStr += el;
      } else {
        resultStr += el.props.children[0];
      }
    })
    return resultStr;
  }

  if (!nodeDetail) {
    return <div className={DetailStyle.detailCntr}>
      <div className={DetailStyle.emptyCntr}>
        <img src="/empty1.png" />
        <p>Click on the title to know the details :)</p>
      </div>
    </div>
  }

  return <div className={DetailStyle.detailCntr}>
    <div className={DetailStyle.detailOptions}>
      <p className={DetailStyle.title}>{nodeDetail.title}</p>
      {nodeDetail && nodeDetail.content && nodeDetail.content.map(content => {
        return <div key={nodeDetail.title + content.body} className={DetailStyle.eachPill}>
          <p>Content Type: <span className={DetailStyle.text}>{content.type}</span></p>

          {content.type === 'text' ?
            <div>
              {(typeof (matchVariable(content.body)) === 'object') ?
                <Highlighter
                  highlightClassName="highlightSearch"
                  searchWords={variableArr}
                  autoEscape={true}
                  textToHighlight={getString(matchVariable(content.body))} />
                :
                <Highlighter
                  highlightClassName="higlight"
                  searchWords={variableArr}
                  autoEscape={true}
                  textToHighlight={matchVariable(content.body)} />
              }
            </div> : <div>
              <img src={content.url} />
            </div>}
        </div>
      })}
    </div>
  </div>
};

function mapStateToProps(state: IStore) {
  return {
    nodeDetail: state.detail.nodeDetail,
    searchTerm: state.detail.searchTerm
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPill);