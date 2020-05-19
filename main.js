
const names = {
    underground: "Underground"
}

const biomeProps = {
    underground: {
        colors: {
            border: "secondary",
            text: "white",
            bg: "secondary",
        },
        name: "Underground",
    },
}

class Biome extends React.Component {
    render() {
        const biomeProp = biomeProps[this.props.biomeType];
        const colorType = biomeProp.colors;
        const divClass = "p-3 rounded-lg bg-"+colorType.bg+" text-"+colorType.text+" border-"+colorType.border;
        const biomeName = biomeProp.name;

        return (
            <div class={divClass}>
                <h4>{biomeName}</h4>
            </div>
        );
    }
}

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = { biomes: [] }
    }

    render() {
        return (
            <Biome biomeType="underground" />
        );
    }
}

ReactDOM.render(<Tool />, document.getElementById("tool"))