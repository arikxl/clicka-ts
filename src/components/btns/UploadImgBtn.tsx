

const UploadImgBtn = ({ onClick }: { onClick: () => void }) => {

    const styles = `
        .upload-btn {
            border: none;
            display: flex;
            padding: 10px 30px;
            background-color: #b83476;
            color: #ffffff;
            text-align: center;
            cursor: pointer;
            vertical-align: middle;
            align-items: center;
            border-radius: 0.5rem;
            user-select: none;
            gap: 0.75rem;
            box-shadow:
            0 4px 6px -1px #488aec31,
            0 2px 4px -1px #488aec17;
            transition: all 0.6s ease;
            // margin:auto;
            // width: 100%;
            justify-content: center;
        }


        .upload-btn:focus,
        .upload-btn:active {
          opacity: 0.85;
          box-shadow: none;
        }

        .upload-btn svg {
          width: 1.25rem;
          height: 1.25rem;
        }
    `;



    return (
        <>

            <style>{styles}</style>

            <button className='upload-btn !bg-purple-500' onClick={onClick} type="button">
                <svg
                    aria-hidden="true"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-width="2"
                        stroke="#fffffff"
                        d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                    ></path>
                    <path
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2"
                        stroke="#fffffff"
                        d="M17 15V18M17 21V18M17 18H14M17 18H20"
                    ></path>
                </svg>
                Add Img
            </button>
        </>

    )
}

export default UploadImgBtn