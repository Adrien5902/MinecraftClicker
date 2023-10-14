export interface ObjectClass{
    name: string
}

export function ObjectClassMap<I, U>(obj: U, Class: new (name: keyof typeof obj, ...values: any[]) => ObjectClass){
    type Name = keyof typeof obj
    return Object.keys(obj as any).reduce((prev, key) =>({
        ...prev,
        [key]: new Class(key as Name, ...(obj[key as Name] as any[]))
    }) 
    , {} as Record<Name, I>);
}