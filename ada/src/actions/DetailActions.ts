import { createAction } from "typesafe-actions";
import { INode } from '../interfaces/INode';

export const setNodeDetail = createAction('NODE_DETAIL')<INode>();

export const setSearchTerm = createAction('SEARCH_TERM')<string>();
