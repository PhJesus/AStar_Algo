class Queue {
  constructor() {
    this.queue = []
  }

  enqueue(item) {
    this.queue.push(item)
  }

  dequeue() {
    return this.queue.shift()
  }

  isEmpty() {
    return this.queue.length === 0
  }
}

class Graph {
  constructor() {
    this.list = new Map()
  }

  addNode(node) {
    this.list.set(node, new Map())
  }

  addEdge(fromNode, toNode, weight) {
    this.list.get(fromNode).set(toNode, weight)
    this.list.get(toNode).set(fromNode, weight)
  }

  getNeighbors(node) {
    return this.list.get(node)
  }

  hasEdge(fromNode, toNode) {
    return this.list.get(fromNode).has(toNode)
  }

  aStar(start, goal) {
    const openList = new Queue()
    const closedList = []
    const gScore = new Map()
    const parents = new Map()

    openList.enqueue(start)

    gScore[start] = 0
    parents[start] = start

    while(!openList.isEmpty()) {

      let current = null

      for (let i = 0; i < openList.queue.length; i++) {
        if (current === null || gScore[openList.queue[i]] + getHeuristic(openList.queue[i], goal) < gScore[current] + getHeuristic(current, goal)) {
          current = openList.queue[i]
        }
      }

      for (let neighbor of this.getNeighbors(current)) {
        if (!closedList.includes(neighbor[0]) && !openList.queue.includes(neighbor[0])) {
          openList.enqueue(neighbor[0])
          parents[neighbor[0]] = current
          gScore[neighbor[0]] = gScore[current] + this.list.get(current).get(neighbor[0])
        }

        if (gScore[neighbor[0]] > gScore[current] + this.list.get(current).get(neighbor[0])) {
          gScore[neighbor[0]] = gScore[current] + this.list.get(current).get(neighbor[0])
          parents[neighbor[0]] = current

          if (closedList.includes(neighbor[0])) {
            closedList.splice(closedList.indexOf(neighbor[0]), 1)
            openList.enqueue(neighbor[0])
          }
        }
      }

      if (current == null) return null

      if (current === goal) {
        let path = []
        let node = goal
        while (node !== start) {
          path.push(node)
          node = parents[node]
        }
        path.push(start)
        return path.reverse()
      }

      openList.dequeue()
      closedList.push(current)
    }

    return null
  }
}

function getHeuristic(node) {
  const heuristic = new Map()
  heuristic.set('Arad', 366)
  heuristic.set('Bucharest', 0)
  heuristic.set('Craiova', 160)
  heuristic.set('Dobreta', 242)
  heuristic.set('Eforie', 161)
  heuristic.set('Fagaras', 178)
  heuristic.set('Giurgiu', 77)
  heuristic.set('Hirsova', 151)
  heuristic.set('Iasi', 226)
  heuristic.set('Lugoj', 244)
  heuristic.set('Mehadia', 241)
  heuristic.set('Neamt', 234)
  heuristic.set('Oradea', 380)
  heuristic.set('Pitesti', 98)
  heuristic.set('RimnicuVilcea', 193)
  heuristic.set('Sibiu', 253)
  heuristic.set('Timisoara', 329)
  heuristic.set('Urziceni', 80)
  heuristic.set('Vaslui', 199)
  heuristic.set('Zerind', 374)

  return heuristic.get(node)
}

const romaniaMap = new Graph()

romaniaMap.addNode('Arad');
romaniaMap.addNode('Zerind');
romaniaMap.addNode('Timisoara');
romaniaMap.addNode('Sibiu');
romaniaMap.addNode('Oradea');
romaniaMap.addNode('Lugoj');
romaniaMap.addNode('Fagaras');
romaniaMap.addNode('RimnicuVilcea');
romaniaMap.addNode('Mehadia');
romaniaMap.addNode('Dobreta');
romaniaMap.addNode('Craiova');
romaniaMap.addNode('Pitesti');
romaniaMap.addNode('Bucharest');
romaniaMap.addNode('Giurgiu');
romaniaMap.addNode('Urziceni');
romaniaMap.addNode('Vaslui');
romaniaMap.addNode('Iasi');
romaniaMap.addNode('Neamt');
romaniaMap.addNode('Hirsova');
romaniaMap.addNode('Eforie');

romaniaMap.addEdge('Arad', 'Zerind', 75);
romaniaMap.addEdge('Arad', 'Timisoara', 118);
romaniaMap.addEdge('Arad', 'Sibiu', 140);

romaniaMap.addEdge('Zerind', 'Oradea', 71);

romaniaMap.addEdge('Timisoara', 'Lugoj', 111);

romaniaMap.addEdge('Sibiu', 'Oradea', 151);
romaniaMap.addEdge('Sibiu', 'Fagaras', 99);
romaniaMap.addEdge('Sibiu', 'RimnicuVilcea', 80);

romaniaMap.addEdge('Lugoj', 'Mehadia', 70);

romaniaMap.addEdge('Fagaras', 'Bucharest', 211);

romaniaMap.addEdge('RimnicuVilcea', 'Pitesti', 97);
romaniaMap.addEdge('RimnicuVilcea', 'Craiova', 146);

romaniaMap.addEdge('Mehadia', 'Dobreta', 75);

romaniaMap.addEdge('Dobreta', 'Craiova', 120);

romaniaMap.addEdge('Craiova', 'Pitesti', 138);

romaniaMap.addEdge('Pitesti', 'Bucharest', 101);

romaniaMap.addEdge('Bucharest', 'Giurgiu', 90);
romaniaMap.addEdge('Bucharest', 'Urziceni', 85);

romaniaMap.addEdge('Urziceni', 'Vaslui', 142);
romaniaMap.addEdge('Urziceni', 'Hirsova', 98);

romaniaMap.addEdge('Vaslui', 'Iasi', 92);

romaniaMap.addEdge('Iasi', 'Neamt', 87);

romaniaMap.addEdge('Hirsova', 'Eforie', 86);

let path = romaniaMap.aStar('Arad', 'Bucharest')

console.log("Caminho: ", path.join(' -> '))