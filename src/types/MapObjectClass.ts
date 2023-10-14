export interface ObjectClass{
    name: string
}

export function ObjectClassMap<I, U>(obj: U, Class: new (name: string, ...values: any[]) => ObjectClass){
    type Name = keyof U
    return Object.keys(obj as any).reduce((prev, key) =>({
        ...prev,
        [key]: new Class(key as string, ...(obj[key as Name] as any[]))
    }) 
    , {} as Record<Name, I>);
}