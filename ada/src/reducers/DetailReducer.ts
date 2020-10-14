import { ActionType, getType } from "typesafe-actions";
import { INode } from '../interfaces/INode';

import * as actions from "@actions/DetailActions";

// INITIAL STATE
export interface IDetailState {
    nodeDetail: INode;
    searchTerm: string;
}

export const initialModalState: IDetailState = {
    nodeDetail: undefined,
    searchTerm: ""
}

// REDUCER
export const DetailReducer = (
    state: IDetailState = initialModalState,
    action: ActionType<typeof actions>
): IDetailState => {
    if(action.type === getType(actions.setNodeDetail)) {
        return {
            ...state,
            nodeDetail: action.payload
        };
    }
    
    if(action.type === getType(actions.setSearchTerm)) {
        return {
            ...state,
            searchTerm: action.payload
        };
    }
    return state;
}