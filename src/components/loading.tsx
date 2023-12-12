import '@/assets/css/loading.css'

const LoadingUI = () => {
    return (
        <div id="loading">
            <svg viewBox="0 0 100 100">
                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="0" stdDeviation="1.5"
                            floodColor="#444dff" />
                    </filter>
                </defs>
                <circle id="spinner" style={{ fill: 'transparent', stroke: '#667af8', strokeWidth: "7px", strokeLinecap: "round", filter: "url(#shadow)" }} cx="50" cy="50" r="45" />
            </svg>
        </div>
    )
}

export default LoadingUI