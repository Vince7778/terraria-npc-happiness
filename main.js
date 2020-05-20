
class NPC extends React.Component {
    render() {
        const npcType = this.props.npcType;
        const ind = this.props.ind;
        
        const hasMargin = ind >= 1;
        let className = "row align-items-center mx-0 p-2 blank border border-dark rounded-lg";
        if (hasMargin) className += " mt-1";

        const imgSrc = "images/" + npcType + ".png";
        
        const npcName = npcProps[npcType].name;

        return (
            <div className={className}>
                <div className="col-auto">
                    <img src={imgSrc}></img>
                </div>
                <div className="col">
                    <h5 className="vert-center">{npcName}</h5>
                </div>
            </div>
        );
    }
}

class Biome extends React.Component {
    render() {
        const biomeType = this.props.biomeType;
        const biomeProp = biomeProps[biomeType];

        let divClass = "row mx-0 p-3 rounded-lg " + biomeType + " border border-"+biomeType;
        if (this.props.needsMargin) divClass += " mt-2";

        const btnClass = "btn btn-"+biomeType;

        const biomeName = biomeProp.name;

        const npcList = this.props.npcs.map((npc, ind) => {
            return (
                <NPC key={ind} npcType={npc} ind={ind} />
            );
        });

        return (
            <div className={divClass}>
                <div className="col">
                    <div className="row">
                        <div className="col vert-center">
                            <h4>{biomeName}</h4>
                        </div>
                        <div className="col right-align vert-center">
                            <button className={btnClass} onClick={this.props.delete}><i className="fas fa-times"></i></button>
                        </div>
                    </div>
                    {npcList}
                </div>
            </div>
        );
    }
}

class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = { biomes: [], idInd: 0 }
        this.addBiome = this.addBiome.bind(this);
    }

    addBiome(type) {
        const biomes = this.state.biomes;
        const id = this.state.idInd;
        const biomesConcat = biomes.concat({
            type: type,
            id: id,
            npcs: [],
        });

        biomesConcat.sort((a, b) => {
            return (biomeProps[a.type].order - biomeProps[b.type].order);
        })

        this.setState({
            biomes: biomesConcat,
            idInd: id+1,
        });
    }

    deleteBiome(id) {
        const biomes = this.state.biomes.slice();
        let biomeInd;
        biomes.forEach((biome, ind) => {
            if (id == biome.id) {
                biomeInd = ind;
            }
        });
        biomes.splice(biomeInd, 1);
        this.setState({
            biomes: biomes,
            id: this.state.id,
        });
    }

    // Adds NPC to first biome
    addNPC(type) {
        const biomes = this.state.biomes.slice();
        if (biomes.length > 0) {
            const prefType = npcProps[type].biome.liked;
            let prefInd = -1;
            for (let i = 0; i < biomes.length; i++) {
                if (biomes[i].type === prefType) {
                    prefInd = i;
                    break;
                }
            }
            if (prefInd == -1) prefInd = 0;

            biomes[prefInd].npcs.push(type);

            this.setState({
                biomes: biomes,
                idInd: this.state.idInd,
            });
        }
    }

    render() {
        const biomeState = this.state.biomes;
        const biomeList = biomeState.map((biome, ind) => {
            const needsMargin = ind >= 1;
            return (
                <Biome key={biome.id} biomeType={biome.type} needsMargin={needsMargin} delete={() => this.deleteBiome(biome.id)} npcs={biome.npcs}/>
            )
        });

        return (
            <div className="col m-3 p-2 border rounded-lg">{biomeList}</div>
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

const npcDropdown = document.getElementById("npcDropdownMenu");
npcList.forEach(npcName => {
    const npcProp = npcProps[npcName];

    const className = "dropdown-item btn-"+npcName;

    const elem = document.createElement("button");
    elem.innerHTML = npcProp.name;
    elem.type = "button";
    elem.className = className;
    elem.onclick = () => {
        tool.addNPC(npcName);
    }

    npcDropdown.appendChild(elem);
});

function addAll() {
    biomeList.forEach(biomeName => {
        tool.addBiome(biomeName);
    });
}

function addAllNPCs() {
    npcList.forEach(npcName => {
        tool.addNPC(npcName);
    });
}
