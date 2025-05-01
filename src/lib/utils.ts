export function validateQuery(query: string) {
    if(!query || typeof query !== 'string'){
        return {valid: false, message: "Query must be a string."}
    }

    return { valid: true, message: ''};
}