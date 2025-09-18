

export const getColor = () => {
    const randomColor1 = Math.floor(Math.random() * 16777215).toString(16);
    const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);

    const gradientStyle = {
        backgroundImage: `linear-gradient(to top left, #${randomColor1.padStart(6, '0')}, #${randomColor2.padStart(6, '0')})`
    };
    return gradientStyle
}