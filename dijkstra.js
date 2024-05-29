
// Dijkstra's algorithm to find the shortest distances from a starting vertex to all other vertices in a weighted graph

const dijkstra = (graph, start) => {
    const distances = {};
    const visited = {};
    const queue = new PriorityQueue();

   
    for (const vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Add the start vertex to the priority queue
    queue.enqueue(start, 0);

    // Explore vertices until the priority queue is empty
    while (!queue.isEmpty()) {
        const currentVertex = queue.dequeue().element;
        visited[currentVertex] = true;

        // Explore neighbors of the current vertex
        for (const neighbor in graph[currentVertex]) {
            if (!visited[neighbor]) {
                const totalDistance = distances[currentVertex] + graph[currentVertex][neighbor];
                if (totalDistance < distances[neighbor]) {
                    distances[neighbor] = totalDistance;
                    queue.enqueue(neighbor, totalDistance);
                }
            }
        }
    }

    return distances;
};


class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// Example usage
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

const shortestDistances = dijkstra(graph, 'A');
console.log(shortestDistances);
