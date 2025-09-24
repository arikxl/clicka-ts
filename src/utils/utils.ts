

export const getColor = () => {
    const randomColor1 = Math.floor(Math.random() * 16777215).toString(16);
    const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);

    const gradientStyle = {
        backgroundImage: `linear-gradient(to top left, #${randomColor1.padStart(6, '0')}, #${randomColor2.padStart(6, '0')})`
    };
    return gradientStyle
}


export const colors = [
    '#E76F51', '#2A9D8F', '#C7FFF7', '#3A86FF', '#8138EC',
    '#FF006E', '#FB5507', '#FFBE3B', '#2B5DE5', '#F25BB5',
    '#FF006E', '#FB5507', '#FFBE3B', '#2B5DE5', '#F25BB5',
    '#00F5D4', '#00BBF9', '#9A50A0', '#C197D2', '#D8DCFF',
    '#FFD166', '#06D6A0', '#118AB2', '#073B4C', '#EF476F',
    '#264653', '#BDE0FE', '#A2D2FF', '#FFC8DD', '#FFAFCC',
    '#F2DDB0', '#FFB703', '#023047', '#219EBC', '#8ECAE6',
    '#64DFDF', '#71EFDD', '#80FFDB', '#56CFE1', '#48BFE3',
    '#F94144', '#F3722C', '#F8961E', '#F9844A', '#F9C74F',
    '#90BE6D', '#43AA8B', '#4D908E', '#577590', '#277DA1',
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#F4A261',
    '#7400B8', '#6930C3', '#5E60CE', '#5390D9', '#4EA8DE',
    '#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF',
    '#FAD2E1', '#E5E5E5', '#2C3E50', '#FD7272', '#34A0FF',
    '#483D8B', '#6A5ACD', '#7B68EE', '#8A2BE2', '#9932CC',
    '#9400D3', '#BA55D3', '#DA70D6', '#EE82EE', '#FF00FF',
    '#00C49A', '#3D5A80', '#98C1D9', '#E0FBFC', '#293241',
    '#D81159', '#8F2D56', '#218380', '#FBB13C', '#73D2DE',
    '#34A0A4', '#168AAD', '#1A759F', '#1E6091', '#184E77',
    '#FFD60A', '#FFC300', '#FF5733', '#C70039', '#900C3F',
    '#581845', '#007F5F', '#55A630', '#80B918', '#AACC00'
];