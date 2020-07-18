
class Preference extends React.Component {
    render() {
        const quality = this.props.quality;
        const scheme = qualityColors[quality];

        const type = this.props.type;
        let divClass = "col-auto rounded-lg h-100 p-2 wrap text-center text-"+scheme.text+" bg-"+scheme.bg;
        if (this.props.index === 0) divClass += " ml-auto";
        else divClass += " ml-2";

        let text;
        if (type === "biome") {
            text = "In a "+quality+"\nbiome";
        } else if (type === "neighbor") {
            const neighborName = npcProps[this.props.npc].name;
            text = "Has a "+quality+"\nneighbor:\n"+neighborName;
        } else if (type === "nearby") {
            const count = this.props.neighborCount;
            if (count < 2) {
                text = "Few\nneighbors";
            } else if (count > 2) {
                text = "Too many\nneighbors\nx" + (count-2);
            }
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

        let upBtn = null;
        let downBtn = null;
        if (npcType !== "truffle") {
            if (!this.props.isFirstBiome) upBtn = 
                (<button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.props.moveNPCUp}><i className="fas fa-chevron-up"></i></button>);
            if (!this.props.isLastBiome) downBtn =
                (<button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.props.moveNPCDown}><i className="fas fa-chevron-down"></i></button>);
        }

        const prefs = this.props.prefs;

        let closeButtonClassName = "col-auto justify-content-end right-align vert-center"
        if (prefs.length === 0) closeButtonClassName += " ml-auto";

        let priceMult = 1;
        prefs.forEach(p => {
            if (p.props.type !== "nearby") priceMult *= prefImpacts[p.props.quality];
            else {
                const neighborCount = p.props.neighborCount;
                if (neighborCount < 2) priceMult *= 0.9;
                else {
                    for (let i = 3; i <= neighborCount; i++) priceMult *= 1.04;
                }
            }
        });
        priceMult = Math.round(priceMult*20)/20;
        
        let priceText = "Price: "+(priceMult*100).toFixed(0)+"%";
        if (priceMult > 1.5) priceText += " (capped at 150%)";
        else if (priceMult < 0.75) priceText += " (capped at 75%)";

        let priceColor;
        if (priceMult < 1) priceColor = "text-success";
        else if (priceMult == 1) priceColor = "text-body";
        else priceColor = "text-danger";

        const textClass = "vert-center "+priceColor;

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
                <div className="col-auto">
                    <h5 className={textClass}>{priceText}</h5>
                </div>
                {prefs}
                <div className={closeButtonClassName}>
                    <button className="btn blank" onClick={this.props.removeNPC}><i className="fas fa-times"></i></button>
                </div>
            </div>
        );
    }
}

class Biome extends React.Component {
    findPrefs(npc) {
        let prefs = [];

        const prefTypes = ["loved", "liked", "disliked", "hated"];
        const neighbors = this.props.npcs;
        prefTypes.forEach(t => {
            const curNPCPrefs = npcProps[npc].neighbors[t];
            for (let i = 0; i < neighbors.length; i++) {
                for (let j = 0; j < curNPCPrefs.length; j++) {
                    if (neighbors[i] === curNPCPrefs[j]) {
                        prefs.push({type: "neighbor", quality: t, npc: neighbors[i]});
                        break;
                    }
                }
            }
        });

        const npcProp = npcProps[npc];
        const biomeType = this.props.biomeType;
        if (npcProp.biome.liked === biomeType) {
            if (npc === "santa") {
                prefs.push({type: "biome", quality: "loved"});
            } else {
                prefs.push({type: "biome", quality: "liked"});
            }
        } else if (npcProp.biome.disliked === biomeType) {
            if (npc === "santa") {
                prefs.push({type: "biome", quality: "hated"});
            } else if (npc !== "truffle") {
                prefs.push({type: "biome", quality: "disliked"});
            }
        }

        const neighborCount = neighbors.length-1;
        if (neighborCount > 2) {
            prefs.push({type: "nearby", quality: "disliked"});
        } else if (neighborCount < 2) {
            prefs.push({type: "nearby", quality: "loved"});
        }

        const sortInds = {loved:0, liked:1, disliked:2, hated:3};
        prefs.sort((a, b) => {
            return (sortInds[a.quality] - sortInds[b.quality]);
        });

        const mappedPrefs = prefs.map((p, i) => {
            if (p.type === "biome") {
                return (
                    <Preference 
                        key={i}
                        type="biome"
                        quality={p.quality}
                        index={i}
                    />
                );
            } else if (p.type === "neighbor") {
                return (
                    <Preference 
                        key={i}
                        type="neighbor"
                        quality={p.quality}
                        npc={p.npc}
                        index={i}
                    />
                );
            } else if (p.type === "nearby") {
                return (
                    <Preference 
                        key={i}
                        type="nearby"
                        quality={p.quality}
                        neighborCount={neighborCount}
                        index={i}
                    />
                );
            }
        });

        return mappedPrefs;
    }

    render() {
        const biomeType = this.props.biomeType;
        const biomeProp = biomeProps[biomeType];

        let divClass = "row mx-0 p-3 rounded-lg " + biomeType + " border border-"+biomeType;
        if (!this.props.isFirst) divClass += " mt-2";

        const btnClass = "btn btn-"+biomeType;

        const biomeName = biomeProp.name;

        const npcList = this.props.npcs.map((npc, ind) => {
            const prefs = this.findPrefs(npc);

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
                    prefs={prefs}
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
                        <div className="col-auto ml-auto justify-content-end right-align vert-center">
                            <button className={btnClass} onClick={this.props.delete}><i className="fas fa-times"></i></button>
                        </div>
                    </div>
                    {npcList}
                </div>
            </div>
        );
    }
}

// main container for all the biomes
class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.state = { biomes: [] }
        setTimeout(this.getCookies.bind(this), 50); 
    }

    addBiome(type) {
        const biomes = this.state.biomes;
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
        this.setCookies(biomesConcat);
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
        this.setCookies(biomes);
    }

    deleteAllBiomes() {
        const dropdown = document.getElementById("npcDropdownMenu");
        let children = dropdown.children;
        for (let i = 0; i < children.length; i++) {
            children[i].className = "dropdown-item";
        }

        this.setState({
            biomes: [],
        });
        this.setCookies([]);
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
            this.setCookies(biomes);
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
        this.setCookies(biomes);
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
        this.setCookies(biomes);
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
        this.setCookies(biomes);
    }

    getCookies() {
        if (typeof Cookies.get("biomes") !== 'undefined') {
            const biomes = JSON.parse(Cookies.get("biomes"));
            biomes.forEach(b => {
                b.npcs.forEach(n => {
                    toggleNPCDropdown(n, true);
                });
            });
            this.setState({
                biomes: biomes,
            });
        }
    }

    setCookies() {
        Cookies.set("biomes", JSON.stringify(this.state.biomes), {sameSite: "lax"});
    }

    setCookies(biomes) {
        Cookies.set("biomes", JSON.stringify(biomes), {sameSite: "lax"});
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

function clearBiomes() {
    tool.deleteAllBiomes();
}
