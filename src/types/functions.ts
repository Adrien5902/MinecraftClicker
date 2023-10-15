export function nFormatter(num: number, digits = 1) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
        { value: 1e21, symbol: "Z" },
        { value: 1e24, symbol: "Y" },
        { value: 1e27, symbol: "R" },
        { value: 1e30, symbol: "Q" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup.slice().reverse().find((item) => num >= item.value);
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export function formatItemName(n: string){
    return n
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .split(" ")
    .map(s => s.slice(0, 1).toUpperCase() + s.slice(1))
    .join(" ")
}