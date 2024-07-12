import type { ParsedQs } from 'qs'
export function ParseParamsToObject(params: ParsedQs) {
    const filter: Record<string, unknown> = {}
    for (const key of Object.keys(params)) {
        const value = params[key]
        if (value !== undefined && value !== null && value !== '') {
            filter[key] = Array.isArray(value) ? value[0] : value
        }
    }
    return { filter }
}
