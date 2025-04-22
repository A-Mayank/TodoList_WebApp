export const fetchSampleTodos = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return await response.json();
};
