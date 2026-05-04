export const getSquareColor = (rowIndex: number, columnIndex: number) => {
    if (rowIndex % 2 === 1) {
        return columnIndex % 2 === 0 ? 'lightgrey' : 'lightblack';
    }
    return columnIndex % 2 === 1 ? 'lightgrey' : 'lightblack';
}