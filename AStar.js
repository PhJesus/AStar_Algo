/*
Cidades (definidas por posição em um array)
0.Arad 1.Bucareste 2.Craiova 3.Dobreta 4.Eforie 5.Fagaras 6.Giurgiu 7.Hirsova 8.Iasi 9.Lugoj 10.Mehadia 11.Neamt 12.Oradea 13.Pitesti 14.Rimnicu 15.Sibiu 16.Timisoara 17.Urziceni 18.Vaslui 19.Zerind
*/

// Distância da cidade de Bucareste
const distances = [366, 0, 160, 242, 161, 176, 77, 151, 226, 244, 241, 234, 380, 100, 193, 253, 329, 80, 199, 374]

grafomapaRomenia = {
    "Arad": { "Zerind": 75, "Timisoara": 118, "Sibiu": 140 },
    "Zerind": { "Arad": 75, "Oradea": 71 },
    "Timisoara": { "Arad": 118, "Lugoj": 111 },
    "Sibiu": { "Arad": 140, "Oradea": 151, "Fagaras": 99, "RimnicuVilcea": 80 },
    "Oradea": { "Zerind": 71, "Sibiu": 151 },
    "Lugoj": { "Timisoara": 111, "Mehadia": 70 },
    "Fagaras": { "Sibiu": 99, "Bucharest": 211 },
    "RimnicuVilcea": { "Sibiu": 80, "Pitesti": 97, "Craiova": 146 },
    "Mehadia": { "Lugoj": 70, "Dobreta": 75 },
    "Dobreta": { "Mehadia": 75, "Craiova": 120 },
    "Craiova": { "Dobreta": 120, "RimnicuVilcea": 146, "Pitesti": 138 },
    "Pitesti": { "RimnicuVilcea": 97, "Craiova": 138, "Bucharest": 101 },
    "Bucharest": { "Fagaras": 211, "Pitesti": 101, "Giurgiu": 90, "Urziceni": 85 },
    "Giurgiu": { "Bucharest": 90 },
    "Urziceni": { "Bucharest": 85, "Vaslui": 142, "Hirsova": 98 },
    "Vaslui": { "Urziceni": 142, "Iasi": 92 },
    "Iasi": { "Vaslui": 92, "Neamt": 87 },
    "Neamt": { "Iasi": 87 },
    "Hirsova": { "Urziceni": 98, "Eforie": 86 },
    "Eforie": { "Hirsova": 86 }
}

function bfs(graph, startPoint, endPoint) {
    const queue = []
    queue.push(startPoint)
    let visited = { [startPoint]: null }

    console.log(queue)

    let current = null

    
    while (queue) {
        current = queue.shift()
        
        if (current == endPoint) break

        for (let neighbor in graph[current]) {
            if (!(neighbor in visited)) {
                visited[neighbor] = current
                queue.push(neighbor)
                console.log(visited[neighbor])
            }
        }
    }

    const path = []

    for (current in visited) {
        path.push(current)
        current = current[visited]
    }

    return path
}

console.log(bfs(grafomapaRomenia, 'Zerind', 'Bucharest'))