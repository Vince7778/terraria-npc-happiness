
const biomeProps = {
    underground: {
        colors: {
            border: "dark",
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
        let divClass = "p-3 rounded-lg bg-"+colorType.bg+" text-"+colorType.text+" border border-"+colorType.border;
        if (this.props.needsMargin) divClass += " mt-2";

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
        this.addBiome = this.addBiome.bind(this);
    }

    addBiome(type) {
        const biomes = this.state.biomes;

        this.setState({
            biomes: biomes.concat({
                type: type,
            })
        });
    }

    render() {
        const biomeState = this.state.biomes;
        const biomeList = biomeState.map((biome, ind) => {
            const needsMargin = ind >= 1;
            return (
                <Biome biomeType={biome.type} needsMargin={needsMargin}/>
            )
        });

        return (
            <div>{biomeList}</div>
        );
    }
}

const tool = ReactDOM.render(<Tool />, document.getElementById("tool"));
tool.addBiome("underground");
tool.addBiome("underground");