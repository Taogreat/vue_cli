export function saveTodos(value){
    window.localStorage.setItem('todos_key',JSON.stringify(value))
}

export function readTodos(){
    return JSON.parse(window.localStorage.getItem('todos_key') || '[]')
}