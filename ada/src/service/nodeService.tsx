import { INode, INodeObject }  from '../interfaces/INode';
import { IVariable }  from '../interfaces/IVariable';


const BASE_URL = 'http://localhost:5000';

export const getAllNodesWithConnections = async () :Promise<INodeObject[]> => {
    const nodes: INode[] = await getAllNodes()

    let nodeObjects: INodeObject[] = []
    for(const node of nodes) {
        nodeObjects.push(await getConnections(node.id));
    }

    return nodeObjects;
}

export const getSearchNodesWithConnections = async (search) :Promise<INodeObject[]> => {
    const nodes: INode[] = await searchTitles(search)

    const nodeObjects: INodeObject[] = []
    for(const node of nodes) {
        nodeObjects.push(await getConnections(node.id));
    }

    return nodeObjects;
}

export const getConnections = async (id: number) :Promise<INodeObject> => {
    const node = await getNodeDetail(id)

    let nodeObject = {
        id: node[0].id,
        title: node[0].title,
        content: node[0].content,
        connections: []
    }

    if(node[0].connections == null || node[0].connections.length == 0) {
        return nodeObject;
    }

    var connections = []
    for(const connection of node[0].connections) {
        const connectionObject = await getConnections(Number(connection))
        connections.push(connectionObject)
    }

    nodeObject.connections = connections;
    return nodeObject;
}

export const getAllNodes = async () :Promise<INode[]> => {
    const nodes = await fetch(`${BASE_URL}/nodes`);
    return nodes.json();
}

export const getNodeDetail = async (id: number) :Promise<INode> => {
    const node = await fetch(`${BASE_URL}/nodes/${id}`);
    return node.json();
}

export const getAllVariables = async () :Promise<IVariable[]> => {
    const node = await fetch(`${BASE_URL}/variables`);
    return node.json();
}

export const searchTitles = async (search) :Promise<INode[]> => {
    const node = await fetch(`${BASE_URL}/nodes/search`, { 
        method: 'post', 
        body: JSON.stringify({query: search}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    });
    return node.json();
}

export default getAllNodes;