export interface INode {
    id: number;
    title: string;
    content: IContent[];
    connections: [];
}

export interface INodeObject {
    id: number;
    title: string;
    content: IContent[];
    connections: INode[];
}

export interface IContent {
    type: string;
    body?: string;
    url?: string;
}
