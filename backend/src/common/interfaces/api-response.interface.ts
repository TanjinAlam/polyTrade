export interface APIResponse<T> {
    statusCode: number
    message?: string
    result?: T
}
