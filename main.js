
class Preference extends React.Component {
    render() {
        const quality = this.props.quality;
        const scheme = qualityColors[quality];

        const type = this.props.type;
        const divClass = "col-auto ml-auto rounded-lg h-100 p-2 wrap text-center text-"+scheme.text+" bg-"+scheme.bg;
        let text;
        if (type === "biome") {
            text = "In a\n"+quality+" biome";
        } else if (type === "neighbor") {
            const neighborName = npcProps[this.props.npc].name;
            text = "Has a "+quality+"\nneighbor:\n"+neighborName;
        }

        return (
            <div className={divClass}>
                <h6>{text}</h6>
            </div>
        );
    }
}

class NPC extends React.Component {
    render() {
        const npcType = this.props.npcType;
        const ind = this.props.ind;
        
        const hasMargin = ind >= 1;
        let className = "row align-items-center mx-0 p-2 blank border border-dark rounded-lg";
        if (hasMargin) className += " mt-1";

        const imgSrc = "images/" + npcType + ".png";
        
        const npcName = npcProps[npcType].name;

        const upBtn = this.props.isFirstBiome ? null : 
            (<button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.props.moveNPCUp}><i className="fas fa-chevron-up"></i></button>);
        const downBtn = this.props.isLastBiome ? null : 
            (<button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.props.moveNPCDown}><i className="fas fa-chevron-down"></i></button>);

        return (
            <div className={className}>
                <div className="col-auto">
                    <div className="btn-group-vertical">
                        {upBtn}
                        {downBtn}
                    </div>
                </div>
                <div className="col-auto">
                    <img src={imgSrc}></img>
                </div>
                <div className="col-auto">
                    <h5 className="vert-center">{npcName}</h5>
                </div>
                <div className="col-auto justify-content-end right-align vert-center">
                    <button className="btn blank" onClick={this.props.removeNPC}><i className="fas fa-times"></i></button>
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
        if (!this.props.isFirst) divClass += " mt-2";

        const btnClass = "btn btn-"+biomeType;

        const biomeName = biomeProp.name;

        const npcList = this.props.npcs.map((npc, ind) => {
            return (
                <NPC 
                    key={ind} 
                    npcType={npc} 
                    ind={ind} 
                    removeNPC={() => {this.props.removeNPC(npc)}}
                    isFirstBiome={this.props.isFirst}
                    isLastBiome={this.props.isLast}
                    moveNPCUp={() => this.props.moveNPCUp(npc)}
                    moveNPCDown={() => this.props.moveNPCDown(npc)}
                />
            );
        });

        return (
            <div className={divClass}>
                <div className="col">
                    <div className="row">
                        <div className="col vert-center">
                            <h4>{biomeName}</h4>
                        </div>
                        <div className="col-auto justify-content-end right-align vert-center">
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
        this.state = { biomes: [] }
        this.addBiome = this.addBiome.bind(this);
    }

    addBiome(type) {
        const biomes = this.state.biomes;
        const id = this.state.idInd;
        const biomesConcat = biomes.concat({
            type: type,
            npcs: [],
        });

        biomesConcat.sort((a, b) => {
            return (biomeProps[a.type].order - biomeProps[b.type].order);
        });

        this.setState({
            biomes: biomesConcat,
        });
    }

    deleteBiome(ind) {
        const biomes = this.state.biomes.slice();
        const removed = biomes.splice(ind, 1);

        removed[0].npcs.forEach(type => {
            toggleNPCDropdown(type, false);
        });

        this.setState({
            biomes: biomes,
        });
    }

    // Adds NPC to first biome
    addNPC(type) {
        const biomes = this.state.biomes.slice();
        if (biomes.length > 0) {
            for (let i = 0; i < biomes.length; i++) {
                if (biomes[i].npcs.includes(type)) {
                    console.error("Can't add NPC twice!");
                    return;
                }
            }

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

            toggleNPCDropdown(type, true);

            this.setState({
                biomes: biomes,
            });
        }
    }

    removeNPC(type) {
        const biomes = this.state.biomes.slice();
        for (let i = 0; i < biomes.length; i++) {
            const npcs = biomes[i].npcs;
            for (let j = npcs.length-1; j >= 0; j--) {
                if (npcs[j] === type) {
                    npcs.splice(j, 1);
                }
            }
        }

        toggleNPCDropdown(type, false);

        this.setState({
            biomes: biomes,
        });
    }

    moveNPCUp(type, biomeInd) {
        const biomes = this.state.biomes.slice();
        if (biomeInd >= 1) {
            const ind = biomes[biomeInd].npcs.indexOf(type);
            if (ind != -1) {
                biomes[biomeInd].npcs.splice(ind, 1);
                biomes[biomeInd-1].npcs.push(type);
            }
        }
        this.setState({
            biomes: biomes,
        });
    }

    moveNPCDown(type, biomeInd) {
        const biomes = this.state.biomes.slice();
        if (biomeInd < biomes.length - 1) {
            const ind = biomes[biomeInd].npcs.indexOf(type);
            if (ind != -1) {
                biomes[biomeInd].npcs.splice(ind, 1);
                biomes[biomeInd+1].npcs.unshift(type);
            }
        }
        this.setState({
            biomes: biomes,
        });
    }

    render() {
        const biomeState = this.state.biomes;
        const biomeList = biomeState.map((biome, ind) => {
            return (
                <Biome
                    key={ind} 
                    biomeType={biome.type} 
                    isFirst={ind == 0} 
                    isLast={ind == biomeState.length-1}
                    delete={() => this.deleteBiome(ind)} 
                    npcs={biome.npcs} 
                    removeNPC={type => this.removeNPC(type, ind)}
                    moveNPCUp={type => this.moveNPCUp(type, ind)}
                    moveNPCDown={type => this.moveNPCDown(type, ind)}
                />
            );
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

    const elem = document.createElement("button");
    elem.innerHTML = npcProp.name;
    elem.type = "button";
    elem.className = "dropdown-item";
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

function toggleNPCDropdown(type, disabled) {
    const dropdown = document.getElementById("npcDropdownMenu");
    const children = dropdown.children;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === npcProps[type].name) {
            children[i].className = "dropdown-item";
            if (disabled) children[i].className += " disabled";
        }
    }
}
