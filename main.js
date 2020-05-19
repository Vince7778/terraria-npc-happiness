
const biomeList = ["forest", "hallow", "underground"];

const biomeProps = {
    forest: {
        name: "Forest",
        order: 1,
    },
    hallow: {
        name: "Hallow",
        order: 2,
    },
    underground: {
        name: "Underground",
        order: 3,
    },
}

class Biome extends React.Component {
    render() {
        const biomeType = this.props.biomeType;
        const biomeProp = biomeProps[biomeType];

        let divClass = "row mx-0 p-3 rounded-lg " + biomeType + " border border-"+biomeType;
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
        const biomesConcat = biomes.concat({
            type: type,
        });

        biomesConcat.sort((a, b) => {
            return (biomeProps[a.type].order - biomeProps[b.type].order);
        })

        this.setState({
            biomes: biomesConcat,
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
            <div class="col m-3 p-2 border rounded-lg">{biomeList}</div>
        );
    }
}

const tool = ReactDOM.render(<Tool />, document.getElementById("tool"));

const biomeDropdown = document.getElementById("biomeDropdownMenu");
biomeList.forEach(biomeName => {
    const biomeProp = biomeProps[biomeName];

    const className = "dropdown-item btn-"+biomeName;

    const elem = document.createElement("button");
    elem.innerHTML = biomeProp.name;
    elem.type = "button";
    elem.className = className;
    elem.onclick = () => {
        tool.addBiome(biomeName);
    }

    biomeDropdown.appendChild(elem);
});

function addAll() {
    biomeList.forEach(biomeName => {
        tool.addBiome(biomeName);
    });
}
